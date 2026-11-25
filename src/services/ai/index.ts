import type {
  GenerateTextRequest,
  GenerateTextResult,
} from '../../types/models';

import { remoteAiProvider } from './remoteProvider';

export async function generateText(
  request: GenerateTextRequest
): Promise<GenerateTextResult> {
  if (!remoteAiProvider.isAvailable()) {
    throw new Error('AI_NOT_CONFIGURED');
  }

  try {
    return await remoteAiProvider.generate(request);
  } catch (error) {
    console.error('AI API ERROR:', error);
    throw new Error('AI_REQUEST_FAILED');
  }
}

export function isRemoteAiConfigured(): boolean {
  return remoteAiProvider.isAvailable();
}