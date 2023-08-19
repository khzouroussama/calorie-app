import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { useAddAuthHeader } from '@/shared/service/api';
import { colors } from '@/design-system/theme';
import { MainUserTabNavigator } from './main-user-tab-navigator';
import { MainAdminTabNavigator } from './main-admin-tab-navigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isAdmin, authStatus } = useAddAuthHeader();

  useEffect(() => {
    if (authStatus !== 'configuring') (async () => SplashScreen.hideAsync())();
  }, [authStatus]);

  return (
    <Authenticator
      loginMechanisms={['email']}
      signUpAttributes={['picture']}
      components={{
        SignIn: (props) => <Authenticator.SignIn {...props} />,
      }}
    >
      {authStatus === 'configuring' ? null : (
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'none',
            }}
          >
            {!isAdmin ? (
              <Stack.Screen name="UserMain" component={MainUserTabNavigator} />
            ) : (
              <Stack.Screen
                name="AdminMain"
                component={MainAdminTabNavigator}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Authenticator>
  );
};

const theme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.text,
    border: colors.border,
    primary: colors.primary500,
  },
};
