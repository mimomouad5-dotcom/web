export interface SearchProvider {
  name: string;
  search(query: string): Promise<SearchResult[]>;
}

export interface SearchResult {
  url: string;
  title: string;
  snippet: string;
  source: string;
  type: 'web' | 'academic' | 'image';
  credibility: number;
}

export class SearchFactory {
  static async createProvider(provider: string): Promise<SearchProvider> {
    switch (provider) {
      case 'tavily':
        return new TavilySearch();
      case 'brave':
        return new BraveSearch();
      case 'semantic-scholar':
        return new SemanticScholarSearch();
      case 'crossref':
        return new CrossrefSearch();
      case 'arxiv':
        return new ArxivSearch();
      default:
        throw new Error(`Unknown search provider: ${provider}`);
    }
  }
}

class TavilySearch implements SearchProvider {
  name = 'Tavily';

  async search(query: string): Promise<SearchResult[]> {
    if (!process.env.TAVILY_API_KEY) {
      throw new Error('Tavily API key not configured');
    }

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        include_answer: true,
        max_results: 10,
      }),
    });

    if (!response.ok) throw new Error(`Tavily error: ${response.statusText}`);

    const data = await response.json();
    return data.results.map((result: any) => ({
      url: result.url,
      title: result.title,
      snippet: result.snippet,
      source: 'Tavily',
      type: 'web',
      credibility: 0.8,
    }));
  }
}

class BraveSearch implements SearchProvider {
  name = 'Brave Search';

  async search(query: string): Promise<SearchResult[]> {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': process.env.BRAVE_API_KEY || '',
      },
    });

    if (!response.ok) throw new Error(`Brave error: ${response.statusText}`);

    const data = await response.json();
    return data.web.map((result: any) => ({
      url: result.url,
      title: result.title,
      snippet: result.description,
      source: 'Brave',
      type: 'web',
      credibility: 0.75,
    }));
  }
}

class SemanticScholarSearch implements SearchProvider {
  name = 'Semantic Scholar';

  async search(query: string): Promise<SearchResult[]> {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=10&fields=url,title,abstract`
    );

    if (!response.ok) throw new Error(`Semantic Scholar error: ${response.statusText}`);

    const data = await response.json();
    return data.data.map((result: any) => ({
      url: result.url || `https://semanticscholar.org/paper/${result.paperId}`,
      title: result.title,
      snippet: result.abstract || '',
      source: 'Semantic Scholar',
      type: 'academic',
      credibility: 0.9,
    }));
  }
}

class CrossrefSearch implements SearchProvider {
  name = 'Crossref';

  async search(query: string): Promise<SearchResult[]> {
    const response = await fetch(
      `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=10`
    );

    if (!response.ok) throw new Error(`Crossref error: ${response.statusText}`);

    const data = await response.json();
    return data.message.items.map((result: any) => ({
      url: result.URL || '',
      title: result.title?.[0] || '',
      snippet: result.abstract || '',
      source: 'Crossref',
      type: 'academic',
      credibility: 0.95,
    }));
  }
}

class ArxivSearch implements SearchProvider {
  name = 'arXiv';

  async search(query: string): Promise<SearchResult[]> {
    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&max_results=10`
    );

    if (!response.ok) throw new Error(`arXiv error: ${response.statusText}`);

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    const entries = xmlDoc.getElementsByTagName('entry');

    const results: SearchResult[] = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const id = entry.getElementsByTagName('id')[0]?.textContent || '';
      results.push({
        url: id,
        title: entry.getElementsByTagName('title')[0]?.textContent || '',
        snippet: entry.getElementsByTagName('summary')[0]?.textContent || '',
        source: 'arXiv',
        type: 'academic',
        credibility: 0.92,
      });
    }
    return results;
  }
}
