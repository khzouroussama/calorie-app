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
import { SelectUserField } from '@/shared/componenets';

export type FoodEntryFormData = {
  id?: string;
  name: string;
  calories: number;
  consumptionDate: Date;
  userId?: string;

  photo?: {
    base64?: string;
    uri: string;
    name: string;
    type: string;
  };
};

const schema = yup.object({
  name: yup.string().required(),
  calories: yup.number().positive().integer().required(),
  consumptionDate: yup.date().required(),
});

type FoodEntryFormProps = {
  isAdmin?: boolean;
  update?: boolean;
  mutate: UseMutateFunction<FoodEntry, AxiosError, FoodEntryFormData>;
  isLoading: boolean;
  defaultValues?: FoodEntryFormData;
};

export const FoodEntryForm = ({
  isAdmin = false,
  update,
  mutate,
  isLoading,
  defaultValues,
}: FoodEntryFormProps) => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FoodEntryFormData>({
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

        if (isAdmin) {
          queryClient.invalidateQueries({
            queryKey: ['admin/food-entries'],
          });

          queryClient.invalidateQueries({
            queryKey: ['admin/user-reports'],
          });

          queryClient.invalidateQueries({
            queryKey: ['admin/global-reports'],
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: ['food-entries'],
          });
          queryClient.invalidateQueries({
            queryKey: ['daily-calories'],
          });

          queryClient.invalidateQueries({
            queryKey: ['me'],
          });
        }

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
          <Form.PictureField
            name="photo"
            control={control}
            defaultIcon={Icons.Salad}
          />

          <Typography variant="subheading" size="sm" color="secondary500">
            Add Image
          </Typography>
        </Box>

        {isAdmin && !update && (
          <Box>
            <SelectUserField
              name="userId"
              control={control}
              label="On behalf of user"
              placeholder="Select a user"
            />
          </Box>
        )}

        <Box sx={{ mt: 'md' }}>
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
          disabled={isLoading || !isDirty}
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
