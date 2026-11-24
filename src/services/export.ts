import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import type { RefObject } from 'react';
import { captureRef } from 'react-native-view-shot';
import type { View } from 'react-native';

export interface ExportResult {
  uri: string;
  savedToLibrary: boolean;
  permissionDenied: boolean;
}

function postersDirectory(): string {
  const base = FileSystem.documentDirectory ?? FileSystem.cacheDirectory ?? '';
  return `${base}posters/`;
}

export async function capturePoster(
  viewRef: RefObject<View | null>,
  quality: 'standard' | 'high' = 'high',
): Promise<string> {
  if (!viewRef.current) {
    throw new Error('Poster view is not ready');
  }

  const uri = await captureRef(viewRef, {
    format: 'png',
    quality: quality === 'high' ? 1 : 0.85,
    result: 'tmpfile',
  });

  return uri;
}

export async function persistPosterFile(tempUri: string): Promise<string> {
  const dir = postersDirectory();
  const info = await FileSystem.getInfoAsync(dir);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
  const filename = `must-rise-${Date.now()}.png`;
  const dest = `${dir}${filename}`;
  await FileSystem.copyAsync({ from: tempUri, to: dest });
  return dest;
}

export async function savePosterToLibrary(uri: string): Promise<{
  saved: boolean;
  permissionDenied: boolean;
}> {
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (!permission.granted) {
    return { saved: false, permissionDenied: true };
  }
  await MediaLibrary.saveToLibraryAsync(uri);
  return { saved: true, permissionDenied: false };
}

export async function exportPosterImage(
  viewRef: RefObject<View | null>,
  quality: 'standard' | 'high' = 'high',
): Promise<ExportResult> {
  const tempUri = await capturePoster(viewRef, quality);
  const uri = await persistPosterFile(tempUri);
  const library = await savePosterToLibrary(uri);
  return {
    uri,
    savedToLibrary: library.saved,
    permissionDenied: library.permissionDenied,
  };
}
