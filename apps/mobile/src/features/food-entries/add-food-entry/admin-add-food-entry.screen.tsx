import { Screen } from '@/design-system';

import { useAddFoodEntry } from './use-add-food-entry';
import { FoodEntryForm } from '../food-entry-form.component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AdminAddFoodEntryScreen = () => {
  const { mutate: addFoodEntry, isLoading } = useAddFoodEntry();
  const { bottom } = useSafeAreaInsets();

  return (
    <Screen style={{ paddingBottom: bottom }}>
      <FoodEntryForm isAdmin mutate={addFoodEntry} isLoading={isLoading} />
    </Screen>
  );
};
