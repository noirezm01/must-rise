import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { Colors, spacing } from '../../theme';
import { textStyles } from '../../theme/typography';

interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  index?: string;
}

export function SectionHeading({
  title,
  actionLabel,
  onAction,
  index,
}: SectionHeadingProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {index ? (
          <Text style={[textStyles.label, { color: Colors.bloodRed, marginLeft: spacing.xs }]}>
            {index}
          </Text>
        ) : (
          <View style={[styles.mark, { backgroundColor: theme.accent }]} />
        )}
        <Text style={[textStyles.bodyBold, { color: theme.text }]}>{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[textStyles.caption, { color: theme.accent }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  mark: {
    width: 3,
    height: 16,
    marginLeft: spacing.xs,
  },
});
