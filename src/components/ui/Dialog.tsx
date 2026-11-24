import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../context/AppContext';
import { Colors, radius, spacing } from '../../theme';
import { textStyles } from '../../theme/typography';
import { Button } from './Button';

interface DialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Dialog({
  visible,
  title,
  message,
  confirmLabel = 'تأیید',
  cancelLabel = 'انصراف',
  destructive,
  onConfirm,
  onCancel,
}: DialogProps) {
  const theme = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={[textStyles.heading, { color: theme.text, textAlign: 'right' }]}>
            {title}
          </Text>
          <Text
            style={[
              textStyles.body,
              { color: theme.textMuted, textAlign: 'right', marginTop: spacing.sm },
            ]}
          >
            {message}
          </Text>
          <View style={styles.actions}>
            <Button
              label={confirmLabel}
              onPress={onConfirm}
              variant={destructive ? 'danger' : 'primary'}
              style={{ flex: 1 }}
            />
            <Button
              label={cancelLabel}
              onPress={onCancel}
              variant="ghost"
              style={{ flex: 1 }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  actions: {
    flexDirection: 'row-reverse',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
