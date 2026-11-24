import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Chip,
  ContentCard,
  Dialog,
  EmptyState,
  SearchBar,
} from '../components/ui';
import { useApp, useAppTheme } from '../context/AppContext';
import { fa } from '../i18n/fa';
import type { CreationsStackParamList } from '../navigation/types';
import {
  deleteText,
  duplicateText,
  renameText,
  searchTexts,
} from '../services/drafts';
import {
  deletePoster,
  duplicatePoster,
  renamePoster,
  searchPosters,
} from '../services/posters';
import { Colors, radius, spacing } from '../theme';
import { textStyles } from '../theme/typography';
import type { TemplateId } from '../types/models';

type TabFilter = 'all' | 'drafts' | 'posters' | 'favourites';

type ListItem =
  | {
      kind: 'text';
      id: string;
      title: string;
      body: string;
      meta: string;
      updatedAt: string;
    }
  | {
      kind: 'poster';
      id: string;
      title: string;
      body: string;
      meta: string;
      updatedAt: string;
      templateId: TemplateId;
    };

export function CreationsScreen() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { texts, posters, refreshCreations } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<CreationsStackParamList>>();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TabFilter>('all');
  const [deleteTarget, setDeleteTarget] = useState<ListItem | null>(null);
  const [renameTarget, setRenameTarget] = useState<ListItem | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const items = useMemo(() => {
    const textItems: ListItem[] = searchTexts(texts, query).map((t) => ({
      kind: 'text' as const,
      id: t.id,
      title: t.title,
      body: t.body,
      meta: t.isFavourite ? fa.creations.favourites : fa.creations.drafts,
      updatedAt: t.updatedAt,
    }));
    const posterItems: ListItem[] = searchPosters(posters, query).map((p) => ({
      kind: 'poster' as const,
      id: p.id,
      title: p.title,
      body: p.headline || p.text,
      meta: fa.creations.posters,
      updatedAt: p.updatedAt,
      templateId: p.templateId,
    }));

    let combined: ListItem[] = [...textItems, ...posterItems];
    if (filter === 'drafts') {
      combined = textItems;
    } else if (filter === 'posters') {
      combined = posterItems;
    } else if (filter === 'favourites') {
      combined = textItems.filter((t) =>
        texts.find((x) => x.id === t.id)?.isFavourite,
      );
    }

    return combined.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [texts, posters, query, filter]);

  const openItem = (item: ListItem) => {
    if (item.kind === 'text') {
      navigation.navigate('Write', { textId: item.id });
    } else {
      navigation.navigate('PosterEditor', {
        posterId: item.id,
        templateId: item.templateId,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.md,
        }}
      >
        <Text style={[textStyles.title, { color: theme.text, textAlign: 'right' }]}>
          {fa.creations.title}
        </Text>
        <View style={{ marginTop: spacing.md }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={fa.creations.searchPlaceholder}
          />
        </View>
        <View style={styles.chips}>
          {(
            [
              ['all', fa.creations.all],
              ['drafts', fa.creations.drafts],
              ['posters', fa.creations.posters],
              ['favourites', fa.creations.favourites],
            ] as const
          ).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              selected={filter === key}
              onPress={() => setFilter(key)}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => `${item.kind}-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.xxl,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <EmptyState
            title={fa.creations.emptyTitle}
            body={fa.creations.emptyBody}
            actionLabel={fa.common.createNew}
            onAction={() => navigation.navigate('Write', {})}
          />
        }
        renderItem={({ item }) => (
          <ContentCard
            title={item.title}
            body={item.body}
            meta={item.meta}
            onPress={() => openItem(item)}
            trailing={
              <View style={styles.actions}>
                <Pressable
                  hitSlop={8}
                  onPress={async () => {
                    if (item.kind === 'text') {
                      await duplicateText(item.id);
                    } else {
                      await duplicatePoster(item.id);
                    }
                    await refreshCreations();
                    Alert.alert(fa.common.success, fa.creations.duplicated);
                  }}
                >
                  <Ionicons name="copy-outline" size={18} color={theme.textMuted} />
                </Pressable>
                <Pressable
                  hitSlop={8}
                  onPress={() => {
                    setRenameTarget(item);
                    setRenameValue(item.title);
                  }}
                >
                  <Ionicons name="pencil-outline" size={18} color={theme.textMuted} />
                </Pressable>
                <Pressable hitSlop={8} onPress={() => setDeleteTarget(item)}>
                  <Ionicons name="trash-outline" size={18} color={theme.danger} />
                </Pressable>
              </View>
            }
          />
        )}
      />

      <Dialog
        visible={Boolean(deleteTarget)}
        title={fa.common.delete}
        message={fa.creations.deleteConfirm}
        destructive
        confirmLabel={fa.common.delete}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          if (deleteTarget.kind === 'text') {
            await deleteText(deleteTarget.id);
          } else {
            await deletePoster(deleteTarget.id);
          }
          await refreshCreations();
          setDeleteTarget(null);
          Alert.alert(fa.common.success, fa.creations.deleted);
        }}
      />

      <Modal
        visible={Boolean(renameTarget)}
        transparent
        animationType="fade"
        onRequestClose={() => setRenameTarget(null)}
      >
        <Pressable
          style={styles.renameBackdrop}
          onPress={() => setRenameTarget(null)}
        >
          <Pressable
            style={[
              styles.renameSheet,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[textStyles.heading, { color: theme.text, textAlign: 'right' }]}>
              {fa.common.rename}
            </Text>
            <TextInput
              value={renameValue}
              onChangeText={setRenameValue}
              textAlign="right"
              placeholderTextColor={theme.textMuted}
              style={[
                textStyles.body,
                styles.renameInput,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: theme.inputBackground,
                },
              ]}
            />
            <View style={styles.renameActions}>
              <Button
                label={fa.common.save}
                onPress={async () => {
                  if (!renameTarget) return;
                  if (renameTarget.kind === 'text') {
                    await renameText(renameTarget.id, renameValue);
                  } else {
                    await renamePoster(renameTarget.id, renameValue);
                  }
                  await refreshCreations();
                  setRenameTarget(null);
                  Alert.alert(fa.common.success, fa.creations.renamed);
                }}
                style={{ flex: 1 }}
              />
              <Button
                label={fa.common.cancel}
                variant="ghost"
                onPress={() => setRenameTarget(null)}
                style={{ flex: 1 }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  renameBackdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  renameSheet: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  renameInput: {
    borderWidth: 1,
    marginTop: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  renameActions: {
    flexDirection: 'row-reverse',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
