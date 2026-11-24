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

export function MemorialTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const bg = bgVariant(customisation.backgroundVariant, [
    '#121214',
    Colors.darkSurface,
    '#0E0E10',
  ]);
  const color = textPalette(customisation.textColorVariant, true);
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg, padding: width * 0.1 }]}>
      <View style={styles.ornament}>
        <View style={[styles.line, { backgroundColor: Colors.mutedGrey }]} />
        <View style={[styles.diamond, { borderColor: Colors.bloodRed }]} />
        <View style={[styles.line, { backgroundColor: Colors.mutedGrey }]} />
      </View>

      <Text
        style={[
          styles.headline,
          alignStyle('center'),
          { color, fontSize: scale(44, s), lineHeight: scale(60, s), marginTop: 48 },
        ]}
      >
        {headline}
      </Text>

      {supportingText ? (
        <Text
          style={[
            styles.support,
            alignStyle('center'),
            { color: Colors.mutedGrey, fontSize: scale(22, s), marginTop: 16 },
          ]}
        >
          {supportingText}
        </Text>
      ) : null}

      <View style={[styles.divider, { backgroundColor: Colors.subtleBorder }]} />

      <Text
        style={[
          styles.body,
          alignStyle('center'),
          { color, fontSize: scale(26, s), lineHeight: scale(44, s) },
        ]}
      >
        {text}
      </Text>

      <View style={styles.footer}>
        <View style={[styles.thin, { backgroundColor: Colors.subtleBorder }]} />
        <Text style={{ color: Colors.mutedGrey, fontSize: scale(16, s), textAlign: 'center' }}>
          {customisation.showSignature && customisation.signature
            ? customisation.signature
            : Brand.slogan.fa}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  ornament: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  line: {
    width: 48,
    height: 1,
  },
  diamond: {
    width: 10,
    height: 10,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  headline: {
    fontWeight: '600',
  },
  support: {
    fontWeight: '400',
  },
  divider: {
    width: 1,
    height: 48,
    marginVertical: 32,
  },
  body: {
    fontWeight: '400',
    maxWidth: '92%',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  thin: {
    width: '40%',
    height: 1,
  },
});
