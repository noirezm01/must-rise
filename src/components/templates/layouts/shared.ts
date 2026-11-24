import { Colors } from '../../../theme';
import type { PosterCustomisation, TextAlignOption } from '../../../types/models';

export interface LayoutProps {
  headline: string;
  supportingText: string;
  text: string;
  customisation: PosterCustomisation;
  width: number;
  height: number;
}

export function alignStyle(align: TextAlignOption) {
  return {
    textAlign: align as 'left' | 'center' | 'right',
    writingDirection: 'rtl' as const,
  };
}

export function scale(size: number, factor: number) {
  return Math.round(size * factor);
}

export function textPalette(variant: number, lightOnDark = true): string {
  const darkOptions = [Colors.pureWhite, '#F4F3F1', '#E8E6E1'];
  const lightOptions = [Colors.deepBlack, '#1A1A1E', Colors.bloodRed];
  const list = lightOnDark ? darkOptions : lightOptions;
  return list[variant % list.length];
}

export function bgVariant(variant: number, bases: string[]): string {
  return bases[variant % bases.length];
}
