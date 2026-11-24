import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Chip, Header, SectionHeading } from '../components/ui';
import { useApp, useAppTheme } from '../context/AppContext';
import { fa } from '../i18n/fa';
import { Brand } from '../brand/brand';
import { spacing } from '../theme';
import { textStyles } from '../theme/typography';
import type { WritingLength, WritingTone } from '../types/models';

const TONES: WritingTone[] = [
  'epic',
  'formal',
  'emotional',
  'literary',
  'punchy',
  'motivational',
];
const LENGTHS: WritingLength[] = ['short', 'medium', 'long'];

export function SettingsScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const { preferences, updatePreference } = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title={fa.settings.title}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}>
        <SectionHeading title={fa.settings.appearance} index="01" />
        <View style={styles.row}>
          <Chip
            label={fa.settings.themeDark}
            selected={preferences.theme === 'dark'}
            onPress={() => updatePreference('theme', 'dark')}
          />
          <Chip
            label={fa.settings.themeLight}
            selected={preferences.theme === 'light'}
            onPress={() => updatePreference('theme', 'light')}
          />
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading title={fa.settings.writingDefaults} index="02" />
          <Text style={[textStyles.caption, { color: theme.textMuted, textAlign: 'right' }]}>
            {fa.write.tone}
          </Text>
          <View style={styles.row}>
            {TONES.map((tone) => (
              <Chip
                key={tone}
                label={fa.tones[tone]}
                selected={preferences.defaultTone === tone}
                onPress={() => updatePreference('defaultTone', tone)}
              />
            ))}
          </View>
          <Text
            style={[
              textStyles.caption,
              { color: theme.textMuted, textAlign: 'right', marginTop: spacing.sm },
            ]}
          >
            {fa.write.length}
          </Text>
          <View style={styles.row}>
            {LENGTHS.map((length) => (
              <Chip
                key={length}
                label={fa.lengths[length]}
                selected={preferences.defaultLength === length}
                onPress={() => updatePreference('defaultLength', length)}
              />
            ))}
          </View>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading title={fa.settings.exportQuality} index="03" />
          <View style={styles.row}>
            <Chip
              label={fa.settings.qualityHigh}
              selected={preferences.defaultExportQuality === 'high'}
              onPress={() => updatePreference('defaultExportQuality', 'high')}
            />
            <Chip
              label={fa.settings.qualityStandard}
              selected={preferences.defaultExportQuality === 'standard'}
              onPress={() => updatePreference('defaultExportQuality', 'standard')}
            />
          </View>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <SectionHeading title={fa.settings.about} index="04" />
          <Text style={[textStyles.body, { color: theme.text, textAlign: 'right' }]}>
            {fa.settings.aboutBody}
          </Text>
          <Text
            style={[
              textStyles.caption,
              { color: theme.textMuted, textAlign: 'right', marginTop: spacing.md },
            ]}
          >
            {fa.settings.privacyBody}
          </Text>
          <View style={[styles.aboutBox, { borderColor: theme.border, marginTop: spacing.lg }]}>
            <Text style={[textStyles.heroBrand, { color: theme.text, fontSize: 22 }]}>
              {Brand.name}
            </Text>
            <Text style={[textStyles.caption, { color: theme.accent, marginTop: spacing.xs }]}>
              {Brand.slogan.fa} · {Brand.slogan.en}
            </Text>
            <Text
              style={[
                textStyles.caption,
                { color: theme.textMuted, marginTop: spacing.sm, writingDirection: 'ltr' },
              ]}
            >
              {fa.settings.version}: {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  aboutBox: {
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'flex-end',
  },
});
