import * as Sharing from 'expo-sharing';
import { Share, Platform } from 'react-native';

export async function shareImage(uri: string, message?: string): Promise<void> {
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: message ?? 'Must Rise',
      UTI: 'public.png',
    });
    return;
  }

  await Share.share(
    Platform.select({
      ios: { url: uri, message },
      default: { message: message ? `${message}\n${uri}` : uri },
    })!,
  );
}

export async function shareText(text: string): Promise<void> {
  await Share.share({ message: text });
}
