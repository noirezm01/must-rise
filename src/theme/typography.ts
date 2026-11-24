import { TextStyle, Platform } from 'react-native';

/**
 * Persian-friendly font stack.
 * Vazirmatn is loaded when available; otherwise platform defaults that
 * handle Arabic/Persian shaping well are used.
 */
export const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }) as string,
  medium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
  }) as string,
  bold: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
  }) as string,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  display: 32,
  hero: 40,
} as const;

export const lineHeight = {
  tight: 1.25,
  normal: 1.55,
  relaxed: 1.75,
} as const;

export const textStyles = {
  heroBrand: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.hero,
    fontWeight: '700',
    letterSpacing: 2,
    writingDirection: 'ltr',
  } as TextStyle,
  display: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.display,
    fontWeight: '700',
    lineHeight: fontSize.display * lineHeight.tight,
  } as TextStyle,
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    fontWeight: '700',
    lineHeight: fontSize.xxl * lineHeight.tight,
  } as TextStyle,
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    fontWeight: '600',
    lineHeight: fontSize.xl * lineHeight.normal,
  } as TextStyle,
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: fontSize.md * lineHeight.relaxed,
  } as TextStyle,
  bodyBold: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: fontSize.md * lineHeight.normal,
  } as TextStyle,
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
  } as TextStyle,
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  } as TextStyle,
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    fontWeight: '600',
  } as TextStyle,
} as const;
