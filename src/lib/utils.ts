export const APP_NAME = 'DEXTER';
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'ar', 'fr'] as const;
export const RTL_LANGUAGES = ['ar'] as const;

export const STORAGE_KEYS = {
  PROJECTS: 'dexter-projects',
  THEME: 'dexter-theme',
};

export const RESEARCH_PROVIDERS = ['tavily', 'semantic-scholar', 'arxiv'];
export const AI_PROVIDERS = ['openrouter', 'groq', 'gemini', 'ollama'];

export const DEFAULT_PROJECT_STATUS = 'draft';
