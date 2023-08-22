import { Control, RegisterOptions, useController } from 'react-hook-form';

import React, { useMemo } from 'react';
import { Select, SelectProps } from '@/design-system/components/select/select';
import { useAdminListOfUsers } from '../hooks';
import { RefreshControl } from 'react-native-gesture-handler';
import { Box } from '@/design-system';
import { ActivityIndicator } from 'react-native';

type SelectUserFieldProps = {
  name: string;
  control?: Control<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  value?: string;
} & Omit<SelectProps, 'value' | 'options'>;

export function SelectUserField(props: SelectUserFieldProps) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  const {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAdminListOfUsers();

  const options = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages
      .flatMap((item) => item.data.data.users)
      .map((user) => ({
        label: user.email,
        value: user.id,
      }));
  }, [data?.pages]);

  return (
    <Select
      modalTitle="Select a user"
      multiple={false}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value={[field.value]}
      error={fieldState.error?.message}
      onSelect={([value]) => field.onChange(value)}
      options={options}
      flatListProps={{
        refreshControl: (
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        ),
        onEndReached: () => hasNextPage && fetchNextPage(),
        onEndReachedThreshold: 0.3,
        ListFooterComponent: isFetchingNextPage ? (
          <Box sx={{ m: 'lg' }}>
            <ActivityIndicator />
          </Box>
        ) : null,
      }}
      {...inputProps}
    />
  );
}
