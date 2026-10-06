import { SearchFactory, SearchResult } from './providers';
import { logger } from '../logger';

export class SearchClient {
  async search(
    query: string,
    providers: string[] = ['tavily', 'semantic-scholar', 'arxiv']
  ): Promise<SearchResult[]> {
    const allResults: SearchResult[] = [];
    const seenUrls = new Set<string>();

    for (const providerName of providers) {
      try {
        logger.info(`Searching with ${providerName}...`);
        const provider = await SearchFactory.createProvider(providerName);
        const results = await provider.search(query);

        for (const result of results) {
          if (!seenUrls.has(result.url)) {
            allResults.push(result);
            seenUrls.add(result.url);
          }
        }
      } catch (error) {
        logger.warn(`Search provider ${providerName} failed`, error);
      }
    }

    // Sort by credibility
    allResults.sort((a, b) => b.credibility - a.credibility);
    return allResults;
  }

  async deduplicateAndRank(results: SearchResult[]): Promise<SearchResult[]> {
    const byDomain: { [key: string]: SearchResult[] } = {};

    for (const result of results) {
      const url = new URL(result.url);
      const domain = url.hostname;

      if (!byDomain[domain]) {
        byDomain[domain] = [];
      }
      byDomain[domain].push(result);
    }

    const ranked: SearchResult[] = [];
    for (const domain of Object.keys(byDomain)) {
      const domainResults = byDomain[domain].sort((a, b) => b.credibility - a.credibility);
      ranked.push(domainResults[0]);
    }

    return ranked.sort((a, b) => b.credibility - a.credibility);
  }
}
