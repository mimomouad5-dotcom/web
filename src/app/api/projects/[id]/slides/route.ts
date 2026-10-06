import { NextRequest, NextResponse } from 'next/server';
import { LLMClient } from '@/lib/ai/client';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { outline, topic, language } = body;

    const llm = new LLMClient('openrouter');

    const response = await llm.generateWithFallback({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: `You are a presentation content writer. Generate detailed slide content in ${language}.
Output a JSON object with slides array. Each slide: { title, bulletPoints[], notes }`,
        },
        {
          role: 'user',
          content: `Outline:\n${outline}\n\nTopic: ${topic}`,
        },
      ],
    });

    logger.info('Slide content generated');

    try {
      const slides = JSON.parse(response.content);
      return NextResponse.json({ slides });
    } catch {
      return NextResponse.json({
        slides: response.content,
      });
    }
  } catch (error) {
    logger.error('Slide generation failed', error);
    return NextResponse.json(
      { error: 'Failed to generate slides' },
      { status: 500 }
    );
  }
}
