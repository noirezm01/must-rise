import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AppTheme,
  darkTheme,
  lightTheme,
} from '../theme';
import type {
  PosterProject,
  TextContent,
  UserPreferences,
} from '../types/models';
import { DEFAULT_PREFERENCES } from '../types/models';
import { loadTexts } from '../services/drafts';
import { loadPosters } from '../services/posters';
import {
  loadPreferences,
  savePreferences,
} from '../services/preferences';
import { loadArsenalFavourites } from '../services/contentLibrary';

interface AppContextValue {
  ready: boolean;
  theme: AppTheme;
  preferences: UserPreferences;
  texts: TextContent[];
  posters: PosterProject[];
  arsenalFavourites: string[];
  refreshCreations: () => Promise<void>;
  refreshFavourites: () => Promise<void>;
  setPreferences: (next: UserPreferences) => Promise<void>;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferencesState] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [texts, setTexts] = useState<TextContent[]>([]);
  const [posters, setPosters] = useState<PosterProject[]>([]);
  const [arsenalFavourites, setArsenalFavourites] = useState<string[]>([]);

  const refreshCreations = useCallback(async () => {
    const [nextTexts, nextPosters] = await Promise.all([
      loadTexts(),
      loadPosters(),
    ]);
    setTexts(nextTexts);
    setPosters(nextPosters);
  }, []);

  const refreshFavourites = useCallback(async () => {
    const favs = await loadArsenalFavourites();
    setArsenalFavourites(favs);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const prefs = await loadPreferences();
      if (!mounted) return;
      setPreferencesState(prefs);
      await Promise.all([refreshCreations(), refreshFavourites()]);
      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, [refreshCreations, refreshFavourites]);

  const setPreferences = useCallback(async (next: UserPreferences) => {
    const saved = await savePreferences(next);
    setPreferencesState(saved);
  }, []);

  const updatePreference = useCallback(
    async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      const next = { ...preferences, [key]: value };
      await setPreferences(next);
    },
    [preferences, setPreferences],
  );

  const theme = preferences.theme === 'light' ? lightTheme : darkTheme;

  const value = useMemo(
    () => ({
      ready,
      theme,
      preferences,
      texts,
      posters,
      arsenalFavourites,
      refreshCreations,
      refreshFavourites,
      setPreferences,
      updatePreference,
    }),
    [
      ready,
      theme,
      preferences,
      texts,
      posters,
      arsenalFavourites,
      refreshCreations,
      refreshFavourites,
      setPreferences,
      updatePreference,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}

export function useAppTheme(): AppTheme {
  return useApp().theme;
}
