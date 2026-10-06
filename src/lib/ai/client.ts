import { LLMRequest, LLMResponse, AIProviderFactory } from './providers';
import { logger } from '../logger';

export class LLMClient {
  private providerName: string;
  private maxRetries: number = 3;

  constructor(provider: string = 'openrouter') {
    this.providerName = provider;
  }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        logger.debug(`[${this.providerName}] Attempt ${attempt}/${this.maxRetries}`, request);
        const provider = await AIProviderFactory.createProvider(this.providerName);
        const response = await provider.call(request);
        logger.info(`[${this.providerName}] Success`, { tokens: response.usage });
        return response;
      } catch (error) {
        lastError = error as Error;
        logger.warn(`[${this.providerName}] Attempt ${attempt} failed`, error);
        if (attempt < this.maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    throw lastError || new Error('LLM generation failed');
  }

  async generateWithFallback(
    request: LLMRequest,
    fallbackProviders: string[] = ['groq', 'gemini']
  ): Promise<LLMResponse> {
    try {
      return await this.generate(request);
    } catch (error) {
      logger.warn(`Primary provider ${this.providerName} failed, trying fallbacks`);
      for (const fallback of fallbackProviders) {
        try {
          const client = new LLMClient(fallback);
          return await client.generate(request);
        } catch (fallbackError) {
          logger.warn(`Fallback provider ${fallback} failed`);
        }
      }
      throw error;
    }
  }
}
