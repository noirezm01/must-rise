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

export function PatrioticTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const bg = bgVariant(customisation.backgroundVariant, [
    Colors.deepBlack,
    '#14080A',
    Colors.darkSurface,
  ]);
  const color = textPalette(customisation.textColorVariant, true);
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg }]}>
      <View style={[styles.banner, { backgroundColor: Colors.bloodRed }]}>
        <Text
          style={[
            styles.bannerText,
            {
              color: Colors.pureWhite,
              fontSize: scale(20, s),
              letterSpacing: 5,
            },
          ]}
        >
          {Brand.name}
        </Text>
      </View>

      <View style={[styles.content, { padding: width * 0.09 }]}>
        <View style={[styles.sideBar, { backgroundColor: Colors.bloodRed }]} />
        <View style={styles.main}>
          <Text
            style={[
              styles.headline,
              alignStyle(customisation.textAlign),
              { color, fontSize: scale(52, s), lineHeight: scale(66, s) },
            ]}
          >
            {headline}
          </Text>
          {supportingText ? (
            <Text
              style={[
                styles.support,
                alignStyle(customisation.textAlign),
                {
                  color: Colors.bloodRed,
                  fontSize: scale(24, s),
                  marginTop: 12,
                  letterSpacing: 2,
                },
              ]}
            >
              {supportingText}
            </Text>
          ) : null}
          <View style={[styles.rule, { backgroundColor: Colors.subtleBorder }]} />
          <Text
            style={[
              styles.body,
              alignStyle(customisation.textAlign),
              { color, fontSize: scale(28, s), lineHeight: scale(44, s) },
            ]}
          >
            {text}
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { borderTopColor: Colors.subtleBorder }]}>
        <Text style={{ color: Colors.mutedGrey, fontSize: scale(16, s) }}>
          {customisation.showSignature && customisation.signature
            ? customisation.signature
            : Brand.slogan.fa}
        </Text>
        <View style={[styles.dot, { backgroundColor: Colors.bloodRed }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
  },
  banner: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  bannerText: {
    fontWeight: '800',
    writingDirection: 'ltr',
  },
  content: {
    flex: 1,
    flexDirection: 'row-reverse',
    gap: 24,
  },
  sideBar: {
    width: 4,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontWeight: '800',
  },
  support: {
    fontWeight: '600',
  },
  rule: {
    height: 1,
    marginVertical: 24,
  },
  body: {
    fontWeight: '400',
  },
  footer: {
    borderTopWidth: 1,
    marginHorizontal: 40,
    marginBottom: 36,
    paddingTop: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
  },
});
