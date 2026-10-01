import { NextRequest, NextResponse } from 'next/server';
import type { GeneratorInput } from '@/lib/generator';
import { generateWithLLM } from '@/lib/openai';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<GeneratorInput>;

    if (
      !body ||
      !body.contentLine ||
      !['market', 'buyer', 'seller'].includes(body.contentLine)
    ) {
      return NextResponse.json(
        { error: 'A valid contentLine is required (market, buyer, or seller).' },
        { status: 400 },
      );
    }

    const input: GeneratorInput = {
      contentLine: body.contentLine,
      city: body.city,
      marketAudience: body.marketAudience,
      marketData: body.marketData,
      topic: body.topic,
      audience: body.audience,
      questions: body.questions,
      videoLength: body.videoLength,
      tone: body.tone,
    };

    const script = await generateWithLLM(input);

    return NextResponse.json({ success: true, script });
  } catch (err) {
    console.error('[api/generate] error', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong generating your script.' },
      { status: 500 },
    );
  }
}