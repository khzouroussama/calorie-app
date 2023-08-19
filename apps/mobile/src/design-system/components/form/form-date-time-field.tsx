import { Control, RegisterOptions, useController } from 'react-hook-form';
import { format } from 'date-fns';

import { TextField, TextFieldProps } from '../text-field';
import { Box } from '../box';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Pressable } from '../pressable';
import React from 'react';

type FormDateTimeFieldProps = {
  name: string;
  control: Control<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  min?: Date;
  max?: Date;
  mode?: 'date' | 'time' | 'datetime';
} & TextFieldProps;

export function FormDateTimeField(props: FormDateTimeFieldProps) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    field.onChange(date);
    hideDatePicker();
  };
  return (
    <Box>
      <Pressable onPress={showDatePicker}>
        <TextField
          editable={false}
          {...inputProps}
          error={fieldState.error?.message}
          value={format(
            field.value,
            (() => {
              switch (props.mode) {
                case 'date':
                  return 'yyyy-MM-dd';
                case 'time':
                  return 'HH:mm';
                case 'datetime':
                  return 'yyyy-MM-dd HH:mm';
              }
            })(),
          )}
        />
      </Pressable>

      <DateTimePickerModal
        ref={field.ref}
        isVisible={isDatePickerVisible}
        mode={props.mode || 'date'}
        date={field.value}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={props.max}
        minimumDate={props.min}
      />
    </Box>
  );
}
