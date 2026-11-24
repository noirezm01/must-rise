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

export function MinimalistTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const bg = bgVariant(customisation.backgroundVariant, [
    Colors.deepBlack,
    Colors.darkSurface,
    '#101012',
  ]);
  const color = textPalette(customisation.textColorVariant, true);
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg, padding: width * 0.08 }]}>
      <View style={[styles.topRule, { backgroundColor: Colors.bloodRed }]} />
      {customisation.showTitle ? (
        <Text
          style={[
            styles.brand,
            {
              color: Colors.bloodRed,
              fontSize: scale(22, s),
              letterSpacing: 4,
            },
          ]}
        >
          {Brand.name}
        </Text>
      ) : null}
      <View style={styles.center}>
        <Text
          style={[
            styles.headline,
            alignStyle(customisation.textAlign),
            { color, fontSize: scale(56, s), lineHeight: scale(70, s) },
          ]}
        >
          {headline || Brand.slogan.fa}
        </Text>
        {supportingText ? (
          <Text
            style={[
              styles.support,
              alignStyle(customisation.textAlign),
              { color: Colors.mutedGrey, fontSize: scale(24, s), marginTop: 16 },
            ]}
          >
            {supportingText}
          </Text>
        ) : null}
        {text ? (
          <Text
            style={[
              styles.body,
              alignStyle(customisation.textAlign),
              { color, fontSize: scale(28, s), lineHeight: scale(44, s), marginTop: 28 },
            ]}
          >
            {text}
          </Text>
        ) : null}
      </View>
      <View style={styles.footer}>
        <View style={[styles.bottomRule, { backgroundColor: Colors.subtleBorder }]} />
        {customisation.showSignature && customisation.signature ? (
          <Text style={[styles.sig, { color: Colors.mutedGrey, fontSize: scale(18, s) }]}>
            {customisation.signature}
          </Text>
        ) : (
          <Text style={[styles.sig, { color: Colors.mutedGrey, fontSize: scale(16, s) }]}>
            {Brand.slogan.en}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
  },
  topRule: {
    width: 64,
    height: 3,
    alignSelf: 'flex-end',
  },
  brand: {
    marginTop: 24,
    fontWeight: '700',
    textAlign: 'left',
    writingDirection: 'ltr',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontWeight: '700',
  },
  support: {
    fontWeight: '400',
  },
  body: {
    fontWeight: '400',
  },
  footer: {
    gap: 16,
  },
  bottomRule: {
    height: 1,
    width: '100%',
  },
  sig: {
    textAlign: 'left',
    writingDirection: 'ltr',
  },
});
