import { Screen } from '@/design-system';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEditFoodEntry } from './use-edit-food-entry';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@/navigators/navigation-types';
import { FoodEntryForm } from '../food-entry-form.component';

export const EditFoodEntryScreen = () => {
  const { mutate: editFoodEntry, isLoading } = useEditFoodEntry();
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<'UserEditFoodEntry'>>();

  return (
    <Screen style={{ paddingBottom: bottom }}>
      <FoodEntryForm
        update
        mutate={editFoodEntry}
        isLoading={isLoading}
        defaultValues={{
          ...params,
          consumptionDate: new Date(params.consumptionDate),
        }}
      />
    </Screen>
  );
};
