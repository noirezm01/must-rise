import { arsenalContent } from '../../data/arsenalContent';
import type {
  GenerateTextRequest,
  GenerateTextResult,
  WritingLength,
  WritingTone,
} from '../../types/models';
import type { AiTextProvider } from './types';

const TONE_PREFIX: Record<WritingTone, string> = {
  epic: 'با آهنگی حماسی',
  formal: 'به بیانی رسمی',
  emotional: 'با لحنی احساسی',
  literary: 'به سبک ادبی',
  punchy: 'کوتاه و کوبنده',
  motivational: 'با بیانی انگیزشی',
};

function lengthLimit(length: WritingLength): number {
  switch (length) {
    case 'short':
      return 1;
    case 'long':
      return 3;
    default:
      return 2;
  }
}

function pickRelated(topic: string, context?: string): string[] {
  const hay = `${topic} ${context ?? ''}`.toLowerCase();
  const scored = arsenalContent
    .map((item) => {
      const blob = `${item.title} ${item.body} ${item.tags.join(' ')}`.toLowerCase();
      let score = 0;
      hay.split(/\s+/).forEach((token) => {
        if (token.length > 1 && blob.includes(token)) score += 1;
      });
      if (item.category === 'omid' && /امید|فردا|سپیده/.test(hay)) score += 2;
      if (item.category === 'mihan' && /میهن|ایران|خاک|پرچم/.test(hay)) score += 2;
      if (item.category === 'hambastegi' && /همبستگی|اتحاد|باهم/.test(hay)) score += 2;
      if (item.category === 'paydari' && /پایدار|استوار|ایستاد/.test(hay)) score += 2;
      if (item.category === 'sepas' && /سپاس|قدردان|تشکر/.test(hay)) score += 2;
      if (item.category === 'yadbud' && /یاد|خاطره|نام/.test(hay)) score += 2;
      if (item.category === 'ayande' && /آینده|ساخت|فردا/.test(hay)) score += 2;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  const chosen = scored.filter((s) => s.score > 0).slice(0, 4).map((s) => s.item.body);
  if (chosen.length > 0) return chosen;

  // Deterministic rotation based on topic length for variety without randomness spikes
  const start = topic.trim().length % arsenalContent.length;
  return [
    arsenalContent[start]?.body,
    arsenalContent[(start + 3) % arsenalContent.length]?.body,
    arsenalContent[(start + 7) % arsenalContent.length]?.body,
  ].filter(Boolean) as string[];
}

function shapeForTone(text: string, tone: WritingTone): string {
  switch (tone) {
    case 'punchy':
      return text.split(/[.\u06D4!؟]/)[0]?.trim()
        ? `${text.split(/[.\u06D4!؟]/)[0].trim()}.`
        : text;
    case 'formal':
      return text.replace(/بیایید/g, 'شایسته است').replace(/بسازیم/g, 'ساخته شود');
    case 'emotional':
      return `${text} دل‌ها با هم می‌تپند.`;
    case 'literary':
      return `${text} و باد، نامِ برخاستن را زمزمه می‌کند.`;
    case 'motivational':
      return `${text} اکنون زمان عمل است.`;
    case 'epic':
    default:
      return text;
  }
}

export const localFallbackProvider: AiTextProvider = {
  name: 'local-fallback',
  isAvailable() {
    return true;
  },
  async generate(request: GenerateTextRequest): Promise<GenerateTextResult> {
    const topic = request.topic.trim() || 'برخاستن';
    const related = pickRelated(topic, request.context);
    const count = lengthLimit(request.length);
    const parts = related.slice(0, count).map((p) => shapeForTone(p, request.tone));

    const intro = `${TONE_PREFIX[request.tone]} دربارهٔ «${topic}»:`;
    let body = parts.join('\n\n');

    if (request.context?.trim()) {
      body = `${body}\n\nبا در نظر گرفتن این نکات: ${request.context.trim()}`;
    }

    if (request.existingText?.trim()) {
      body = `${request.existingText.trim()}\n\n${body}`;
    }

    const text =
      request.length === 'short'
        ? shapeForTone(related[0] ?? `برای ${topic} باید برخاست.`, request.tone)
        : `${intro}\n\n${body}`;

    return {
      text: text.trim(),
      provider: 'local-fallback',
      warning: 'local',
    };
  },
};
