import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { borderWidth, radius, spacing } from '../../theme';
import { textStyles } from '../../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  multilineHeight?: number;
}

export function Input({
  label,
  error,
  style,
  multilineHeight,
  ...rest
}: InputProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text style={[textStyles.caption, { color: theme.textMuted, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={theme.textMuted}
        textAlign="right"
        {...rest}
        style={[
          textStyles.body,
          styles.input,
          {
            color: theme.text,
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.danger : theme.border,
            minHeight: rest.multiline ? multilineHeight ?? 120 : 48,
            textAlignVertical: rest.multiline ? 'top' : 'center',
          },
          style,
        ]}
      />
      {error ? (
        <Text style={[textStyles.caption, { color: theme.danger, marginTop: spacing.xxs }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  input: {
    borderWidth: borderWidth.hairline,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    writingDirection: 'rtl',
  },
});
