import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  texts: '@must_rise/texts',
  posters: '@must_rise/posters',
  favourites: '@must_rise/arsenal_favourites',
  preferences: '@must_rise/preferences',
} as const;

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  keys: KEYS,
  readJson,
  writeJson,
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};
