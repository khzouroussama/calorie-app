import { Screen } from '@/design-system';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@/navigators/navigation-types';
import { FoodEntryForm } from '../food-entry-form.component';
import { useAdminEditFoodEntry } from './use-admin-edit-food-entry';

export const AdminEditFoodEntryScreen = () => {
  const { mutate: editFoodEntry, isLoading } = useAdminEditFoodEntry();
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<'UserEditFoodEntry'>>();

  return (
    <Screen style={{ paddingBottom: bottom }}>
      <FoodEntryForm
        isAdmin
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
