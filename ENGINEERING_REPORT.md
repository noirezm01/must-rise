# Must Rise — Engineering Report

## 1. What was implemented

Complete local-first Expo TypeScript MVP:

- Brand identity (MUST RISE / باید برخاست) with centralised copy and theme
- Dark-first design system (blood red / deep black / white) + optional light theme
- Persian RTL interface with Must Rise terminology
- Bottom tabs: خانه · زرادخانه · نوشته‌های من
- Home: brand hero, کتابت کن, قالب برگزین, arsenal categories, recent creations
- Arsenal: 28 original Persian items across 7 categories, search, favourites, detail, copy, open in writer/poster
- Writing system: topic/context/tone/length, generate, save draft, copy, share, open in poster
- Optional AI via `EXPO_PUBLIC_AI_ENDPOINT` with local fallback (no fabricated “remote success”)
- 6 distinct programmatic poster templates (minimalist, editorial, statement, memorial, patriotic, geometric)
- Poster editor: switch templates without losing text, customisation, save, export PNG, share
- My Creations: drafts/posters/favourites, search, open, rename, duplicate, delete with confirmation
- Settings: theme, writing defaults, export quality, about/privacy
- AsyncStorage persistence for texts, posters, favourites, preferences (image URIs, not base64)

## 2. Architecture

```
App.tsx
  └─ AppProvider (preferences + creations state)
      └─ RootNavigator (tabs)
          ├─ HomeStack → Home, Settings, Write, TemplatePicker, PosterEditor
          ├─ ArsenalStack → Arsenal, Detail, Write, TemplatePicker, PosterEditor
          └─ CreationsStack → Creations, Write, TemplatePicker, PosterEditor

src/services  → business logic (storage, AI, export, sharing)
src/data      → static arsenal + template definitions
src/components/templates → pure RN poster layouts (no AI images)
```

## 3. Important paths

| Path | Role |
|------|------|
| `dependencies.txt` | Manual dependency install list |
| `src/brand/brand.ts` | Brand strings |
| `src/i18n/fa.ts` | All Persian UI copy |
| `src/theme/*` | Design tokens |
| `src/types/models.ts` | Domain models |
| `src/data/arsenalContent.ts` | Starter library |
| `src/data/templates.ts` | Template catalogue |
| `src/services/*` | Persistence, AI, export |
| `src/components/templates/**` | Poster layouts |
| `src/screens/*` | Feature screens |
| `src/navigation/RootNavigator.tsx` | Navigation |
| `.env.example` | Optional AI endpoint |

## 4. Dependencies added (and why)

See `dependencies.txt`. Short rationale:

- React Navigation (+ screens / safe-area) — tab + stack navigation
- AsyncStorage — local drafts/posters/preferences
- expo-clipboard — copy arsenal/writer text
- react-native-view-shot — capture poster view to image
- expo-file-system — persist exported PNG URI
- expo-media-library — save to device gallery
- expo-sharing — native share sheet
- @expo/vector-icons — consistent line icons
- expo-constants — version display in settings

## 5. How to run

```bash
npx expo install <packages from dependencies.txt>
npm start
```

Then open in Expo Go / emulator.

## 6. Secure AI configuration

1. Deploy a backend that holds the real API key.
2. Set `EXPO_PUBLIC_AI_ENDPOINT` to that backend URL only.
3. Client sends `{ topic, context, tone, length, existingText, language: "fa" }`.
4. Backend returns `{ text: "..." }`.

If unset or failing → local Persian fallback with an on-screen notice.

## 7. Remaining limitations

- Dependency install was not completed in this environment (`dependencies.txt` for manual resolve).
- Device export/share/permissions need a physical device or emulator with media permissions.
- First Android RTL force may require one app reload.
- No custom Persian font asset shipped; uses platform fonts with RTL shaping.
- Poster capture uses an off-screen full-size view; verify on device after `react-native-view-shot` is installed.

## 8. Validation status

| Check | Result |
|-------|--------|
| Repository scaffold | Expo blank-typescript (SDK 58) created |
| Application source | Implemented end-to-end in `src/` |
| `npm install` / Expo package linking | Incomplete in this session — resolve via `dependencies.txt` |
| TypeScript / lint / device export | Not verified here (blocked on dependency install) |
| Core journeys in code | Wired: nav, arsenal, write+fallback AI, templates, save, export, share, creations |

Do not treat device export/share as verified until packages are installed and tested on a device.
