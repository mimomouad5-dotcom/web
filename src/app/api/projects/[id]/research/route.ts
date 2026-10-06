import { NextRequest, NextResponse } from 'next/server';
import { SearchClient } from '@/lib/search/client';
import { SourceService } from '@/services/source.service';
import { LLMClient } from '@/lib/ai/client';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, topic, language } = body;

    // Get project version
    // TODO: implement

    // 1. Search for sources
    logger.info('Starting research for topic:', topic);
    const searchClient = new SearchClient();
    const results = await searchClient.search(topic);
    const deduplicated = await searchClient.deduplicateAndRank(results);

    // 2. Save sources to database
    // TODO: Save to project version

    // 3. Generate claims using LLM
    const llm = new LLMClient('openrouter');
    const claimsResponse = await llm.generate({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: 'You are a research analyst. Extract key claims from the following sources.',
        },
        {
          role: 'user',
          content: `Topic: ${topic}\n\nSources:\n${deduplicated
            .slice(0, 5)
            .map((r) => `- ${r.title}: ${r.snippet}`)
            .join('\n')}`,
        },
      ],
    });

    logger.info('Research completed', { projectId });

    return NextResponse.json({
      projectId,
      sourcesFound: deduplicated.length,
      claims: claimsResponse.content,
    });
  } catch (error) {
    logger.error('Research failed', error);
    return NextResponse.json(
      { error: 'Research failed' },
      { status: 500 }
    );
  }
}
