import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { spacing } from '../../theme';
import { textStyles } from '../../theme/typography';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, body, actionLabel, onAction }: EmptyStateProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={[styles.rule, { backgroundColor: theme.accent }]} />
      <Text style={[textStyles.heading, { color: theme.text, textAlign: 'center' }]}>{title}</Text>
      <Text
        style={[
          textStyles.body,
          { color: theme.textMuted, textAlign: 'center', marginTop: spacing.sm },
        ]}
      >
        {body}
      </Text>
      {actionLabel && onAction ? (
        <View style={{ marginTop: spacing.lg, alignSelf: 'stretch' }}>
          <Button label={actionLabel} onPress={onAction} fullWidth />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  rule: {
    width: 40,
    height: 2,
    marginBottom: spacing.md,
  },
});
