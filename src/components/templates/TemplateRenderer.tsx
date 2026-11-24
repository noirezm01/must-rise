import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import type { PosterCustomisation, TemplateId } from '../../types/models';
import { MinimalistTemplate } from './layouts/MinimalistTemplate';
import { EditorialTemplate } from './layouts/EditorialTemplate';
import { StatementTemplate } from './layouts/StatementTemplate';
import { MemorialTemplate } from './layouts/MemorialTemplate';
import { PatrioticTemplate } from './layouts/PatrioticTemplate';
import { GeometricTemplate } from './layouts/GeometricTemplate';
import { POSTER_HEIGHT, POSTER_WIDTH } from './types';

export interface TemplateRendererProps {
  templateId: TemplateId;
  headline: string;
  supportingText: string;
  text: string;
  customisation: PosterCustomisation;
  width?: number;
  height?: number;
}

export const TemplateRenderer = forwardRef<View, TemplateRendererProps>(
  function TemplateRenderer(
    {
      templateId,
      headline,
      supportingText,
      text,
      customisation,
      width = POSTER_WIDTH,
      height = POSTER_HEIGHT,
    },
    ref,
  ) {
    const props = {
      headline,
      supportingText,
      text,
      customisation,
      width,
      height,
    };

    let content: React.ReactNode;
    switch (templateId) {
      case 'editorial':
        content = <EditorialTemplate {...props} />;
        break;
      case 'statement':
        content = <StatementTemplate {...props} />;
        break;
      case 'memorial':
        content = <MemorialTemplate {...props} />;
        break;
      case 'patriotic':
        content = <PatrioticTemplate {...props} />;
        break;
      case 'geometric':
        content = <GeometricTemplate {...props} />;
        break;
      case 'minimalist':
      default:
        content = <MinimalistTemplate {...props} />;
        break;
    }

    return (
      <View
        ref={ref}
        collapsable={false}
        style={[styles.root, { width, height }]}
      >
        {content}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
});
