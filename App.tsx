import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

import { RootStackParamList } from "./types/navigation";
import CampaignsListScreen from "./screens/CampaignsListScreen";
import CampaignDetailScreen from "./screens/CampaignDetailScreen";
import SubmitVideoScreen from "./screens/SubmitVideoScreen";
import SubmissionStatusScreen from "./screens/SubmissionStatusScreen";
import SubmissionsHistoryScreen from "./screens/SubmissionsHistoryScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsReady(true);
      await SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashLogo}>8X</Text>
        <Text style={styles.splashSub}>CREATOR</Text>
        <Text style={styles.splashHint}>Loading opportunities...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CampaignsList"
        screenOptions={{
          headerStyle: { backgroundColor: '#0F0F0F' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="CampaignsList"
          component={CampaignsListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CampaignDetail"
          component={CampaignDetailScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="SubmitVideo"
          component={SubmitVideoScreen}
          options={{ title: 'Submit Video' }}
        />
        <Stack.Screen
          name="SubmissionStatus"
          component={SubmissionStatusScreen}
          options={{ title: 'Submissions' }}
        />
        <Stack.Screen
          name="SubmissionsHistory"
          component={SubmissionsHistoryScreen}
          options={{ title: 'My Submissions' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
  },
  splashSub: {
    color: '#4ADE80',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 6,
    marginTop: 8,
  },
  splashHint: {
    color: '#333333',
    fontSize: 12,
    marginTop: 48,
  },
});
