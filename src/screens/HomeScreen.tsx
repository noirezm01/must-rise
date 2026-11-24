import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brand } from '../brand/brand';
import { Button, ContentCard, EmptyState, SectionHeading } from '../components/ui';
import { useApp, useAppTheme } from '../context/AppContext';
import { CATEGORY_ORDER } from '../data/arsenalContent';
import { fa } from '../i18n/fa';
import type { HomeStackParamList } from '../navigation/types';
import { Colors, spacing } from '../theme';
import { textStyles } from '../theme/typography';

export function HomeScreen() {
  const theme = useAppTheme();
  const { texts, posters } = useApp();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const recent = useMemo(() => {
    const textItems = texts.slice(0, 3).map((t) => ({
      id: t.id,
      title: t.title,
      body: t.body,
      kind: 'text' as const,
      updatedAt: t.updatedAt,
    }));
    const posterItems = posters.slice(0, 3).map((p) => ({
      id: p.id,
      title: p.title,
      body: p.headline || p.text,
      kind: 'poster' as const,
      updatedAt: p.updatedAt,
      templateId: p.templateId,
    }));
    return [...textItems, ...posterItems]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 4);
  }, [texts, posters]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingBottom: spacing.xxl,
        paddingHorizontal: spacing.md,
      }}
    >
      <View style={styles.topRow}>
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={fa.common.settings}
        >
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </Pressable>
        <View style={[styles.brandMark, { borderColor: theme.border }]}>
          <View style={[styles.brandDot, { backgroundColor: theme.accent }]} />
          <Text style={[textStyles.label, { color: theme.textMuted }]}>ARSENAL</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={[textStyles.heroBrand, { color: theme.text }]}>{Brand.name}</Text>
        <Text
          style={[
            textStyles.title,
            { color: theme.accent, marginTop: spacing.sm, textAlign: 'right' },
          ]}
        >
          {fa.brand.slogan}
        </Text>
        <Text
          style={[
            textStyles.body,
            {
              color: theme.textMuted,
              marginTop: spacing.sm,
              textAlign: 'right',
              maxWidth: 320,
              alignSelf: 'flex-end',
            },
          ]}
        >
          {fa.brand.tagline}
        </Text>
        <View style={[styles.heroRule, { backgroundColor: theme.border }]} />
      </View>

      <View style={styles.actions}>
        <Button
          label={fa.common.write}
          onPress={() => navigation.navigate('Write', {})}
          size="lg"
          fullWidth
        />
        <Button
          label={fa.common.chooseTemplate}
          onPress={() => navigation.navigate('TemplatePicker', {})}
          variant="secondary"
          size="lg"
          fullWidth
          style={{ marginTop: spacing.sm }}
        />
      </View>

      <View style={{ marginTop: spacing.xl }}>
        <SectionHeading title={fa.home.arsenalPreview} index="01" />
        <View style={styles.categoryGrid}>
          {CATEGORY_ORDER.map((cat) => (
            <Pressable
              key={cat}
              onPress={() =>
                navigation.getParent()?.navigate('ArsenalTab', {
                  screen: 'ArsenalMain',
                })
              }
              style={({ pressed }) => [
                styles.categoryCell,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <View style={[styles.categoryAccent, { backgroundColor: Colors.bloodRed }]} />
              <Text style={[textStyles.bodyBold, { color: theme.text, textAlign: 'right' }]}>
                {fa.categories[cat]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ marginTop: spacing.xl }}>
        <SectionHeading
          title={fa.home.recentCreations}
          index="02"
          actionLabel={fa.home.seeAll}
          onAction={() => navigation.getParent()?.navigate('CreationsTab')}
        />
        {recent.length === 0 ? (
          <EmptyState
            title={fa.home.emptyRecentTitle}
            body={fa.home.emptyRecentBody}
            actionLabel={fa.common.write}
            onAction={() => navigation.navigate('Write', {})}
          />
        ) : (
          recent.map((item) => (
            <ContentCard
              key={`${item.kind}-${item.id}`}
              title={item.title}
              body={item.body}
              meta={item.kind === 'poster' ? 'پوستر' : 'نوشته'}
              onPress={() => {
                if (item.kind === 'text') {
                  navigation.navigate('Write', { textId: item.id });
                } else {
                  navigation.navigate('PosterEditor', {
                    posterId: item.id,
                    templateId: item.templateId,
                  });
                }
              }}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandMark: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  brandDot: {
    width: 6,
    height: 6,
  },
  hero: {
    marginTop: spacing.xl,
    alignItems: 'flex-end',
  },
  heroRule: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    marginTop: spacing.lg,
  },
  actions: {
    marginTop: spacing.lg,
  },
  categoryGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryCell: {
    width: '47%',
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryAccent: {
    width: 2,
    height: 18,
  },
});
