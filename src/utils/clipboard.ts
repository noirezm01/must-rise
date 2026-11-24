import { Share } from 'react-native';

/**
 * Soft clipboard helper used only if expo-clipboard is unavailable.
 * Prefer expo-clipboard in screens; this is a fallback path.
 */
export async function copyTextFallback(text: string): Promise<void> {
  await Share.share({ message: text });
}
