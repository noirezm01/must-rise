import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Chip,
  ContentCard,
  EmptyState,
  SearchBar,
  SectionHeading,
} from '../components/ui';
import { useApp, useAppTheme } from '../context/AppContext';
import { CATEGORY_ORDER, searchArsenal } from '../data/arsenalContent';
import { fa } from '../i18n/fa';
import type { ArsenalStackParamList } from '../navigation/types';
import { contentLibrary } from '../services/contentLibrary';
import { spacing } from '../theme';
import { textStyles } from '../theme/typography';
import type { ContentCategory } from '../types/models';

type Filter = ContentCategory | 'all' | 'favourites';

export function ArsenalScreen() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { arsenalFavourites, refreshFavourites } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<ArsenalStackParamList>>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const items = useMemo(() => {
    if (filter === 'favourites') {
      return contentLibrary.filterFavourites(
        arsenalFavourites,
        'all',
        query,
      );
    }
    return searchArsenal(query, filter === 'all' ? 'all' : filter);
  }, [query, filter, arsenalFavourites]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.md }}>
        <Text style={[textStyles.title, { color: theme.text, textAlign: 'right' }]}>
          {fa.arsenal.title}
        </Text>
        <Text
          style={[
            textStyles.caption,
            { color: theme.textMuted, textAlign: 'right', marginTop: spacing.xxs },
          ]}
        >
          {fa.arsenal.subtitle}
        </Text>
        <View style={{ marginTop: spacing.md }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={fa.arsenal.searchPlaceholder}
          />
        </View>
        <View style={styles.chips}>
          <Chip
            label={fa.arsenal.allCategories}
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <Chip
            label={fa.creations.favourites}
            selected={filter === 'favourites'}
            onPress={() => setFilter('favourites')}
          />
          {CATEGORY_ORDER.map((cat) => (
            <Chip
              key={cat}
              label={fa.categories[cat]}
              selected={filter === cat}
              onPress={() => setFilter(cat)}
            />
          ))}
        </View>
        <SectionHeading title={`${items.length} مورد`} index="01" />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.xxl,
        }}
        ListEmptyComponent={
          <EmptyState title={fa.common.empty} body={fa.arsenal.emptySearch} />
        }
        renderItem={({ item }) => {
          const fav = arsenalFavourites.includes(item.id);
          return (
            <ContentCard
              title={item.title}
              body={item.body}
              meta={fa.categories[item.category]}
              onPress={() =>
                navigation.navigate('ArsenalDetail', { itemId: item.id })
              }
              trailing={
                <Pressable
                  hitSlop={10}
                  onPress={async () => {
                    await contentLibrary.toggleFavourite(item.id);
                    await refreshFavourites();
                  }}
                >
                  <Ionicons
                    name={fav ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={fav ? theme.accent : theme.textMuted}
                  />
                </Pressable>
              }
            />
          );
        }}
      />
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
});
