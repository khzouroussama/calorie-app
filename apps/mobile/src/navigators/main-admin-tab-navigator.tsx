import { FoodEntriesScreen } from '@/features/food-entries';
import { SettingsScreen } from '@/features/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabBarIcon, tabBarLabel } from './navigation.helpers';

type TabParamList = {
  FoodEntries: undefined;
  Reports: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainAdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 90 },
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: true,
        }}
      >
        <Tab.Screen
          key="FoodEntries"
          name="FoodEntries"
          component={FoodEntriesScreen}
          options={{
            title: 'All Food Entries',
            tabBarIcon: tabBarIcon('Salad'),
            tabBarLabel: tabBarLabel('All entries'),
          }}
        />

        <Tab.Screen
          key="Reports"
          name="Reports"
          component={FoodEntriesScreen}
          options={{
            title: 'Reports',
            tabBarIcon: tabBarIcon('ListCheck'),
            tabBarLabel: tabBarLabel('Reports'),
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
