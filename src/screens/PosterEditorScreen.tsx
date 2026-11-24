import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Chip,
  Header,
  Input,
} from '../components/ui';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';
import { POSTER_HEIGHT, POSTER_WIDTH } from '../components/templates/types';
import { useApp, useAppTheme } from '../context/AppContext';
import { getTemplate, templates } from '../data/templates';
import { fa } from '../i18n/fa';
import type { HomeStackParamList } from '../navigation/types';
import { exportPosterImage } from '../services/export';
import { getPoster, savePoster } from '../services/posters';
import { shareImage } from '../services/sharing';
import { spacing } from '../theme';
import { textStyles } from '../theme/typography';
import {
  DEFAULT_CUSTOMISATION,
  type PosterCustomisation,
  type TemplateId,
  type TextAlignOption,
} from '../types/models';

export function PosterEditorScreen() {
  const theme = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();
  const { preferences, refreshCreations } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'PosterEditor'>>();
  const captureRefView = useRef<View>(null);

  const [posterId, setPosterId] = useState<string | undefined>(
    route.params.posterId,
  );
  const [templateId, setTemplateId] = useState<TemplateId>(
    route.params.templateId,
  );
  const [title, setTitle] = useState('پوستر');
  const [headline, setHeadline] = useState(route.params.initialHeadline ?? '');
  const [supportingText, setSupportingText] = useState(
    route.params.initialSupporting ?? '',
  );
  const [text, setText] = useState(route.params.initialText ?? '');
  const [customisation, setCustomisation] =
    useState<PosterCustomisation>(DEFAULT_CUSTOMISATION);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [lastExportUri, setLastExportUri] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!route.params.posterId) {
        const tpl = getTemplate(route.params.templateId);
        if (tpl && mounted) {
          if (!route.params.initialHeadline) setHeadline(tpl.defaultHeadline);
          if (!route.params.initialSupporting) {
            setSupportingText(tpl.defaultSupporting);
          }
        }
        return;
      }
      const existing = await getPoster(route.params.posterId);
      if (!mounted || !existing) return;
      setPosterId(existing.id);
      setTemplateId(existing.templateId);
      setTitle(existing.title);
      setHeadline(existing.headline);
      setSupportingText(existing.supportingText);
      setText(existing.text);
      setCustomisation(existing.customisation);
      setLastExportUri(existing.exportedImageUri);
    })();
    return () => {
      mounted = false;
    };
  }, [
    route.params.posterId,
    route.params.templateId,
    route.params.initialHeadline,
    route.params.initialSupporting,
  ]);

  const previewWidth = Math.min(windowWidth - spacing.md * 2, 360);
  const previewHeight = (previewWidth * POSTER_HEIGHT) / POSTER_WIDTH;
  const scale = previewWidth / POSTER_WIDTH;

  const patchCustom = (patch: Partial<PosterCustomisation>) => {
    setCustomisation((prev) => ({ ...prev, ...patch }));
  };

  const onSave = async (exportedImageUri?: string) => {
    setSaving(true);
    try {
      const saved = await savePoster({
        id: posterId,
        title: title.trim() || headline.trim() || 'پوستر',
        templateId,
        text,
        headline,
        supportingText,
        customisation,
        exportedImageUri: exportedImageUri ?? lastExportUri,
      });
      setPosterId(saved.id);
      if (exportedImageUri) setLastExportUri(exportedImageUri);
      await refreshCreations();
      return saved;
    } catch {
      Alert.alert(fa.common.error, fa.errors.storage);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const onExport = async () => {
    setExporting(true);
    try {
      const result = await exportPosterImage(
        captureRefView,
        preferences.defaultExportQuality,
      );
      setLastExportUri(result.uri);
      await onSave(result.uri);

      if (result.permissionDenied) {
        Alert.alert(fa.common.success, fa.poster.permissionDenied, [
          {
            text: fa.common.share,
            onPress: () => shareImage(result.uri),
          },
          { text: fa.common.close, style: 'cancel' },
        ]);
      } else {
        Alert.alert(fa.common.success, fa.poster.exportSuccess, [
          {
            text: fa.common.share,
            onPress: () => shareImage(result.uri),
          },
          { text: fa.common.done, style: 'cancel' },
        ]);
      }
    } catch {
      Alert.alert(fa.common.error, fa.poster.exportError);
    } finally {
      setExporting(false);
    }
  };

  const alignOptions: { id: TextAlignOption; label: string }[] = useMemo(
    () => [
      { id: 'right', label: fa.poster.alignRight },
      { id: 'center', label: fa.poster.alignCenter },
      { id: 'left', label: fa.poster.alignLeft },
    ],
    [],
  );

  const rendererProps = {
    templateId,
    headline,
    supportingText,
    text,
    customisation,
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title={fa.poster.editorTitle} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            padding: spacing.md,
            paddingBottom: spacing.xxl,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: 'right',
                marginBottom: spacing.xs,
              },
            ]}
          >
            {fa.poster.selectTemplate}
          </Text>
          <ScrollView horizontal inverted showsHorizontalScrollIndicator={false}>
            <View style={styles.templateRow}>
              {templates.map((tpl) => (
                <Chip
                  key={tpl.id}
                  label={tpl.name}
                  selected={templateId === tpl.id}
                  onPress={() => setTemplateId(tpl.id)}
                />
              ))}
            </View>
          </ScrollView>

          <View
            style={[
              styles.previewShell,
              {
                width: previewWidth,
                height: previewHeight,
                borderColor: theme.border,
                alignSelf: 'center',
                marginVertical: spacing.md,
              },
            ]}
          >
            <View
              style={{
                width: POSTER_WIDTH,
                height: POSTER_HEIGHT,
                transform: [{ scale }],
              }}
            >
              <TemplateRenderer {...rendererProps} />
            </View>
          </View>

          {/* Full-size capture surface — off-screen, not visible in UI */}
          <View style={styles.captureHost} pointerEvents="none">
            <TemplateRenderer ref={captureRefView} {...rendererProps} />
          </View>

          <Input label="عنوان پروژه" value={title} onChangeText={setTitle} />
          <View style={{ height: spacing.sm }} />
          <Input
            label={fa.poster.headline}
            value={headline}
            onChangeText={setHeadline}
          />
          <View style={{ height: spacing.sm }} />
          <Input
            label={fa.poster.supporting}
            value={supportingText}
            onChangeText={setSupportingText}
          />
          <View style={{ height: spacing.sm }} />
          <Input
            label={fa.poster.body}
            value={text}
            onChangeText={setText}
            multiline
            multilineHeight={120}
          />
          <View style={{ height: spacing.sm }} />
          <Input
            label={fa.poster.signature}
            value={customisation.signature}
            onChangeText={(signature) => patchCustom({ signature })}
          />

          <View style={styles.switchRow}>
            <Text style={[textStyles.body, { color: theme.text }]}>
              {fa.poster.showSignature}
            </Text>
            <Switch
              value={customisation.showSignature}
              onValueChange={(showSignature) => patchCustom({ showSignature })}
              trackColor={{ true: theme.accent, false: theme.border }}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={[textStyles.body, { color: theme.text }]}>
              {fa.poster.showTitle}
            </Text>
            <Switch
              value={customisation.showTitle}
              onValueChange={(showTitle) => patchCustom({ showTitle })}
              trackColor={{ true: theme.accent, false: theme.border }}
            />
          </View>

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: 'right',
                marginTop: spacing.md,
              },
            ]}
          >
            {fa.poster.alignment}
          </Text>
          <View style={styles.chips}>
            {alignOptions.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                selected={customisation.textAlign === opt.id}
                onPress={() => patchCustom({ textAlign: opt.id })}
              />
            ))}
          </View>

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: 'right',
                marginTop: spacing.sm,
              },
            ]}
          >
            {fa.poster.fontSize}
          </Text>
          <View style={styles.chips}>
            {[0.85, 1, 1.15].map((value) => (
              <Chip
                key={value}
                label={value === 0.85 ? 'کوچک' : value === 1 ? 'متوسط' : 'بزرگ'}
                selected={customisation.fontSizeScale === value}
                onPress={() => patchCustom({ fontSizeScale: value })}
              />
            ))}
          </View>

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: 'right',
                marginTop: spacing.sm,
              },
            ]}
          >
            {fa.poster.background}
          </Text>
          <View style={styles.chips}>
            {[0, 1, 2].map((value) => (
              <Chip
                key={value}
                label={`${value + 1}`}
                selected={customisation.backgroundVariant === value}
                onPress={() => patchCustom({ backgroundVariant: value })}
              />
            ))}
          </View>

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: 'right',
                marginTop: spacing.sm,
              },
            ]}
          >
            {fa.poster.textColor}
          </Text>
          <View style={styles.chips}>
            {[0, 1, 2].map((value) => (
              <Chip
                key={value}
                label={`${value + 1}`}
                selected={customisation.textColorVariant === value}
                onPress={() => patchCustom({ textColorVariant: value })}
              />
            ))}
          </View>

          <View style={styles.actions}>
            <Button
              label={fa.poster.saveProject}
              onPress={async () => {
                const saved = await onSave();
                if (saved) Alert.alert(fa.common.success, fa.poster.saved);
              }}
              loading={saving}
              fullWidth
            />
            <Button
              label={exporting ? fa.poster.exporting : fa.common.export}
              onPress={onExport}
              loading={exporting}
              variant="secondary"
              fullWidth
              style={{ marginTop: spacing.sm }}
            />
            <Button
              label={fa.common.share}
              onPress={async () => {
                if (!lastExportUri) {
                  await onExport();
                  return;
                }
                try {
                  await shareImage(lastExportUri);
                } catch {
                  Alert.alert(fa.common.error, fa.poster.shareError);
                }
              }}
              variant="ghost"
              fullWidth
              style={{ marginTop: spacing.sm }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  templateRow: {
    flexDirection: 'row-reverse',
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  previewShell: {
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  captureHost: {
    position: 'absolute',
    left: -10000,
    top: 0,
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    opacity: 1,
  },
  switchRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  chips: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  actions: {
    marginTop: spacing.lg,
  },
});
