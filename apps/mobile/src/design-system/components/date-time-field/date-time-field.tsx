import { format } from 'date-fns';

import { TextField } from '../text-field';
import { Box } from '../box';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Pressable } from '../pressable';
import React, { forwardRef, memo } from 'react';

export type DateTimeFieldProps = {
  min?: Date;
  max?: Date;
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
  onChange?: (date: Date) => void;
  value: Date;
  error?: string | undefined;
  placeholder?: string;
};

export const DateTimeField = memo(
  forwardRef<unknown, DateTimeFieldProps>(function FormDateTimeField(props) {
    const { value, error, onChange, ...inputProps } = props;

    const [isDatePickerVisible, setDatePickerVisibility] =
      React.useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
      onChange(date);
      hideDatePicker();
    };

    return (
      <Box>
        <Pressable onPress={showDatePicker}>
          <TextField
            editable={false}
            {...inputProps}
            error={error}
            value={
              !value
                ? undefined
                : format(
                    value,
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
                  )
            }
          />
        </Pressable>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={props.mode || 'date'}
          date={value ?? new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={props.max}
          minimumDate={props.min}
        />
      </Box>
    );
  }),
);
