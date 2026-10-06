import { NextRequest, NextResponse } from 'next/server';
import { LLMClient } from '@/lib/ai/client';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claims, sources, language } = body;

    const llm = new LLMClient('openrouter');

    const response = await llm.generateWithFallback({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: `You are a presentation writer. Create a professional presentation outline in ${language}.
Structure: Title, Introduction, 3-4 main sections, Conclusion.
Make sure each section is evidence-based.`,
        },
        {
          role: 'user',
          content: `Claims to cover:\n${claims.join('\n')}\n\nAvailable sources:\n${sources
            .map((s: any) => `- ${s.title} (${s.credibility})`)
            .join('\n')}`,
        },
      ],
    });

    logger.info('Outline generated');

    return NextResponse.json({
      outline: response.content,
    });
  } catch (error) {
    logger.error('Outline generation failed', error);
    return NextResponse.json(
      { error: 'Failed to generate outline' },
      { status: 500 }
    );
  }
}
