'use client';

import { useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  Type,
  Zap,
  FileText,
  Clapperboard,
  MonitorPlay,
  TrendingUp,
  Megaphone,
  AlignLeft,
  Tag,
  Wand2,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  CONTENT_LINE_OPTIONS,
  TONE_OPTIONS,
  VIDEO_LENGTH_OPTIONS,
  generateScript,
  type ContentLine,
  type GeneratedScript,
  type GeneratorInput,
} from '@/lib/generator';

/* ------------------------------------------------------------------ */
/* UI building blocks                                                  */
/* ------------------------------------------------------------------ */

function FieldLabel({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between">
      <label className="text-sm font-medium text-evergreen-deep">{children}</label>
      {hint && <span className="text-xs text-clay">{hint}</span>}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm text-ink placeholder:text-clay/60 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/20 transition';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="no-print inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1 text-xs font-semibold text-evergreen transition-colors hover:border-evergreen/40 hover:bg-evergreen/5"
      aria-label="Copy section"
    >
      {copied ? (
        <Check className="size-3.5 text-evergreen" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function OutputCard({
  icon: Icon,
  title,
  subtitle,
  copyText,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  copyText: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white">
      <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-evergreen/10 text-evergreen">
            <Icon className="size-4.5" strokeWidth={1.9} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-evergreen-deep">{title}</h3>
            <p className="text-xs text-clay">{subtitle}</p>
          </div>
        </div>
        <CopyButton text={copyText} />
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink/85">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */
function EmptyState({ onExample }: { onExample: () => void }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-evergreen/10 text-evergreen">
        <Wand2 className="size-8" strokeWidth={1.6} />
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold text-evergreen-deep">
        Your script will appear here
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-clay">
        Pick a content line, fill in your details on the left, and hit
        Generate. Or load a realistic example right now.
      </p>
      <Button variant="amber" className="mt-6" onClick={onExample}>
        <Sparkles className="size-4" /> Load an example script
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function GenerateClient() {
  const [contentLine, setContentLine] = useState<ContentLine>('market');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<GeneratedScript | null>(null);

  // form fields
  const [city, setCity] = useState('');
  const [marketAudience, setMarketAudience] = useState<'buyers' | 'sellers'>(
    'buyers',
  );
  const [marketData, setMarketData] = useState('');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [questions, setQuestions] = useState('');
  const [videoLength, setVideoLength] = useState(VIDEO_LENGTH_OPTIONS[1]);
  const [tone, setTone] = useState(TONE_OPTIONS[0]);

  const isMarket = contentLine === 'market';

  const runGenerate = (inputOverride?: Partial<GeneratorInput>) => {
    setLoading(true);
    setScript(null);
    const input: GeneratorInput = {
      contentLine,
      city,
      marketAudience,
      marketData,
      topic,
      audience,
      questions,
      videoLength,
      tone,
      ...inputOverride,
    };
    // Small delay so the loading state is visible and feels like generation.
    setTimeout(() => {
      const result = generateScript(input);
      setScript(result);
      setLoading(false);
    }, 700);
  };

  const loadExample = () => {
    if (contentLine === 'market') {
      setCity('Austin');
      setMarketAudience('buyers');
      setMarketData(
        'Median price $455k (flat YoY). Active inventory up 18%. Days on market 34, up from 22. New listings +12%.',
      );
    } else if (contentLine === 'buyer') {
      setTopic('what first-time buyers should know');
      setAudience('first-time buyers');
      setQuestions('How much do I need for a down payment? What are closing costs?');
    } else {
      setTopic('how to price your home in 2025');
      setAudience('sellers ready to list');
      setQuestions('Should I overprice? How much does staging matter?');
    }
    runGenerate({ contentLine, city, marketAudience, marketData, topic, audience, questions, videoLength, tone });
  };

  const formatScript = useMemo(() => {
    if (!script) return '';
    return script.script
      .map((s) => `${s.timestamp}\n${s.heading}\n${s.text}`)
      .join('\n\n');
  }, [script]);

  const bulletText = (items: string[]) =>
    items.map((i) => `• ${i}`).join('\n');

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-evergreen/15 bg-evergreen/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-evergreen">
              Script generator
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-evergreen-deep sm:text-4xl">
              Turn your market into watchable video
            </h1>
            <p className="mt-2 max-w-xl text-clay">
              Pick a content line, answer a few prompts, and get a complete
              9-part long-form script — Fair Housing compliant and ready to
              shoot.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-evergreen">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber/20 text-amber-dark">
                <Video className="size-3.5" strokeWidth={2.2} />
              </span>
              This tool is built exclusively for 5–15 minute long-form YouTube
              videos. Not for Shorts or short clips.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* LEFT — INPUT */}
          <div className="no-print rounded-2xl border border-line bg-white p-5 lg:sticky lg:top-20 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-clay">
              Content line
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
              {CONTENT_LINE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setContentLine(opt.value);
                    setScript(null);
                  }}
                  className={cn(
                    'rounded-lg px-2 py-2 text-xs font-semibold transition-colors sm:text-sm',
                    contentLine === opt.value
                      ? 'bg-evergreen text-paper shadow-sm'
                      : 'text-clay hover:text-evergreen-deep',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-2 min-h-8 text-xs leading-relaxed text-clay">
              {
                CONTENT_LINE_OPTIONS.find((o) => o.value === contentLine)
                  ?.blurb
              }
            </p>

            <div className="mt-4 space-y-4 border-t border-line pt-4">
              {/* MARKET */}
              {isMarket && (
                <>
                  <div>
                    <FieldLabel hint="required">City / region</FieldLabel>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Austin, TX"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <FieldLabel>Primary audience</FieldLabel>
                    <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
                      {(['buyers', 'sellers'] as const).map((a) => (
                        <button
                          key={a}
                          onClick={() => setMarketAudience(a)}
                          className={cn(
                            'rounded-md px-3 py-2 text-sm font-medium capitalize transition-colors',
                            marketAudience === a
                              ? 'bg-white text-evergreen-deep shadow-sm'
                              : 'text-clay',
                          )}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Paste MLS / market data</FieldLabel>
                    <textarea
                      value={marketData}
                      onChange={(e) => setMarketData(e.target.value)}
                      placeholder={
                        'e.g. Median price $455k (flat YoY) · Inventory up 18% · Days on market 34 · New listings +12%'
                      }
                      rows={4}
                      className={cn(inputCls, 'resize-none')}
                    />
                    <p className="mt-1 text-xs text-clay">
                      We fold your numbers into a spoken, natural-sounding
                      report.
                    </p>
                  </div>
                </>
              )}

              {/* BUYER / SELLER */}
              {!isMarket && (
                <>
                  <div>
                    <FieldLabel hint="required">Video topic</FieldLabel>
                    <input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={
                        contentLine === 'buyer'
                          ? 'e.g. closing costs explained'
                          : 'e.g. how to price your home right'
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <FieldLabel>
                      {contentLine === 'buyer' ? 'Buyer profile' : 'Seller profile'}
                    </FieldLabel>
                    <input
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder={
                        contentLine === 'buyer'
                          ? 'e.g. first-time buyers / investors / relocating'
                          : 'e.g. first-time sellers / move-up sellers'
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <FieldLabel>City / region</FieldLabel>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Denver"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <FieldLabel>Common questions to address</FieldLabel>
                    <textarea
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      placeholder="e.g. How much do I need for a down payment?"
                      rows={3}
                      className={cn(inputCls, 'resize-none')}
                    />
                  </div>
                </>
              )}

              {/* SHARED */}
              <div>
                <FieldLabel>Video length</FieldLabel>
                <select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  className={inputCls}
                >
                  {VIDEO_LENGTH_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Tone</FieldLabel>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className={inputCls}
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              variant="amber"
              size="lg"
              className="mt-5 w-full text-[15px] font-semibold"
              onClick={() => runGenerate()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate script
                </>
              )}
            </Button>
            <p className="mt-2 text-center text-xs text-clay">
              Free plan preview · 2 long-form scripts/mo on Free, 15 on Pro
            </p>
          </div>

          {/* RIGHT — OUTPUT */}
          <div className="min-w-0">
            {loading ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-line bg-white">
                <Loader2 className="size-8 animate-spin text-evergreen" />
                <p className="mt-4 text-sm font-medium text-evergreen-deep">
                  Writing your script…
                </p>
                <p className="mt-1 text-xs text-clay">
                  Structuring hooks, timestamps, and b-roll for watch-time.
                </p>
              </div>
            ) : !script ? (
              <EmptyState onExample={loadExample} />
            ) : (
              <div className="space-y-4">
                <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-evergreen/20 bg-evergreen/5 px-5 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-evergreen">
                      {script.contentLineLabel}
                    </span>
                    <span className="text-clay">·</span>
                    <span className="text-clay">9-part package ready</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="no-print"
                      onClick={() => runGenerate()}
                    >
                      Regenerate
                    </Button>
                    <Button
                      variant="amber"
                      size="sm"
                      className="no-print"
                      onClick={() => {
                        navigator.clipboard.writeText(script.description);
                        toast.success('Description copied');
                      }}
                    >
                      <Copy className="size-3.5" /> Copy all (desc)
                    </Button>
                  </div>
                </div>

                <OutputCard
                  icon={Type}
                  title="Video title"
                  subtitle="Click-worthy, searchable"
                  copyText={script.title}
                >
                  <p className="font-display text-lg font-semibold leading-snug text-evergreen-deep">
                    {script.title}
                  </p>
                </OutputCard>

                <OutputCard
                  icon={Zap}
                  title="Opening hook"
                  subtitle="First 10 seconds · retention-critical"
                  copyText={script.hook}
                >
                  <p className="text-sm leading-relaxed text-ink/85">
                    {script.hook}
                  </p>
                </OutputCard>

                <OutputCard
                  icon={FileText}
                  title="Full script with timestamps"
                  subtitle="Chapters you can read straight to camera"
                  copyText={formatScript}
                >
                  <div className="space-y-4">
                    {script.script.map((seg, i) => (
                      <div key={i} className="rounded-xl bg-paper p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-evergreen px-2 py-0.5 text-xs font-bold text-paper">
                            {seg.timestamp}
                          </span>
                          <span className="text-sm font-semibold text-evergreen-deep">
                            {seg.heading}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink/85">
                          {seg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </OutputCard>

                <OutputCard
                  icon={Clapperboard}
                  title="B-roll / shot list"
                  subtitle="Your shoot-day checklist"
                  copyText={bulletText(script.shotList)}
                >
                  <BulletList items={script.shotList} />
                </OutputCard>

                <OutputCard
                  icon={MonitorPlay}
                  title="On-screen text"
                  subtitle="Lower thirds, captions & overlays"
                  copyText={bulletText(script.onScreenText)}
                >
                  <div className="flex flex-wrap gap-2">
                    {script.onScreenText.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-evergreen-deep"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </OutputCard>

                <OutputCard
                  icon={TrendingUp}
                  title="Retention notes"
                  subtitle="Why each section holds viewers"
                  copyText={bulletText(script.retentionNotes)}
                >
                  <BulletList items={script.retentionNotes} />
                </OutputCard>

                <OutputCard
                  icon={Megaphone}
                  title="Call to action"
                  subtitle="A low-friction next step"
                  copyText={script.cta}
                >
                  <p className="text-sm leading-relaxed text-ink/85">{script.cta}</p>
                </OutputCard>

                <OutputCard
                  icon={AlignLeft}
                  title="Video description"
                  subtitle="Paste straight into YouTube"
                  copyText={script.description}
                >
                  <pre className="whitespace-pre-wrap rounded-lg bg-paper p-4 font-sans text-sm leading-relaxed text-ink/85">
                    {script.description}
                  </pre>
                </OutputCard>

                <OutputCard
                  icon={Tag}
                  title="Tags"
                  subtitle="SEO tags for discoverability"
                  copyText={script.tags.join(', ')}
                >
                  <div className="flex flex-wrap gap-2">
                    {script.tags.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-evergreen/10 px-3 py-1 text-sm font-medium text-evergreen"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </OutputCard>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}