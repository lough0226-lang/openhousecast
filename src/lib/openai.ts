import { generateScript, uid, type GeneratedScript, type GeneratorInput } from './generator';

/* ------------------------------------------------------------------ */
/* DashScope (Alibaba Cloud Bailian) OpenAI-compatible mode client     */
/* ------------------------------------------------------------------ */

export const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';

export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'qwen-plus';

// Full 9-part long-form generation measures ~38s on qwen-plus (verified),
// so a hard 30s default would always time out and fall back to mock.
// Default 90s so real output can complete; override at runtime via
// OPENAI_TIMEOUT_MS if you want a stricter bound (e.g. 30000).
export const OPENAI_TIMEOUT_MS = Number(process.env.OPENAI_TIMEOUT_MS || 90_000);

const CONTENT_LINE_LABELS: Record<GeneratorInput['contentLine'], string> = {
  market: 'Market Update',
  buyer: 'Buyer Education',
  seller: 'Seller Education',
};

interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

interface ChatCompletionChoice {
  message?: { content?: string };
}

interface ChatCompletionResponse {
  choices?: ChatCompletionChoice[];
  error?: { message?: string };
}

/* ------------------------------------------------------------------ */
/* Prompt building                                                     */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are OpenHouseCast, an expert copywriter for U.S. real estate agents who publish long-form YouTube videos (5-15 minutes).

You write professional, trustworthy, and compelling long-form video scripts — never Shorts or short clips.

COMPLIANCE (non-negotiable):
- Comply fully with the U.S. Fair Housing Act. NEVER include language about race, color, religion, sex, familial status, disability, or national origin, whether positive or negative.
- No steering, no protected-class references, no assumptions about any group of buyers or sellers.
- Keep the message about market data, livability, process education, and lifestyle. If a fair-housing note is needed, frame it as equal access and equal professional service for all.

FORMAT:
- Respond with ONLY valid JSON. No markdown fences, no extra text.
- The JSON must match the exact schema below.

Output schema:
{
  "title": string,
  "hook": string,
  "script": [{ "timestamp": string, "heading": string, "text": string }],
  "shotList": string[],
  "onScreenText": string[],
  "retentionNotes": string[],
  "cta": string,
  "description": string,
  "tags": string[]
}

Notes:
- "script" contains 6-9 timestamped segments spanning roughly the requested video length.
- "description" must include a "Timestamps:" section listing each segment as "timestamp — heading".
- "tags" must be YouTube-style lowercase hashtags (6-8 tags).`;

function buildUserPrompt(input: GeneratorInput): string {
  const line = CONTENT_LINE_LABELS[input.contentLine];
  const lines: string[] = [];

  lines.push(`Write a complete ${line} long-form YouTube video script (target length: ${input.videoLength || '8-10 minutes'}).`);
  lines.push(`Tone: ${input.tone || 'Warm & confident'}.`);

  if (input.city) lines.push(`City / region: ${input.city}.`);

  switch (input.contentLine) {
    case 'market':
      lines.push(
        `Primary audience: ${input.marketAudience === 'sellers' ? 'sellers' : 'buyers'}.`,
      );
      if (input.marketData?.trim())
        lines.push(
          `Pasted MLS / market data to work in naturally and accurately:\n${input.marketData}`,
        );
      break;
    case 'buyer':
    case 'seller':
      if (input.topic?.trim()) lines.push(`Video topic: ${input.topic}.`);
      if (input.audience?.trim()) lines.push(`Target ${input.contentLine} profile: ${input.audience}.`);
      if (input.questions?.trim())
        lines.push(`Common questions to address:\n${input.questions}`);
      break;
  }

  return lines.join('\n\n');
}

/* ------------------------------------------------------------------ */
/* Low-level request                                                   */
/* ------------------------------------------------------------------ */

async function requestCompletion(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : 'unknown fetch error';
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`DashScope request timed out after ${OPENAI_TIMEOUT_MS}ms`);
    }
    throw new Error(`DashScope request failed: ${msg}`);
  }

  clearTimeout(timer);

  if (!response.ok) {
    let detail = '';
    try {
      const j = (await response.json()) as { error?: { message?: string } };
      detail = j?.error?.message || '';
    } catch {
      /* ignore parse errors on error bodies */
    }
    throw new Error(
      `DashScope API error ${response.status}${detail ? `: ${detail}` : ''}`,
    );
  }

  const data = (await response.json()) as ChatCompletionResponse;

  if (data.error?.message) {
    throw new Error(`DashScope API error: ${data.error.message}`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('DashScope returned an empty response');
  }

  return content.trim();
}

/* ------------------------------------------------------------------ */
/* JSON parsing with cleanup                                           */
/* ------------------------------------------------------------------ */

function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
  return JSON.parse(cleaned);
}

function asString(v: unknown, fallback: string): string {
  return typeof v === 'string' && v.trim() ? v.trim() : fallback;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
}

function parseScript(obj: unknown): GeneratedScript {
  const root = (obj ?? {}) as Record<string, unknown>;
  const rawSegments = Array.isArray(root.script) ? root.script : [];

  const script = rawSegments
    .map((seg) => {
      const s = (seg ?? {}) as Record<string, unknown>;
      return {
        timestamp: asString(s.timestamp, '0:00'),
        heading: asString(s.heading, 'Segment'),
        text: asString(s.text, ''),
      };
    })
    .filter((s) => s.text.length > 0);

  return {
    id: uid(),
    contentLine: asString(root.contentLine, 'market') as GeneratedScript['contentLine'],
    contentLineLabel: asString(root.contentLineLabel, 'Market Update'),
    title: asString(root.title, 'Untitled script'),
    hook: asString(root.hook, ''),
    script:
      script.length > 0
        ? script
        : [{ timestamp: '0:00', heading: 'Intro', text: asString(root.hook, '') }],
    shotList: asStringArray(root.shotList),
    onScreenText: asStringArray(root.onScreenText),
    retentionNotes: asStringArray(root.retentionNotes),
    cta: asString(root.cta, ''),
    description: asString(root.description, ''),
    tags: asStringArray(root.tags),
    generatedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Public: generate a script via DashScope, falling back to the mock   */
/* ------------------------------------------------------------------ */

export async function generateWithLLM(input: GeneratorInput): Promise<GeneratedScript> {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(input) },
  ];

  let raw: string;
  try {
    raw = await requestCompletion(messages);
  } catch (err) {
    console.warn('[openai] falling back to mock generator:', err instanceof Error ? err.message : err);
    return generateScript(input);
  }

  try {
    const parsed = extractJson(raw);
    const script = parseScript(parsed);

    // Ensure the content line matches the request; fix if the model drifted.
    script.contentLine = input.contentLine;
    script.contentLineLabel = CONTENT_LINE_LABELS[input.contentLine];

    return script;
  } catch (err) {
    console.warn('[openai] failed to parse model output, falling back to mock:', err);
    return generateScript(input);
  }
}