import { Box, Button, Form, Icons, Typography } from '@/design-system';
import { colors, spacing } from '@/design-system/theme';
import { ScrollView } from 'react-native-gesture-handler';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { queryClient } from '@/shared/service/api';
import { UseMutateFunction } from '@tanstack/react-query';
import { FoodEntry } from './food-entries.types';
import { AxiosError } from 'axios';

export type FoodEntryFormData = {
  name: string;
  calories: number;
  consumptionDate: Date;
};

const schema = yup.object({
  name: yup.string().required(),
  calories: yup.number().positive().integer().required(),
  consumptionDate: yup.date().required(),
});

type FoodEntryFormProps = {
  mutate: UseMutateFunction<FoodEntry, AxiosError, FoodEntryFormData>;
  isLoading: boolean;
  update?: boolean;
  defaultValues?: FoodEntryFormData;
};

export const FoodEntryForm = ({
  mutate,
  isLoading,
  update,
  defaultValues,
}: FoodEntryFormProps) => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<FoodEntryFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(update
        ? defaultValues
        : {
            name: '',
            calories: null,
            consumptionDate: new Date(),
          }),
    },
  });

  const onSubmit = (data: FoodEntryFormData) => {
    mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          showMessage({
            message: `Food entry ${update ? 'updated' : 'added'} successfully!`,
            type: 'success',
          });
        }, 500);

        queryClient.invalidateQueries({
          queryKey: ['food-entries'],
        });

        navigation.goBack();
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
    <>
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
    </>
  );
};
