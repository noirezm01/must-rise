import {
  DEFAULT_PREFERENCES,
  type UserPreferences,
} from '../types/models';
import { storage } from './storage';

export async function loadPreferences(): Promise<UserPreferences> {
  const saved = await storage.readJson<Partial<UserPreferences> | null>(
    storage.keys.preferences,
    null,
  );
  return { ...DEFAULT_PREFERENCES, ...saved };
}

export async function savePreferences(
  preferences: UserPreferences,
): Promise<UserPreferences> {
  await storage.writeJson(storage.keys.preferences, preferences);
  return preferences;
}

export async function updatePreferences(
  patch: Partial<UserPreferences>,
): Promise<UserPreferences> {
  const current = await loadPreferences();
  const next = { ...current, ...patch };
  return savePreferences(next);
}
