import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { MainTabNavigator } from './main-tab-navigator';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import axios from 'axios';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      const token = user.getSignInUserSession().getAccessToken();
      axios.defaults.headers.common['Authorization'] = token.getJwtToken();
    }
  }, []);

  useEffect(() => {
    (async () => await SplashScreen.hideAsync())();
  }, []);

  return (
    <Authenticator
      loginMechanisms={['email']}
      signUpAttributes={['picture']}
      components={{
        SignIn: (props) => <Authenticator.SignIn {...props} />,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'none',
          }}
        >
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Authenticator>
  );
};
