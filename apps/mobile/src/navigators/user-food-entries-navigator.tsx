import { Icons, Pressable } from '@/design-system';
import { typography } from '@/design-system/theme';
import {
  AddFoodEntryScreen,
  EditFoodEntryScreen,
  FoodEntriesScreen,
} from '@/features/food-entries';
import { FoodEntryFormData } from '@/features/food-entries/food-entry-form.componenet';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

export type UserFoodEntriesParamList = {
  UserFoodEntriesList: undefined;
  UserAddFoodEntry: undefined;
  UserEditFoodEntry: FoodEntryFormData;
};

const Stack = createNativeStackNavigator<UserFoodEntriesParamList>();

const GoBackButton = () => {
  const { goBack } = useNavigation();
  return (
    <Pressable onPress={goBack}>
      <Icons.ArrowLeft strokeWidth={2} />
    </Pressable>
  );
};

export const UsersFoodEntriesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: typography.primary.medium,
        },
      }}
    >
      <Stack.Screen
        name="UserFoodEntriesList"
        component={FoodEntriesScreen}
        options={{
          headerShown: false,
          title: 'My Food Entries',
        }}
      />

      <Stack.Group
        screenOptions={{
          headerLeft: () => <GoBackButton />,
        }}
      >
        <Stack.Screen
          name="UserAddFoodEntry"
          component={AddFoodEntryScreen}
          options={{
            title: 'Add new Food entry',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="UserEditFoodEntry"
          component={EditFoodEntryScreen}
          options={{
            title: 'Edit Food entry',
            presentation: 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
