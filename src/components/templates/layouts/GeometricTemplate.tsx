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

export function GeometricTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const bg = bgVariant(customisation.backgroundVariant, [
    Colors.secondarySurface,
    Colors.darkSurface,
    '#1A1A20',
  ]);
  const color = textPalette(customisation.textColorVariant, true);
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg }]}>
      <View style={[styles.geoA, { borderColor: Colors.bloodRed }]} />
      <View style={[styles.geoB, { backgroundColor: Colors.bloodRed }]} />
      <View style={[styles.geoC, { borderColor: Colors.subtleBorder }]} />
      <View style={[styles.geoD, { backgroundColor: Colors.pureWhite, opacity: 0.08 }]} />

      <View style={[styles.content, { padding: width * 0.1 }]}>
        <Text
          style={[
            styles.index,
            { color: Colors.bloodRed, fontSize: scale(18, s), letterSpacing: 3 },
          ]}
        >
          06 — GEOMETRIC
        </Text>
        <Text
          style={[
            styles.headline,
            alignStyle(customisation.textAlign),
            { color, fontSize: scale(48, s), lineHeight: scale(60, s), marginTop: 28 },
          ]}
        >
          {headline}
        </Text>
        {supportingText ? (
          <Text
            style={[
              styles.support,
              alignStyle(customisation.textAlign),
              { color: Colors.mutedGrey, fontSize: scale(22, s), marginTop: 12 },
            ]}
          >
            {supportingText}
          </Text>
        ) : null}
        <View style={[styles.block, { borderColor: Colors.subtleBorder }]}>
          <Text
            style={[
              styles.body,
              alignStyle(customisation.textAlign),
              { color, fontSize: scale(26, s), lineHeight: scale(40, s) },
            ]}
          >
            {text}
          </Text>
        </View>
        <Text
          style={[
            styles.footer,
            {
              color: Colors.mutedGrey,
              fontSize: scale(16, s),
              letterSpacing: 2,
            },
          ]}
        >
          {customisation.showSignature && customisation.signature
            ? customisation.signature
            : Brand.slogan.en}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  geoA: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 220,
    height: 220,
    borderWidth: 2,
    transform: [{ rotate: '18deg' }],
  },
  geoB: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    width: 8,
    height: 180,
  },
  geoC: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 120,
    height: 120,
    borderWidth: 1,
  },
  geoD: {
    position: 'absolute',
    top: 180,
    left: -30,
    width: 160,
    height: 2,
    transform: [{ rotate: '-25deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  index: {
    fontWeight: '700',
    writingDirection: 'ltr',
    textAlign: 'left',
  },
  headline: {
    fontWeight: '800',
  },
  support: {
    fontWeight: '400',
  },
  block: {
    marginTop: 36,
    borderLeftWidth: 2,
    paddingLeft: 20,
  },
  body: {
    fontWeight: '400',
  },
  footer: {
    marginTop: 48,
    writingDirection: 'ltr',
    textAlign: 'left',
    fontWeight: '600',
  },
});
