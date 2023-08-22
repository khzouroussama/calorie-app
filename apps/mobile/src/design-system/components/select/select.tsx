import { spacing } from '@/design-system/theme';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from '../pressable';
import { Button } from '../button';
import {
  Box,
  Icons,
  TextField,
  TextFieldProps,
  Typography,
} from '@/design-system';
import { FullWindowOverlay } from 'react-native-screens';

type Option = {
  label: string;
  value: string;
};

export interface SelectProps
  extends Omit<TextFieldProps, 'ref' | 'onValueChange' | 'onChange' | 'value'> {
  modalTitle?: string;
  value?: string[];
  renderValue?: (value: string[]) => string;
  onSelect?: (newValue: string[]) => void;
  multiple?: boolean;
  options: Option[];
  flatListProps?: Partial<React.ComponentProps<typeof BottomSheetFlatList>>;
}
export interface SelectFieldRef {
  presentOptions: () => void;
  dismissOptions: () => void;
}

function without<T>(array: T[], value: T) {
  return array.filter((v) => v !== value);
}

export const Select = forwardRef(function SelectField(
  props: SelectProps,
  ref: Ref<SelectFieldRef>,
) {
  const {
    value = [],
    onSelect,
    renderValue,
    options = [],
    multiple = true,
    flatListProps,
    ...rest
  } = props;
  const sheet = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const disabled = rest.editable === false || rest.status === 'disabled';

  useImperativeHandle(ref, () => ({ presentOptions, dismissOptions }));

  const valueString =
    renderValue?.(value) ??
    value
      .map((v) => options.find((o) => o.value === v)?.label)
      .filter(Boolean)
      .join(', ');

  function presentOptions() {
    if (disabled) return;

    sheet.current?.present();
  }

  function dismissOptions() {
    sheet.current?.dismiss();
  }

  const updateValue = useCallback(
    function updateValue(optionValue: string) {
      if (value.includes(optionValue)) {
        onSelect?.(multiple ? without(value, optionValue) : []);
      } else {
        if (!multiple) dismissOptions();
        onSelect?.(multiple ? [...value, optionValue] : [optionValue]);
      }
    },
    [multiple, onSelect, value],
  );

  const renderItem = React.useCallback(
    ({ item, index }) => (
      <Pressable
        sx={{
          mx: 'md',
          my: 'xxs',
        }}
        onPress={() => updateValue(item.value)}
      >
        <Box
          sx={{
            row: true,
            gap: 'sm',
            p: 'sm',
            border: 1,
            borderColor: 'neutral300',
            borderRadius: 8,
            bgColor: 'neutral200',
          }}
        >
          <Icons.ChevronRight />
          <Typography variant="bold" size="xs" color="secondary500">
            {item.label}
          </Typography>
        </Box>
      </Pressable>
    ),
    [updateValue],
  );

  return (
    <>
      <Pressable onPress={presentOptions}>
        <Box pointerEvents="none">
          <TextField
            {...rest}
            value={valueString}
            RightAccessory={(props) => <Icons.ChevronRight />}
          />
        </Box>
      </Pressable>

      <BottomSheetModal
        ref={sheet}
        snapPoints={['50%', '80%']}
        stackBehavior="replace"
        enableDismissOnClose
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        containerComponent={ModalContainerComponent}
        backdropComponent={renderBackdropComponent}
        footerComponent={
          !multiple
            ? undefined
            : (props) => (
                <BottomSheetFooter
                  {...props}
                  style={bottomSheetFooterStyles}
                  bottomInset={bottom}
                >
                  <Button variant="secondary" onPress={dismissOptions}>
                    Close
                  </Button>
                </BottomSheetFooter>
              )
        }
      >
        {!!rest.modalTitle && (
          <Typography
            style={{ textAlign: 'center', marginBottom: spacing.md }}
            variant="heading"
            size="md"
          >
            {rest.modalTitle}
          </Typography>
        )}
        <BottomSheetFlatList<Option>
          style={{ marginBottom: bottom + (multiple ? 56 : 0) }}
          data={options}
          keyExtractor={(o) => o.value}
          renderItem={renderItem}
          {...flatListProps}
        />
      </BottomSheetModal>
    </>
  );
});

const renderBackdropComponent = (props) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);

const ModalContainerComponent = (props) => (
  <FullWindowOverlay style={StyleSheet.absoluteFill} {...props} />
);

const bottomSheetFooterStyles: ViewStyle = {
  paddingHorizontal: spacing.lg,
};
