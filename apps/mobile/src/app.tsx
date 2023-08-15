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
import { Authenticator } from '@aws-amplify/ui-react-native';

Amplify.configure(awsExports);

// SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  if (!areFontsLoaded) return null;

  return (
    <AuthProvider>
      <Authenticator
        loginMechanisms={['email']}
        signUpAttributes={['picture']}
        components={{
          SignIn: (props) => <Authenticator.SignIn {...props} />,
        }}
      >
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>
              <RootNavigator />
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </Authenticator>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
