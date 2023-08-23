import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { colors } from '@/design-system/theme';
import { MainUserTabNavigator } from './main-user-tab-navigator';
import { MainAdminTabNavigator } from './main-admin-tab-navigator';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useIsAdmin } from '@/shared/hooks';
import { Box, Icons, Typography } from '@/design-system';
import { useBootstrapApp } from '@/shared/hooks/use-bootstrap-app';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { authStatus, isReady } = useBootstrapApp();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (authStatus !== 'configuring') (async () => SplashScreen.hideAsync())();
  }, [authStatus]);

  return (
    <Authenticator
      loginMechanisms={['email']}
      signUpAttributes={['picture']}
      components={{
        SignIn: (props) => (
          <Authenticator.SignIn
            {...props}
            Header={() => (
              <Box
                sx={{ alignItems: 'center', pb: 'lg' }}
                style={{ marginTop: -80 }}
              >
                <Icons.Bolt
                  size={64}
                  color={colors.primary400}
                  strokeWidth={1.5}
                />
                <Typography variant="heading" color="primary400">
                  Calorie App
                </Typography>
              </Box>
            )}
          />
        ),
      }}
    >
      {!isReady ? null : (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeInDown}
          style={{ flex: 1 }}
        >
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'none',
              }}
            >
              {!isAdmin ? (
                <Stack.Screen
                  name="UserMain"
                  component={MainUserTabNavigator}
                />
              ) : (
                <Stack.Screen
                  name="AdminMain"
                  component={MainAdminTabNavigator}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </Animated.View>
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
