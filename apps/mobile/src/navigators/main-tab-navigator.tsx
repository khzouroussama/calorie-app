import { FoodEntriesScreen } from '@/features/food-entries';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({})}>
      <Tab.Group
        screenOptions={{
          headerShown: true,
        }}
      >
        <Tab.Screen
          key="Home"
          name="Home"
          component={FoodEntriesScreen}
          options={{
            title: 'Home',
          }}
        />

        <Tab.Screen
          key="Stats"
          name="Stats"
          component={FoodEntriesScreen}
          options={{
            title: 'Stats',
          }}
        />

        <Tab.Screen
          key="Settings"
          name="Settings"
          component={FoodEntriesScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
