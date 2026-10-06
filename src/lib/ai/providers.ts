export interface AIProvider {
  name: string;
  models: string[];
  available: boolean;
  capabilities: string[];
}

export interface LLMRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export class AIProviderFactory {
  static async createProvider(provider: string): Promise<AIProvider> {
    switch (provider) {
      case 'openrouter':
        return new OpenRouterProvider();
      case 'groq':
        return new GroqProvider();
      case 'gemini':
        return new GeminiProvider();
      case 'ollama':
        return new OllamaProvider();
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }
}

class OpenRouterProvider implements AIProvider {
  name = 'OpenRouter';
  models = ['openrouter/auto', 'meta-llama/llama-2-70b-chat', 'mistralai/mistral-7b-instruct'];
  available = !!process.env.OPENROUTER_API_KEY;
  capabilities = ['chat', 'streaming', 'fallback'];

  async call(request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'openrouter/auto',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
        stream: request.stream || false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: data.usage,
    };
  }
}

class GroqProvider implements AIProvider {
  name = 'Groq';
  models = ['mixtral-8x7b-32768', 'llama2-70b-4096'];
  available = !!process.env.GROQ_API_KEY;
  capabilities = ['chat', 'ultra-fast', 'streaming'];

  async call(request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'mixtral-8x7b-32768',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: data.usage,
    };
  }
}

class GeminiProvider implements AIProvider {
  name = 'Google Gemini';
  models = ['gemini-pro'];
  available = !!process.env.GEMINI_API_KEY;
  capabilities = ['chat', 'multimodal'];

  async call(request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${request.model || 'gemini-pro'}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: request.messages[request.messages.length - 1].content }],
          }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      model: request.model || 'gemini-pro',
    };
  }
}

class OllamaProvider implements AIProvider {
  name = 'Ollama';
  models = ['llama2', 'mistral'];
  available = true;
  capabilities = ['chat', 'local', 'offline'];

  async call(request: LLMRequest): Promise<LLMResponse> {
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: request.model || 'llama2',
        messages: request.messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.message.content,
      model: request.model || 'llama2',
    };
  }
}
