import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { borderWidth, radius, spacing } from '../../theme';
import { textStyles } from '../../theme/typography';

interface ContentCardProps {
  title: string;
  body: string;
  meta?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
  compact?: boolean;
}

export function ContentCard({
  title,
  body,
  meta,
  onPress,
  trailing,
  compact,
}: ContentCardProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.88 : 1,
          padding: compact ? spacing.sm : spacing.md,
        },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[textStyles.bodyBold, { color: theme.text, flex: 1, textAlign: 'right' }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {trailing}
      </View>
      <Text
        style={[textStyles.caption, { color: theme.textMuted, textAlign: 'right', marginTop: spacing.xs }]}
        numberOfLines={compact ? 2 : 3}
      >
        {body}
      </Text>
      {meta ? (
        <Text
          style={[textStyles.label, { color: theme.accent, marginTop: spacing.sm, textAlign: 'right' }]}
        >
          {meta}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: borderWidth.hairline,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
