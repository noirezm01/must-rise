import type { GenerateTextRequest, GenerateTextResult } from '../../types/models';

export interface AiTextProvider {
  readonly name: string;
  isAvailable(): boolean;
  generate(request: GenerateTextRequest): Promise<GenerateTextResult>;
}
