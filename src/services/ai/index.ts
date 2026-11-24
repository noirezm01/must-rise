import type {
  GenerateTextRequest,
  GenerateTextResult,
} from "../../types/models";
import { localFallbackProvider } from "./localFallback";
import { remoteAiProvider } from "./remoteProvider";

export async function generateText(
  request: GenerateTextRequest,
): Promise<GenerateTextResult> {
  const topic = request.topic.trim();
  if (!topic && !request.existingText?.trim() && !request.context?.trim()) {
    throw new Error("invalid_input");
  }

  if (remoteAiProvider.isAvailable()) {
    try {
      return await remoteAiProvider.generate(request);
    } catch (error) {
      console.error("GROQ API ERROR:", error);

      const fallback = await localFallbackProvider.generate(request);
      return {
        ...fallback,
        warning: "remote-failed",
      };
    }
  }

  const fallback = await localFallbackProvider.generate(request);
  return {
    ...fallback,
    warning: "no-endpoint",
  };
}

export function isRemoteAiConfigured(): boolean {
  return remoteAiProvider.isAvailable();
}

export { localFallbackProvider, remoteAiProvider };
