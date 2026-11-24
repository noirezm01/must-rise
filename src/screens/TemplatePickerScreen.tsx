import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/ui';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';
import { useAppTheme } from '../context/AppContext';
import { templates } from '../data/templates';
import { fa } from '../i18n/fa';
import type { HomeStackParamList } from '../navigation/types';
import { Colors, spacing } from '../theme';
import { textStyles } from '../theme/typography';
import { DEFAULT_CUSTOMISATION } from '../types/models';

const PREVIEW_W = 160;
const PREVIEW_H = 200;
const SCALE = PREVIEW_W / 1080;

export function TemplatePickerScreen() {
  const theme = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'TemplatePicker'>>();
  const params = route.params ?? {};

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title={fa.poster.title}
        subtitle={fa.poster.selectTemplate}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}>
        <View style={styles.grid}>
          {templates.map((tpl) => {
            const headline =
              params.initialHeadline?.trim() || tpl.defaultHeadline;
            const supporting =
              params.initialSupporting?.trim() || tpl.defaultSupporting;
            const text =
              params.initialText?.trim() ||
              'متن خود را اینجا قرار دهید.';

            return (
              <Pressable
                key={tpl.id}
                onPress={() =>
                  navigation.navigate('PosterEditor', {
                    templateId: tpl.id,
                    posterId: params.posterId,
                    initialText: params.initialText,
                    initialHeadline: params.initialHeadline,
                    initialSupporting: params.initialSupporting,
                  })
                }
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <View style={styles.previewClip}>
                  <View
                    style={{
                      width: PREVIEW_W,
                      height: PREVIEW_H,
                      overflow: 'hidden',
                      alignSelf: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 1080,
                        height: 1350,
                        transform: [
                          { translateX: -(1080 - PREVIEW_W) / 2 },
                          { translateY: -(1350 - PREVIEW_H) / 2 },
                          { scale: SCALE },
                        ],
                      }}
                    >
                      <TemplateRenderer
                        templateId={tpl.id}
                        headline={headline}
                        supportingText={supporting}
                        text={text}
                        customisation={DEFAULT_CUSTOMISATION}
                        width={1080}
                        height={1350}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.meta}>
                  <View style={[styles.accent, { backgroundColor: Colors.bloodRed }]} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        textStyles.bodyBold,
                        { color: theme.text, textAlign: 'right' },
                      ]}
                    >
                      {tpl.name}
                    </Text>
                    <Text
                      style={[
                        textStyles.caption,
                        { color: theme.textMuted, textAlign: 'right', marginTop: 4 },
                      ]}
                      numberOfLines={2}
                    >
                      {tpl.description}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
  },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  previewClip: {
    width: '100%',
    height: PREVIEW_H,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.deepBlack,
  },
  meta: {
    flexDirection: 'row-reverse',
    gap: spacing.sm,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  accent: {
    width: 2,
    alignSelf: 'stretch',
  },
});
