import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../context/AppContext';
import { spacing } from '../../theme';
import { textStyles } from '../../theme/typography';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  compact?: boolean;
}

export function Header({ title, subtitle, onBack, right, compact }: HeaderProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: compact ? spacing.sm : insets.top + spacing.sm,
          borderBottomColor: theme.border,
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.side}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={12}
              accessibilityRole="button"
              style={styles.backBtn}
            >
              <Ionicons name="chevron-forward" size={22} color={theme.text} />
            </Pressable>
          ) : null}
        </View>
        <View style={styles.center}>
          <Text style={[textStyles.heading, { color: theme.text, textAlign: 'center' }]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[textStyles.caption, { color: theme.textMuted, textAlign: 'center' }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  backBtn: {
    padding: spacing.xs,
  },
});
