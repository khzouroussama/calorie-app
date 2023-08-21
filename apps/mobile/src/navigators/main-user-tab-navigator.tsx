import { FoodEntriesScreen } from '@/features/food-entries';
import { SettingsScreen } from '@/features/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabBarIcon, tabBarLabel } from './navigation.helpers';
import { UsersFoodEntriesNavigator } from './user-food-entries-navigator';
import { typography } from '@/design-system/theme';
import { DailyCaloriesScreen } from '@/features/reporting/daily-calories-list/daily-calories.screen';

type TabParamList = {
  Home: undefined;
  Calories: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainUserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 90 },
        headerTitleStyle: {
          fontFamily: typography.primary.medium,
        },
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: true,
        }}
      >
        <Tab.Screen
          key="Home"
          name="Home"
          component={UsersFoodEntriesNavigator}
          options={{
            title: 'My Food Entries',
            tabBarIcon: tabBarIcon('Salad'),
            tabBarLabel: tabBarLabel('My Entries'),
          }}
        />

        <Tab.Screen
          key="Calories"
          name="Calories"
          component={DailyCaloriesScreen}
          options={{
            title: 'My Calories',
            tabBarIcon: tabBarIcon('Bolt'),
            tabBarLabel: tabBarLabel('My Calories'),
          }}
        />

        <Tab.Screen
          key="Settings"
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: tabBarIcon('Settings'),
            tabBarLabel: tabBarLabel('Settings'),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
