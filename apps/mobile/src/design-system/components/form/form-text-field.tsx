import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { TextField, TextFieldProps } from '../text-field';

type FormTextFieldProps = {
  name: string;
  control: Control<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
} & TextFieldProps;

export function FormTextField(props: FormTextFieldProps) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  return (
    <TextField
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={String(field.value || '')}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
