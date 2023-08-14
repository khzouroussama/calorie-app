import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingScreen } from '@/features/onboarding';
import { NavigationContainer } from '@react-navigation/native';

import { useIsFirstAppStart } from '@/shared/hooks';
import { AuthNavigator } from './auth-navigator';
import { MainTabNavigator } from './main-tab-navigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const status = 'idle';
  const [isFirstTime] = useIsFirstAppStart();

  useEffect(() => {
    if (status !== 'idle') {
      (async () => await SplashScreen.hideAsync())();
    }
  }, [status]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'none',
          }}
        >
          {isFirstTime ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <Stack.Group>
              {status === 'signOut' ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
              ) : (
                <Stack.Screen name="Main" component={MainTabNavigator} />
              )}
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
