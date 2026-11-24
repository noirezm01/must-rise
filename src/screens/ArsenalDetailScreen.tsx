import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Header } from '../components/ui';
import { useApp, useAppTheme } from '../context/AppContext';
import { getArsenalItem } from '../data/arsenalContent';
import { fa } from '../i18n/fa';
import type { ArsenalStackParamList } from '../navigation/types';
import { contentLibrary } from '../services/contentLibrary';
import { spacing } from '../theme';
import { textStyles } from '../theme/typography';

export function ArsenalDetailScreen() {
  const theme = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ArsenalStackParamList>>();
  const route = useRoute<RouteProp<ArsenalStackParamList, 'ArsenalDetail'>>();
  const { arsenalFavourites, refreshFavourites } = useApp();
  const item = getArsenalItem(route.params.itemId);
  const [busy, setBusy] = useState(false);

  if (!item) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header title={fa.errors.notFound} onBack={() => navigation.goBack()} />
      </View>
    );
  }

  const fav = arsenalFavourites.includes(item.id);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title={item.title}
        subtitle={fa.categories[item.category]}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}>
        <View style={[styles.panel, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <Text style={[textStyles.body, { color: theme.text, textAlign: 'right' }]}>
            {item.body}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            label={fa.common.copy}
            variant="secondary"
            onPress={async () => {
              await Clipboard.setStringAsync(item.body);
              Alert.alert(fa.common.success, fa.arsenal.copied);
            }}
            fullWidth
          />
          <Button
            label={fav ? fa.common.unfavourite : fa.common.favourite}
            variant="ghost"
            loading={busy}
            onPress={async () => {
              setBusy(true);
              try {
                await contentLibrary.toggleFavourite(item.id);
                await refreshFavourites();
              } finally {
                setBusy(false);
              }
            }}
            fullWidth
            style={{ marginTop: spacing.sm }}
          />
          <Button
            label={fa.arsenal.useInWrite}
            onPress={() =>
              navigation.navigate('Write', {
                initialBody: item.body,
                initialTitle: item.title,
                category: item.category,
              })
            }
            fullWidth
            style={{ marginTop: spacing.sm }}
          />
          <Button
            label={fa.arsenal.useInPoster}
            variant="secondary"
            onPress={() =>
              navigation.navigate('TemplatePicker', {
                initialText: item.body,
                initialHeadline: item.title,
              })
            }
            fullWidth
            style={{ marginTop: spacing.sm }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    padding: spacing.lg,
  },
  actions: {
    marginTop: spacing.lg,
  },
});
