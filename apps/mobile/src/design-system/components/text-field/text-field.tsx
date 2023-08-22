import React, {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Typography, TypographyProps } from '../typography';

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  status?: 'error' | 'disabled';
  label?: TypographyProps['text'];
  LabelTextProps?: TypographyProps;
  helper?: TypographyProps['text'];
  HelperTextProps?: TypographyProps;
  placeholder?: TypographyProps['text'];
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  RightAccessory?: ComponentType<TextFieldAccessoryProps>;
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
  error?: string;
}

export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    error,
    style: inputStyleOverride,
    containerStyle: containerStyleOverride,
    inputWrapperStyle: inputWrapperStyleOverride,
    ...restTextInputProps
  } = props;
  const input = useRef<TextInput>(null);

  const disabled =
    restTextInputProps.editable === false || status === 'disabled';

  function focusInput() {
    if (disabled) return;
    input.current?.focus();
  }

  useImperativeHandle(ref, () => input.current);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!label && (
        <Typography
          variant="formLabel"
          text={label}
          {...LabelTextProps}
          style={styles.label}
        />
      )}

      <View style={[styles.inputWrapper, error && styles.errorInputWrapper]}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={styles.accessory}
            status={status}
            editable={!disabled}
            multiline={restTextInputProps.multiline}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={colors.textDim}
          {...restTextInputProps}
          editable={!disabled}
          style={styles.input}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={styles.accessory}
            status={status}
            editable={!disabled}
            multiline={restTextInputProps.multiline}
          />
        )}
      </View>

      {(!!helper || !!error) && (
        <Typography
          variant="formHelper"
          size="xs"
          text={helper || error}
          {...HelperTextProps}
          style={[styles.helperText, error && { color: colors.angry500 }]}
        />
      )}
    </TouchableOpacity>
  );
});

const styles: {
  container: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
  inputWrapper: StyleProp<ViewStyle>;
  accessory: StyleProp<ViewStyle>;
  input: StyleProp<TextStyle>;
  helperText: StyleProp<TextStyle>;
  errorInputWrapper: StyleProp<ViewStyle>;
} = {
  container: {},
  label: {
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.neutral200,
    borderColor: colors.neutral400,
    overflow: 'hidden',
  },
  errorInputWrapper: {
    backgroundColor: colors.angry100,
    borderColor: colors.angry500,
  },
  accessory: {
    marginHorizontal: spacing.xs,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    fontFamily: typography.primary.normal,
    color: colors.text,
    fontSize: 16,
    height: 24,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
  },
  helperText: {
    marginTop: spacing.xs,
  },
};
