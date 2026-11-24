import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Brand } from '../../../brand/brand';
import { Colors } from '../../../theme';
import {
  alignStyle,
  bgVariant,
  LayoutProps,
  scale,
  textPalette,
} from './shared';

export function StatementTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const inverted = customisation.backgroundVariant % 2 === 1;
  const bg = bgVariant(customisation.backgroundVariant, [
    Colors.bloodRed,
    Colors.deepBlack,
    '#8E0E1C',
  ]);
  const color = inverted
    ? textPalette(customisation.textColorVariant, true)
    : Colors.pureWhite;
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg, padding: width * 0.1 }]}>
      <View style={styles.frame}>
        <View style={[styles.corner, styles.tl, { borderColor: color }]} />
        <View style={[styles.corner, styles.tr, { borderColor: color }]} />
        <View style={[styles.corner, styles.bl, { borderColor: color }]} />
        <View style={[styles.corner, styles.br, { borderColor: color }]} />

        <Text
          style={[
            styles.headline,
            alignStyle('center'),
            { color, fontSize: scale(72, s), lineHeight: scale(88, s) },
          ]}
        >
          {headline || text}
        </Text>

        {(text && headline) || supportingText ? (
          <Text
            style={[
              styles.body,
              alignStyle('center'),
              { color, fontSize: scale(28, s), lineHeight: scale(42, s), opacity: 0.92 },
            ]}
          >
            {text || supportingText}
          </Text>
        ) : null}
      </View>

      <Text
        style={[
          styles.brand,
          {
            color,
            fontSize: scale(18, s),
            letterSpacing: 6,
          },
        ]}
      >
        {customisation.showSignature && customisation.signature
          ? customisation.signature
          : Brand.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
  tl: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 },
  tr: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 },
  bl: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 },
  br: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },
  headline: {
    fontWeight: '800',
  },
  body: {
    marginTop: 28,
    fontWeight: '400',
  },
  brand: {
    position: 'absolute',
    bottom: 48,
    fontWeight: '700',
    writingDirection: 'ltr',
  },
});
