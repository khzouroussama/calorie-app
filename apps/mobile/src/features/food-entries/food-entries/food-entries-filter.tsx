import { Box, Button, Form, Icons } from '@/design-system';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStore, useStoreActions } from '@/shared/store';
import { useEffect } from 'react';

export type AddFoodEntryFormData = {
  dateFrom: Date;
  dateTo: Date;
};

const schema = yup.object({
  dateFrom: yup.date().required(),
  dateTo: yup.date().required(),
});

export const FoodEntriesFilter = () => {
  const { onUserFoodEntryFilterChange } = useStoreActions();

  const { control, reset, watch, handleSubmit } = useForm<AddFoodEntryFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        dateFrom: new Date(),
        dateTo: new Date(),
      },
      mode: 'onChange',
    },
  );

  useEffect(() => {
    onUserFoodEntryFilterChange('dateFrom', watch('dateFrom'));
  }, [onUserFoodEntryFilterChange, watch]);

  useEffect(() => {
    onUserFoodEntryFilterChange('dateTo', watch('dateTo'));
  }, [onUserFoodEntryFilterChange, watch]);

  return (
    <Box sx={{ row: true, gap: 'sm' }}>
      <Box sx={{ flex: 1 }}>
        <Form.DateTimeField
          name="dateFrom"
          label={null}
          control={control}
          mode="datetime"
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Form.DateTimeField
          name="dateTo"
          label={null}
          control={control}
          mode="datetime"
        />
      </Box>
      <Box>
        <Button variant="white" icon={Icons.Ban}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};
