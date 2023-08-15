import { colors, typography } from '@/design-system/theme';
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

type Sizes = keyof typeof sizeStyles;
type Weights = keyof typeof typography.primary;
type Variants = keyof typeof presets;

export interface TypographyProps extends TextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  variant?: Variants;
  weight?: Weights;
  size?: Sizes;
  children?: React.ReactNode;
}

export function Typography(props: TypographyProps) {
  const { weight, size, text, children, style: styleOverride, ...rest } = props;

  const content = text || children;

  const preset: Variants = presets[props.variant] ? props.variant : 'default';
  const textStyles: StyleProp<TextStyle> = [
    presets[preset],
    fontWeightStyles[weight],
    sizeStyles[size],
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
    light: {}, // Provide default values for each weight
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

const presets = {
  default: baseStyle,

  bold: [baseStyle, fontWeightStyles.bold],

  heading: [baseStyle, sizeStyles.xxl, fontWeightStyles.bold],

  subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium],

  formLabel: [baseStyle, fontWeightStyles.medium],

  formHelper: [baseStyle, sizeStyles.sm, fontWeightStyles.normal],
};
