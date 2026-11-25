import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Switch,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Chip, Dialog, Header, Input } from "../components/ui";
import { useApp, useAppTheme } from "../context/AppContext";
import { fa } from "../i18n/fa";
import type { HomeStackParamList } from "../navigation/types";
import { generateText, isRemoteAiConfigured } from "../services/ai";
import { getText, saveText } from "../services/drafts";
import { shareText } from "../services/sharing";
import { spacing } from "../theme";
import { textStyles } from "../theme/typography";
import type { WritingLength, WritingTone } from "../types/models";

const TONES: WritingTone[] = [
  "epic",
  "formal",
  "emotional",
  "literary",
  "punchy",
  "motivational",
];
const LENGTHS: WritingLength[] = ["short", "long"];

interface WriteScreenProps {
  embedded?: boolean;
}

export function WriteScreen({ embedded = false }: WriteScreenProps) {
  const theme = useAppTheme();
  const { preferences, refreshCreations } = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, "Write">>();

  const [textId, setTextId] = useState<string | undefined>(
    route.params?.textId,
  );

  const [topic, setTopic] = useState(route.params?.initialTitle ?? "");
  const [useEmoji, setUseEmoji] = useState(false);
  const [body, setBody] = useState(route.params?.initialBody ?? "");
  const [tone, setTone] = useState<WritingTone>(preferences.defaultTone);
  const [length, setLength] = useState<WritingLength>(
    preferences.defaultLength,
  );
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [clearOpen, setClearOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!route.params?.textId) return;
      const existing = await getText(route.params.textId);
      if (!mounted || !existing) return;
      setTextId(existing.id);
      setTopic(existing.title);
      setBody(existing.body);
      if (existing.tone) setTone(existing.tone);
      if (existing.length) setLength(existing.length);
    })();
    return () => {
      mounted = false;
    };
  }, [route.params?.textId]);

  const onGenerate = async () => {
    if (!topic.trim()) {
      Alert.alert(fa.common.error, fa.common.required);
      return;
    }
    setGenerating(true);
    setNotice(null);
    try {
      const result = await generateText({
        topic: topic.trim(),
        tone,
        length,
        useEmoji,
      });

      setBody(result.text);
      if (result.warning === "no-endpoint") {
        setNotice(fa.write.noEndpointNotice);
      } else if (
        result.warning === "remote-failed" ||
        result.warning === "local"
      ) {
        setNotice(fa.write.localFallbackNotice);
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message === "AI_NOT_CONFIGURED"
          ? "سرویس هوش مصنوعی پیکربندی نشده است."
          : "ارتباط با هوش مصنوعی برقرار نشد. لطفاً دوباره تلاش کنید.";

      Alert.alert("خطا در تولید متن", message, [
        {
          text: "تلاش دوباره",
          onPress: () => onGenerate(),
        },
        {
          text: "بستن",
          style: "cancel",
        },
      ]);
    } finally {
      setGenerating(false);
    }
  };

  const onSave = async () => {
    if (!body.trim()) {
      Alert.alert(fa.common.error, fa.common.required);
      return;
    }
    setSaving(true);
    try {
      const saved = await saveText({
        id: textId,
        title: topic.trim() || "پیش‌نویس",
        body: body.trim(),
        category: route.params?.category ?? "custom",
        source: notice
          ? "local-fallback"
          : isRemoteAiConfigured()
            ? "ai"
            : "user",
        isFavourite: false,
        tone,
        length,
      });
      setTextId(saved.id);
      await refreshCreations();
      Alert.alert(fa.common.success, fa.write.saved);
    } catch {
      Alert.alert(fa.common.error, fa.errors.storage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {!embedded && (
        <Header title={fa.write.title} onBack={() => navigation.goBack()} />
      )}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={8}
      >
        <ScrollView
          contentContainerStyle={{
            padding: spacing.md,
            paddingBottom: spacing.xxl,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {!isRemoteAiConfigured() ? (
            <Text
              style={[
                textStyles.caption,
                {
                  color: theme.textMuted,
                  textAlign: "right",
                  marginBottom: spacing.sm,
                },
              ]}
            >
              {fa.write.noEndpointNotice}
            </Text>
          ) : null}

          <Input
            label="موضوع نوشته"
            value={topic}
            onChangeText={setTopic}
            placeholder="مثلاً امید، میهن، آزادی..."
          />

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: "right",
                marginTop: spacing.md,
              },
            ]}
          >
            {fa.write.tone}
          </Text>
          <View style={styles.chips}>
            {TONES.map((item) => (
              <Chip
                key={item}
                label={fa.tones[item]}
                selected={tone === item}
                onPress={() => setTone(item)}
              />
            ))}
          </View>

          <Text
            style={[
              textStyles.caption,
              {
                color: theme.textMuted,
                textAlign: "right",
                marginTop: spacing.sm,
              },
            ]}
          >
            {fa.write.length}
          </Text>
          <View style={styles.chips}>
            {LENGTHS.map((item) => (
              <Chip
                key={item}
                label={fa.lengths[item]}
                selected={length === item}
                onPress={() => setLength(item)}
              />
            ))}
          </View>
          <View style={{ height: spacing.md }} />

          <View style={styles.emojiRow}>
            <Text style={[textStyles.body, { color: theme.text }]}>
              استفاده از ایموجی
            </Text>

            <Switch
              value={useEmoji}
              onValueChange={setUseEmoji}
              trackColor={{ true: theme.accent }}
            />
          </View>

          <View style={{ height: spacing.md }} />
          {body.trim().length > 0 && (
            <>
              <View style={{ height: spacing.md }} />

              <Input
                label={fa.write.body}
                value={body}
                onChangeText={setBody}
                placeholder={fa.write.bodyPlaceholder}
                multiline
                multilineHeight={180}
              />
            </>
          )}

          {notice ? (
            <Text
              style={[
                textStyles.caption,
                {
                  color: theme.accent,
                  textAlign: "right",
                  marginTop: spacing.sm,
                },
              ]}
            >
              {notice}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <Button
              label={generating ? fa.write.generating : fa.write.generate}
              onPress={onGenerate}
              loading={generating}
              fullWidth
            />

            <Button
              label={fa.common.copy}
              onPress={async () => {
                if (!body.trim()) return;
                await Clipboard.setStringAsync(body);
                Alert.alert(fa.common.success, fa.arsenal.copied);
              }}
              variant="ghost"
              fullWidth
              style={{ marginTop: spacing.sm }}
            />
            <Button
              label={fa.common.share}
              onPress={async () => {
                if (!body.trim()) return;
                await shareText(body);
              }}
              variant="ghost"
              fullWidth
              style={{ marginTop: spacing.sm }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Dialog
        visible={clearOpen}
        title={fa.common.clear}
        message={fa.write.clearConfirm}
        destructive
        confirmLabel={fa.common.clear}
        onCancel={() => setClearOpen(false)}
        onConfirm={() => {
          setBody("");
          setNotice(null);
          setClearOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    marginTop: spacing.xs,
  },
  actions: {
    marginTop: spacing.lg,
  },
  emojiRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
});
