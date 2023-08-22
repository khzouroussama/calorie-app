import { Icons, Pressable } from '@/design-system';
import { typography } from '@/design-system/theme';
import {
  AdminAddFoodEntryScreen,
  AdminEditFoodEntryScreen,
  AdminFoodEntriesScreen,
} from '@/features/food-entries';
import { FoodEntryFormData } from '@/features/food-entries/food-entry-form.component';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

export type AdminFoodEntriesParamList = {
  AdminFoodEntriesList: undefined;
  AdminAddFoodEntry: undefined;
  AdminEditFoodEntry: FoodEntryFormData;
};

const Stack = createNativeStackNavigator<AdminFoodEntriesParamList>();

const GoBackButton = () => {
  const { goBack } = useNavigation();
  return (
    <Pressable onPress={goBack}>
      <Icons.ArrowLeft strokeWidth={2} />
    </Pressable>
  );
};

export const AdminFoodEntriesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: typography.primary.medium,
        },
      }}
    >
      <Stack.Screen
        name="AdminFoodEntriesList"
        component={AdminFoodEntriesScreen}
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
          name="AdminAddFoodEntry"
          component={AdminAddFoodEntryScreen}
          options={{
            title: 'Add new Food entry',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AdminEditFoodEntry"
          component={AdminEditFoodEntryScreen}
          options={{
            title: 'Edit Food entry',
            presentation: 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
