import { Control, RegisterOptions, useController } from 'react-hook-form';

import React from 'react';
import { DateTimeField, DateTimeFieldProps } from '../date-time-field';

type FormDateTimeFieldProps = {
  name: string;
  control?: Control<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  min?: Date;
  max?: Date;
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
  onChange?: (date: Date) => void;
} & DateTimeFieldProps;

export function FormDateTimeField(props: FormDateTimeFieldProps) {
  const { name, control, rules, onChange, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  return (
    <DateTimeField
      value={field.value}
      error={fieldState.error?.message}
      min={props.min}
      max={props.max}
      mode={props.mode}
      onChange={field.onChange}
    />
  );
}
