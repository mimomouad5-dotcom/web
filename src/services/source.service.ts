import { prisma } from '@/lib/prisma';
import { SearchResult } from '@/lib/search/providers';
import { logger } from '@/lib/logger';

export class SourceService {
  async saveSource(
    projectVersionId: string,
    result: SearchResult
  ) {
    try {
      const source = await prisma.source.create({
        data: {
          projectVersionId,
          type: result.type,
          url: result.url,
          title: result.title,
          content: result.snippet,
          credibilityScore: result.credibility,
          metadata: {
            source: result.source,
          },
        },
      });
      return source;
    } catch (error) {
      logger.error('Failed to save source', error);
      throw error;
    }
  }

  async getSources(projectVersionId: string) {
    return prisma.source.findMany({
      where: { projectVersionId },
      orderBy: { credibilityScore: 'desc' },
    });
  }

  async getSourcesByCredibility(projectVersionId: string, minScore: number = 0.7) {
    return prisma.source.findMany({
      where: {
        projectVersionId,
        credibilityScore: { gte: minScore },
      },
      orderBy: { credibilityScore: 'desc' },
    });
  }
}
