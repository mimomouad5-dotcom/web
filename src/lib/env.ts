const requiredEnvVars = [
  'DATABASE_URL',
  'REDIS_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
];

const optionalEnvVars = [
  'OPENROUTER_API_KEY',
  'GROQ_API_KEY',
  'GEMINI_API_KEY',
  'TAVILY_API_KEY',
  'PEXELS_API_KEY',
];

export function validateEnv() {
  const missing = requiredEnvVars.filter((env) => !process.env[env]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export const env = {
  // Database
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,

  // Auth
  nextauthUrl: process.env.NEXTAUTH_URL!,
  nextauthSecret: process.env.NEXTAUTH_SECRET!,

  // AI Providers
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',

  // Search Providers
  tavilyApiKey: process.env.TAVILY_API_KEY,

  // Image Providers
  pexelsApiKey: process.env.PEXELS_API_KEY,

  // App
  nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'DEXTER',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};
