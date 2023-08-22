import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from '@/navigators';
import { customFontsToLoad } from './design-system/theme';
import { useFonts } from 'expo-font';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { Amplify } from 'aws-amplify';
//
import awsExports from './aws-exports';
import { AuthProvider } from '@/shared/contexts';
import { OnboardingScreen } from './features/onboarding';
import { useIsFirstAppStart } from './shared/hooks';
import { APIProvider } from './shared/service/api';

Amplify.configure(awsExports);

// SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [areFontsLoaded] = useFonts(customFontsToLoad);
  const [isFirstTime] = useIsFirstAppStart();

  if (!areFontsLoaded) return null;

  if (isFirstTime) return <OnboardingScreen />;

  return (
    <AuthProvider>
      <APIProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <BottomSheetModalProvider>
            <GestureHandlerRootView style={styles.container}>
              <BottomSheetModalProvider>
                <RootNavigator />
                <FlashMessage position="top" />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </APIProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
