import { Color, colors, typography } from '@/design-system/theme';
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

type Sizes = keyof typeof sizeStyles;
type Weights = keyof typeof typography.primary;
type Variants = keyof typeof variants;

export interface TypographyProps extends TextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  variant?: Variants;
  weight?: Weights;
  size?: Sizes;
  color?: Color;
  children?: React.ReactNode;
}

export function Typography(props: TypographyProps) {
  const {
    weight,
    size,
    text,
    color,
    children,
    style: styleOverride,
    ...rest
  } = props;

  const content = text || children;

  const variant: Variants = variants[props.variant] ? props.variant : 'default';
  const textStyles: StyleProp<TextStyle> = [
    variants[variant],
    fontWeightStyles[weight],
    sizeStyles[size],
    { color: colors[color] },
    styleOverride,
  ];

  return (
    <Text {...rest} style={textStyles}>
      {content}
    </Text>
  );
}

const sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 },
  xl: { fontSize: 24, lineHeight: 34 },
  lg: { fontSize: 20, lineHeight: 32 },
  md: { fontSize: 18, lineHeight: 26 },
  sm: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 14, lineHeight: 21 },
  xxs: { fontSize: 12, lineHeight: 18 },
};

const fontWeightStyles: Record<Weights, TextStyle> = Object.entries(
  typography.primary,
).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {
    light: {},
    normal: {},
    medium: {},
    semiBold: {},
    bold: {},
  },
);

const baseStyle: StyleProp<TextStyle> = [
  sizeStyles.sm,
  fontWeightStyles.normal,
  { color: colors.text },
];

const variants = {
  default: baseStyle,
  bold: [baseStyle, fontWeightStyles.bold],
  heading: [baseStyle, sizeStyles.xxl, fontWeightStyles.bold],
  subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium],
  formLabel: [baseStyle, fontWeightStyles.medium],
  formHelper: [baseStyle, sizeStyles.sm, fontWeightStyles.normal],
};
