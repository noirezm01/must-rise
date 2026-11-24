import {
  getArsenalByCategory,
  getArsenalItem,
  searchArsenal,
} from '../data/arsenalContent';
import type { ContentCategory } from '../types/models';
import { storage } from './storage';

export async function loadArsenalFavourites(): Promise<string[]> {
  return storage.readJson<string[]>(storage.keys.favourites, []);
}

export async function toggleArsenalFavourite(id: string): Promise<string[]> {
  const current = await loadArsenalFavourites();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  await storage.writeJson(storage.keys.favourites, next);
  return next;
}

export const contentLibrary = {
  search: searchArsenal,
  byCategory: getArsenalByCategory,
  get: getArsenalItem,
  loadFavourites: loadArsenalFavourites,
  toggleFavourite: toggleArsenalFavourite,
  isFavourite(favourites: string[], id: string): boolean {
    return favourites.includes(id);
  },
  filterFavourites(
    favourites: string[],
    category?: ContentCategory | 'all',
    query = '',
  ) {
    const items = searchArsenal(query, category).filter((item) =>
      favourites.includes(item.id),
    );
    return items;
  },
};
