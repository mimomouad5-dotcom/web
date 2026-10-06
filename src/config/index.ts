export const config = {
  // Research
  research: {
    maxSources: 20,
    minCredibility: 0.6,
    providers: ['tavily', 'semantic-scholar', 'arxiv'],
  },

  // AI
  ai: {
    primaryProvider: 'openrouter',
    fallbackProviders: ['groq', 'gemini'],
    maxRetries: 3,
    temperature: 0.7,
  },

  // Presentation
  presentation: {
    minSlidesPerDeck: 5,
    maxSlidesPerDeck: 50,
    defaultLayout: 'content',
  },

  // Languages
  languages: ['en', 'ar', 'fr'] as const,
  rtlLanguages: ['ar'],
};
