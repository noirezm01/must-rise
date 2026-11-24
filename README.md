# Must Rise

Digital arsenal of words and visual expression. Local-first Expo (React Native) MVP.

## Run

```bash
# 1) Install dependencies (see dependencies.txt)
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @expo/vector-icons expo-clipboard expo-file-system expo-media-library expo-sharing expo-constants react-native-view-shot

# 2) Start
npm start
```

## Optional AI endpoint

Copy `.env.example` → `.env` and set:

```
EXPO_PUBLIC_AI_ENDPOINT=https://your-secure-backend.example/generate
```

Never put API keys in the client. Without an endpoint, local Persian fallback text is used.

## Structure

- `src/brand` — brand constants
- `src/i18n` — Persian UI copy
- `src/theme` — colours, type, spacing
- `src/data` — arsenal content + template metadata
- `src/services` — storage, drafts, posters, AI, export, sharing
- `src/components` — UI + poster templates
- `src/screens` — Home, Arsenal, Write, Poster, Creations, Settings
- `src/navigation` — tabs + stacks
