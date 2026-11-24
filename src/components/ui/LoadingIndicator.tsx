import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { spacing } from '../../theme';
import { textStyles } from '../../theme/typography';
import { fa } from '../../i18n/fa';

interface LoadingIndicatorProps {
  label?: string;
  fullscreen?: boolean;
}

export function LoadingIndicator({
  label = fa.common.loading,
  fullscreen,
}: LoadingIndicatorProps) {
  const theme = useAppTheme();

  return (
    <View style={[styles.wrap, fullscreen && styles.fullscreen, { backgroundColor: theme.background }]}>
      <ActivityIndicator color={theme.accent} size="large" />
      <Text style={[textStyles.caption, { color: theme.textMuted, marginTop: spacing.sm }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  fullscreen: {
    flex: 1,
  },
});
