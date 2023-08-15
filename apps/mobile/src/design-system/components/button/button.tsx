import React, { ForwardedRef, useMemo } from 'react';
import { Pressable, Box, PressableProps, Typography } from '@/design-system';
import { ActivityIndicator, ViewStyle } from 'react-native';

import { colors, spacing } from '../../theme';

type ButtonProps = {
  title?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'textOnly'
    | 'white';
  size?: 'xsmall' | 'small' | 'normal';
  icon?: React.ElementType;
  iconPlacement?: 'left' | 'right';
  iconSize?: number;
  loading?: boolean;
  animatedText?: boolean;
  textProps?: any;
  isDropdown?: boolean;
} & PressableProps;

function Button(
  {
    variant = 'primary',
    size = 'small',
    title,
    icon: Icon,
    iconPlacement = 'left',
    iconSize = spacing.md,
    loading = false,
    animatedText = false,
    textProps = {},
    ...props
  }: ButtonProps,
  ref: ForwardedRef<typeof Pressable>,
) {
  const { backgroundColor, color, borderColor, pressedBackgroundColor } =
    useMemo(
      () => getButtonStyles(variant, props.disabled),
      [props.disabled, variant],
    );

  console.log({ backgroundColor });

  return (
    <Pressable
      ref={ref}
      style={[
        styles.root,
        styles[size],
        iconPlacement === 'right' && styles.iconRight,
        { borderColor: colors[borderColor] },
      ]}
      pressedBgColor={pressedBackgroundColor}
      {...props}
      sx={{
        ...props.sx,
        bgColor: backgroundColor,
      }}
    >
      {loading && <ActivityIndicator size={10} />}
      {Icon && !loading && <Icon color={color} size={iconSize} />}
      {(Icon || loading) && <Box sx={{ width: spacing.sm }} />}
      {(!!title || !!props.children) && (
        <Typography
          animated={animatedText}
          variant="bold"
          size="sm"
          style={{ color: colors[color] }}
          {...textProps}
        >
          {title || props.children}
        </Typography>
      )}
    </Pressable>
  );
}

const styles: {
  root: ViewStyle;
  iconRight: ViewStyle;
  xsmall: ViewStyle;
  small: ViewStyle;
  normal: ViewStyle;
} = {
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  iconRight: {
    flexDirection: 'row-reverse',
  },
  xsmall: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
  },
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  normal: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
};

const getButtonStyles = (
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'textOnly'
    | 'white',
  disabled: boolean,
) => {
  if (disabled) {
    return {
      backgroundColor: 'neutral300',
      color: 'neutral400',
      borderColor: 'neutral200',
      pressedBackgroundColor: 'neutral300',
    } as const;
  }

  const styles = {
    primary: {
      backgroundColor: 'primary500',
      color: 'neutral100',
      borderColor: 'primary500',
      pressedBackgroundColor: 'primary400',
    },
    secondary: {
      backgroundColor: 'secondary500',
      color: 'neutral100',
      borderColor: 'secondary500',
      pressedBackgroundColor: 'secondary400',
    },
    tertiary: {
      backgroundColor: 'neutral600',
      color: 'neutral100',
      borderColor: 'neutral600',
      pressedBackgroundColor: 'neutral700',
    },
    danger: {
      backgroundColor: 'angry100',
      color: 'neutral100',
      borderColor: 'angry100',
      pressedBackgroundColor: 'angry500',
    },
    textOnly: {
      backgroundColor: 'transparent',
      color: 'neutral600',
      borderColor: 'transparent',
      pressedBackgroundColor: 'transparent',
    },
    white: {
      backgroundColor: 'neutral100',
      color: 'neutral800',
      borderColor: 'neutral300',
      pressedBackgroundColor: 'neutral200',
    },
  } as const;

  return styles[variant];
};

export default React.memo(React.forwardRef(Button));
