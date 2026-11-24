export const Colors = {
  bloodRed: '#B51224',
  deepBlack: '#0B0B0D',
  pureWhite: '#FFFFFF',
  darkSurface: '#151518',
  secondarySurface: '#202024',
  mutedGrey: '#929299',
  lightBackground: '#F4F3F1',
  subtleBorder: '#303036',
  success: '#2E7D4F',
  warning: '#C9A227',
  error: '#B51224',
  overlay: 'rgba(11, 11, 13, 0.72)',
} as const;

export type ThemeMode = 'dark' | 'light';

export const darkTheme = {
  mode: 'dark' as ThemeMode,
  background: Colors.deepBlack,
  surface: Colors.darkSurface,
  surfaceAlt: Colors.secondarySurface,
  text: Colors.pureWhite,
  textMuted: Colors.mutedGrey,
  border: Colors.subtleBorder,
  accent: Colors.bloodRed,
  accentContrast: Colors.pureWhite,
  danger: Colors.error,
  success: Colors.success,
  inputBackground: Colors.secondarySurface,
  tabBar: Colors.darkSurface,
  card: Colors.darkSurface,
};

export const lightTheme = {
  mode: 'light' as ThemeMode,
  background: Colors.lightBackground,
  surface: Colors.pureWhite,
  surfaceAlt: '#EAE9E6',
  text: Colors.deepBlack,
  textMuted: '#6B6B73',
  border: '#D8D7D3',
  accent: Colors.bloodRed,
  accentContrast: Colors.pureWhite,
  danger: Colors.error,
  success: Colors.success,
  inputBackground: Colors.pureWhite,
  tabBar: Colors.pureWhite,
  card: Colors.pureWhite,
};

export type AppTheme = typeof darkTheme;
