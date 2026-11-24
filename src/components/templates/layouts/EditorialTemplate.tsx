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

export function EditorialTemplate({
  headline,
  supportingText,
  text,
  customisation,
  width,
  height,
}: LayoutProps) {
  const bg = bgVariant(customisation.backgroundVariant, [
    Colors.lightBackground,
    '#EDEBE6',
    '#F8F7F4',
  ]);
  const color = textPalette(customisation.textColorVariant, false);
  const s = customisation.fontSizeScale;

  return (
    <View style={[styles.root, { width, height, backgroundColor: bg }]}>
      <View style={[styles.masthead, { borderBottomColor: Colors.deepBlack }]}>
        <Text style={[styles.issue, { color: Colors.bloodRed, fontSize: scale(16, s) }]}>
          ۰۱ / FIELD MANUAL
        </Text>
        <Text style={[styles.mastBrand, { color: Colors.deepBlack, fontSize: scale(18, s) }]}>
          {Brand.name}
        </Text>
      </View>

      <View style={styles.bodyWrap}>
        <Text
          style={[
            styles.headline,
            alignStyle(customisation.textAlign),
            { color, fontSize: scale(64, s), lineHeight: scale(74, s) },
          ]}
        >
          {headline}
        </Text>
        {supportingText ? (
          <Text
            style={[
              styles.kicker,
              alignStyle(customisation.textAlign),
              {
                color: Colors.bloodRed,
                fontSize: scale(22, s),
                borderTopColor: Colors.deepBlack,
              },
            ]}
          >
            {supportingText}
          </Text>
        ) : null}
        <View style={styles.columns}>
          <View style={[styles.rule, { backgroundColor: Colors.deepBlack }]} />
          <Text
            style={[
              styles.article,
              alignStyle(customisation.textAlign),
              { color, fontSize: scale(26, s), lineHeight: scale(42, s) },
            ]}
          >
            {text}
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { borderTopColor: Colors.deepBlack }]}>
        <Text style={{ color: Colors.mutedGrey, fontSize: scale(16, s) }}>
          {customisation.showSignature && customisation.signature
            ? customisation.signature
            : Brand.slogan.fa}
        </Text>
        <Text
          style={{
            color: Colors.deepBlack,
            fontSize: scale(14, s),
            letterSpacing: 2,
            writingDirection: 'ltr',
          }}
        >
          {Brand.slogan.en}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 56,
    paddingVertical: 48,
    justifyContent: 'space-between',
  },
  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingBottom: 16,
  },
  issue: {
    fontWeight: '700',
    letterSpacing: 1,
    writingDirection: 'ltr',
  },
  mastBrand: {
    fontWeight: '700',
    letterSpacing: 3,
    writingDirection: 'ltr',
  },
  bodyWrap: {
    flex: 1,
    paddingTop: 40,
  },
  headline: {
    fontWeight: '800',
  },
  kicker: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    fontWeight: '600',
  },
  columns: {
    marginTop: 28,
    flexDirection: 'row-reverse',
    gap: 20,
  },
  rule: {
    width: 3,
  },
  article: {
    flex: 1,
    fontWeight: '400',
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
