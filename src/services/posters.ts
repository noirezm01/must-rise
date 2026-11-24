import type { PosterProject } from '../types/models';
import { createId, nowIso } from '../utils/id';
import { storage } from './storage';

export async function loadPosters(): Promise<PosterProject[]> {
  const items = await storage.readJson<PosterProject[]>(storage.keys.posters, []);
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function savePoster(
  input: Omit<PosterProject, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
  },
): Promise<PosterProject> {
  const items = await loadPosters();
  const now = nowIso();
  const existingIndex = input.id
    ? items.findIndex((item) => item.id === input.id)
    : -1;

  if (existingIndex >= 0) {
    const updated: PosterProject = {
      ...items[existingIndex],
      ...input,
      id: items[existingIndex].id,
      createdAt: items[existingIndex].createdAt,
      updatedAt: now,
    };
    items[existingIndex] = updated;
    await storage.writeJson(storage.keys.posters, items);
    return updated;
  }

  const created: PosterProject = {
    id: input.id ?? createId('pst'),
    title: input.title.trim() || 'پوستر بدون عنوان',
    templateId: input.templateId,
    text: input.text,
    headline: input.headline,
    supportingText: input.supportingText,
    customisation: input.customisation,
    exportedImageUri: input.exportedImageUri,
    createdAt: now,
    updatedAt: now,
  };
  items.unshift(created);
  await storage.writeJson(storage.keys.posters, items);
  return created;
}

export async function getPoster(id: string): Promise<PosterProject | undefined> {
  const items = await loadPosters();
  return items.find((item) => item.id === id);
}

export async function deletePoster(id: string): Promise<void> {
  const items = await loadPosters();
  await storage.writeJson(
    storage.keys.posters,
    items.filter((item) => item.id !== id),
  );
}

export async function duplicatePoster(
  id: string,
): Promise<PosterProject | null> {
  const original = await getPoster(id);
  if (!original) return null;
  return savePoster({
    title: `${original.title} (نسخه)`,
    templateId: original.templateId,
    text: original.text,
    headline: original.headline,
    supportingText: original.supportingText,
    customisation: { ...original.customisation },
  });
}

export async function renamePoster(
  id: string,
  title: string,
): Promise<PosterProject | null> {
  const original = await getPoster(id);
  if (!original) return null;
  return savePoster({ ...original, title: title.trim() || original.title });
}

export function searchPosters(
  items: PosterProject[],
  query: string,
): PosterProject[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    `${item.title} ${item.headline} ${item.text} ${item.supportingText}`
      .toLowerCase()
      .includes(q),
  );
}
