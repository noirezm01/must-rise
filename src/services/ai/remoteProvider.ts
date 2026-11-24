
import type {
  GenerateTextRequest,
  GenerateTextResult,
} from '../../types/models';

import type { AiTextProvider } from './types';

function getConfig() {
  return {
    endpoint: process.env.EXPO_PUBLIC_AI_ENDPOINT?.trim(),
    apiKey: process.env.EXPO_PUBLIC_AI_API_KEY?.trim(),
    model: process.env.EXPO_PUBLIC_AI_MODEL?.trim(),
  };
}

export const remoteAiProvider: AiTextProvider = {
  name: 'remote',

  isAvailable() {
    const { endpoint, apiKey, model } = getConfig();
    return Boolean(endpoint && apiKey && model);
  },

  async generate(
    request: GenerateTextRequest
  ): Promise<GenerateTextResult> {
    const { endpoint, apiKey, model } = getConfig();

    if (!endpoint || !apiKey || !model) {
      throw new Error('Groq configuration is incomplete');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `${endpoint.replace(/\/+$/, '')}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: `You are Must Rise's Persian writing assistant.
Write naturally and fluently in Persian.
Respect the requested tone and length.
Avoid clichés and repetitive expressions.
Preserve the user's intended meaning.`,
              },
              {
                role: 'user',
                content: `
Topic: ${request.topic}
Context: ${request.context}
Tone: ${request.tone}
Length: ${request.length}
Existing text: ${request.existingText ?? 'None'}

Write the requested Persian content.
`,
              },
            ],
            temperature: 0.7,
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error ${response.status}: ${error}`);
      }

      const data = await response.json();

      const text = data.choices?.[0]?.message?.content?.trim();

      if (!text) {
        throw new Error('Groq returned empty text');
      }

      return {
        text,
        provider: 'remote',
      };
    } finally {
      clearTimeout(timeout);
    }
  },
};
