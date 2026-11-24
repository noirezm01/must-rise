export type ContentCategory =
  | 'mihan'
  | 'hambastegi'
  | 'paydari'
  | 'omid'
  | 'sepas'
  | 'yadbud'
  | 'ayande';

export type ContentSource = 'arsenal' | 'user' | 'ai' | 'local-fallback';

export type WritingTone =
  | 'epic'
  | 'formal'
  | 'emotional'
  | 'literary'
  | 'punchy'
  | 'motivational';

export type WritingLength = 'short' | 'medium' | 'long';

export type CreationKind = 'draft' | 'message' | 'poster' | 'favourite';

export type TextAlignOption = 'right' | 'center' | 'left';

export type TemplateId =
  | 'minimalist'
  | 'editorial'
  | 'statement'
  | 'memorial'
  | 'patriotic'
  | 'geometric';

export interface TextContent {
  id: string;
  title: string;
  body: string;
  category: ContentCategory | 'custom';
  source: ContentSource;
  createdAt: string;
  updatedAt: string;
  isFavourite: boolean;
  tone?: WritingTone;
  length?: WritingLength;
}

export interface ArsenalItem {
  id: string;
  title: string;
  body: string;
  category: ContentCategory;
  tags: string[];
}

export interface PosterCustomisation {
  textAlign: TextAlignOption;
  fontSizeScale: number;
  showTitle: boolean;
  showSignature: boolean;
  signature: string;
  backgroundVariant: number;
  textColorVariant: number;
}

export interface PosterProject {
  id: string;
  title: string;
  templateId: TemplateId;
  text: string;
  headline: string;
  supportingText: string;
  customisation: PosterCustomisation;
  createdAt: string;
  updatedAt: string;
  exportedImageUri?: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  defaultHeadline: string;
  defaultSupporting: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  language: 'fa';
  defaultExportQuality: 'standard' | 'high';
  defaultTone: WritingTone;
  defaultLength: WritingLength;
}

export interface GenerateTextRequest {
  topic: string;
  context?: string;
  tone: WritingTone;
  length: WritingLength;
  existingText?: string;
}

export interface GenerateTextResult {
  text: string;
  provider: 'remote' | 'local-fallback';
  warning?: string;
}

export const DEFAULT_CUSTOMISATION: PosterCustomisation = {
  textAlign: 'right',
  fontSizeScale: 1,
  showTitle: true,
  showSignature: false,
  signature: '',
  backgroundVariant: 0,
  textColorVariant: 0,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  language: 'fa',
  defaultExportQuality: 'high',
  defaultTone: 'epic',
  defaultLength: 'medium',
};
