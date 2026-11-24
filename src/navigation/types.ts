import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ContentCategory, TemplateId } from '../types/models';

export type HomeStackParamList = {
  HomeMain: undefined;
  Settings: undefined;
  Write: {
    textId?: string;
    initialBody?: string;
    initialTitle?: string;
    category?: ContentCategory | 'custom';
  };
  TemplatePicker: {
    initialText?: string;
    initialHeadline?: string;
    initialSupporting?: string;
    posterId?: string;
  };
  PosterEditor: {
    templateId: TemplateId;
    posterId?: string;
    initialText?: string;
    initialHeadline?: string;
    initialSupporting?: string;
  };
};

export type ArsenalStackParamList = {
  ArsenalMain: undefined;
  ArsenalDetail: { itemId: string };
  Write: HomeStackParamList['Write'];
  TemplatePicker: HomeStackParamList['TemplatePicker'];
  PosterEditor: HomeStackParamList['PosterEditor'];
};

export type CreationsStackParamList = {
  CreationsMain: undefined;
  Write: HomeStackParamList['Write'];
  PosterEditor: HomeStackParamList['PosterEditor'];
  TemplatePicker: HomeStackParamList['TemplatePicker'];
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ArsenalTab: NavigatorScreenParams<ArsenalStackParamList>;
  CreationsTab: NavigatorScreenParams<CreationsStackParamList>;
};
