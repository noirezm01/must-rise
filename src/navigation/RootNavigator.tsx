import React from "react";
import { I18nManager, Platform } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useApp, useAppTheme } from "../context/AppContext";
import { fa } from "../i18n/fa";
import { LoadingIndicator } from "../components/ui";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { ArsenalScreen } from "../screens/ArsenalScreen";
import { ArsenalDetailScreen } from "../screens/ArsenalDetailScreen";
import { CreationsScreen } from "../screens/CreationsScreen";
import { WriteScreen } from "../screens/WriteScreen";
import { TemplatePickerScreen } from "../screens/TemplatePickerScreen";
import { PosterEditorScreen } from "../screens/PosterEditorScreen";
import type {
  ArsenalStackParamList,
  CreationsStackParamList,
  HomeStackParamList,
  RootTabParamList,
} from "./types";

if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ArsenalStack = createNativeStackNavigator<ArsenalStackParamList>();
const CreationsStack = createNativeStackNavigator<CreationsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function sharedStackScreenOptions(background: string, text: string) {
  return {
    headerShown: false,
    contentStyle: { backgroundColor: background },
    animation:
      Platform.OS === "android"
        ? ("fade_from_bottom" as const)
        : ("default" as const),
  };
}

function HomeStackNavigator() {
  const theme = useAppTheme();
  return (
    <HomeStack.Navigator
      screenOptions={sharedStackScreenOptions(theme.background, theme.text)}
    >
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />

      <HomeStack.Screen
        name="TemplatePicker"
        component={TemplatePickerScreen}
      />
    </HomeStack.Navigator>
  );
}

function ArsenalStackNavigator() {
  const theme = useAppTheme();
  return (
    <ArsenalStack.Navigator
      screenOptions={sharedStackScreenOptions(theme.background, theme.text)}
    >
      <ArsenalStack.Screen name="ArsenalMain" component={ArsenalScreen} />
      <ArsenalStack.Screen
        name="ArsenalDetail"
        component={ArsenalDetailScreen}
      />

      <ArsenalStack.Screen
        name="TemplatePicker"
        component={TemplatePickerScreen}
      />
    </ArsenalStack.Navigator>
  );
}

function CreationsStackNavigator() {
  const theme = useAppTheme();
  return (
    <CreationsStack.Navigator
      screenOptions={sharedStackScreenOptions(theme.background, theme.text)}
    >
      <CreationsStack.Screen name="CreationsMain" component={CreationsScreen} />

      <CreationsStack.Screen
        name="TemplatePicker"
        component={TemplatePickerScreen}
      />
    </CreationsStack.Navigator>
  );
}

export function RootNavigator() {
  const { ready } = useApp();
  const theme = useAppTheme();

  if (!ready) {
    return <LoadingIndicator fullscreen />;
  }

  const navTheme = {
    ...(theme.mode === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.mode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      primary: theme.accent,
      notification: theme.accent,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.textMuted,
          tabBarStyle: {
            backgroundColor: theme.tabBar,
            borderTopColor: theme.border,
            height: 64,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => {
            const map: Record<string, keyof typeof Ionicons.glyphMap> = {
              HomeTab: "home-outline",
              ArsenalTab: "library-outline",
              CreationsTab: "document-text-outline",
            };
            return (
              <Ionicons
                name={map[route.name] ?? "ellipse-outline"}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ title: fa.tabs.home }}
        />
        <Tab.Screen
          name="ArsenalTab"
          component={ArsenalStackNavigator}
          options={{ title: fa.tabs.arsenal }}
        />
        <Tab.Screen
          name="CreationsTab"
          component={CreationsStackNavigator}
          options={{ title: fa.tabs.creations }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
