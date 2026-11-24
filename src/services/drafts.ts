import type { TextContent } from '../types/models';
import { createId, nowIso } from '../utils/id';
import { storage } from './storage';

export async function loadTexts(): Promise<TextContent[]> {
  const items = await storage.readJson<TextContent[]>(storage.keys.texts, []);
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function saveText(
  input: Omit<TextContent, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
  },
): Promise<TextContent> {
  const items = await loadTexts();
  const now = nowIso();
  const existingIndex = input.id
    ? items.findIndex((item) => item.id === input.id)
    : -1;

  if (existingIndex >= 0) {
    const updated: TextContent = {
      ...items[existingIndex],
      ...input,
      id: items[existingIndex].id,
      createdAt: items[existingIndex].createdAt,
      updatedAt: now,
    };
    items[existingIndex] = updated;
    await storage.writeJson(storage.keys.texts, items);
    return updated;
  }

  const created: TextContent = {
    id: input.id ?? createId('txt'),
    title: input.title.trim() || 'بدون عنوان',
    body: input.body,
    category: input.category,
    source: input.source,
    isFavourite: input.isFavourite ?? false,
    tone: input.tone,
    length: input.length,
    createdAt: now,
    updatedAt: now,
  };
  items.unshift(created);
  await storage.writeJson(storage.keys.texts, items);
  return created;
}

export async function getText(id: string): Promise<TextContent | undefined> {
  const items = await loadTexts();
  return items.find((item) => item.id === id);
}

export async function deleteText(id: string): Promise<void> {
  const items = await loadTexts();
  await storage.writeJson(
    storage.keys.texts,
    items.filter((item) => item.id !== id),
  );
}

export async function duplicateText(id: string): Promise<TextContent | null> {
  const original = await getText(id);
  if (!original) return null;
  return saveText({
    title: `${original.title} (نسخه)`,
    body: original.body,
    category: original.category,
    source: original.source,
    isFavourite: false,
    tone: original.tone,
    length: original.length,
  });
}

export async function toggleTextFavourite(id: string): Promise<TextContent | null> {
  const original = await getText(id);
  if (!original) return null;
  return saveText({ ...original, isFavourite: !original.isFavourite });
}

export async function renameText(
  id: string,
  title: string,
): Promise<TextContent | null> {
  const original = await getText(id);
  if (!original) return null;
  return saveText({ ...original, title: title.trim() || original.title });
}

export function searchTexts(items: TextContent[], query: string): TextContent[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    `${item.title} ${item.body}`.toLowerCase().includes(q),
  );
}
