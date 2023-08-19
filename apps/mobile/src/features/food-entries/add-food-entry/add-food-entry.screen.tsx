import { Box, Button, Form, Icons, Screen, Typography } from '@/design-system';
import { colors, spacing } from '@/design-system/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';
import { useAddFoodEntry } from './use-add-food-entry';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

export type AddFoodEntryFormData = {
  name: string;
  calories: number;
  consumptionDate: Date;
};

const schema = yup.object({
  name: yup.string().required(),
  calories: yup.number().positive().integer().required(),
  consumptionDate: yup.date().required(),
});

export const AddFoodEntryScreen = () => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const { control, handleSubmit } = useForm<AddFoodEntryFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      consumptionDate: new Date(),
    },
  });

  const { mutate: addFoodEntry, isLoading } = useAddFoodEntry();

  const onSubmit = (data: AddFoodEntryFormData) => {
    console.log({ data });
    addFoodEntry(data, {
      onSuccess: () => {
        showMessage({
          message: 'Food entry added successfully!',
          type: 'success',
        });
      },
      onError: ({ message }) => {
        setTimeout(() => {
          showMessage({
            message: 'Something went wrong!: ' + message,
            type: 'danger',
          });
        }, 500);
        navigation.goBack();
      },
    });
  };

  return (
    <Screen style={{ paddingBottom: bottom }}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
      >
        <Box sx={{ my: 'xl', alignItems: 'center', gap: 'sm' }}>
          <Box
            sx={{
              bgColor: 'secondary500',
              width: 92,
              height: 92,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}
          >
            <Icons.Salad size={52} color={colors.neutral100} />
          </Box>

          <Typography variant="subheading" size="sm" color="secondary500">
            Add Image
          </Typography>
        </Box>

        <Box>
          <Form.TextField
            name="name"
            control={control}
            label="Name"
            placeholder="Candy"
          />
        </Box>

        <Box sx={{ mt: 'md' }}>
          <Form.TextField
            name="calories"
            control={control}
            label="Calories"
            placeholder="501"
            keyboardType="numeric"
          />
        </Box>

        <Box sx={{ mt: 'md' }}>
          <Form.DateTimeField
            name="consumptionDate"
            control={control}
            label="Date/time of consumption"
            mode="datetime"
          />
        </Box>

        <Box sx={{ flex: 1 }} />
      </ScrollView>
      <Box sx={{ px: 'md' }}>
        <Button
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          icon={Icons.DeviceFloppy}
        >
          Save
        </Button>
      </Box>
    </Screen>
  );
};
