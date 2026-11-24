import type { PosterCustomisation, TemplateId } from '../../types/models';

export interface PosterContentProps {
  templateId: TemplateId;
  headline: string;
  supportingText: string;
  text: string;
  customisation: PosterCustomisation;
  width: number;
  height: number;
}

export const POSTER_WIDTH = 1080;
export const POSTER_HEIGHT = 1350;
