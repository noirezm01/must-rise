import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../context/AppContext';
import { borderWidth, radius, spacing } from '../../theme';
import { textStyles } from '../../theme/typography';
import { fa } from '../../i18n/fa';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = fa.common.search,
}: SearchBarProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.inputBackground,
          borderColor: theme.border,
        },
      ]}
    >
      <Ionicons name="search" size={18} color={theme.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        textAlign="right"
        style={[textStyles.body, styles.input, { color: theme.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: borderWidth.hairline,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    minHeight: 44,
    gap: spacing.xs,
  },
  input: {
    flex: 1,
    writingDirection: 'rtl',
    paddingVertical: spacing.sm,
  },
});
