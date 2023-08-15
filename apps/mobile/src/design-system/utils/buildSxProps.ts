import { ViewProps, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';
import type { Spacing } from '../theme';

type Color = keyof typeof colors;

// SX supported props
type SxInheritedProps =
  | 'flex'
  | 'height'
  | 'width'
  | 'alignItems'
  | 'justifyContent'
  | 'flexDirection'
  | 'flexWrap'
  | 'alignContent'
  | 'borderRadius'
  | 'position'
  | 'zIndex'
  | 'opacity'
  | 'overflow'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'gap'
  | 'rowGap'
  | 'columnGap';

export type SxProps = {
  row?: boolean;
  p?: Spacing;
  m?: Spacing;
  px?: Spacing;
  py?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  bgColor?: Color;
  border?: number;
  borderColor?: Color;
  translateX?: number;
  translateY?: number;
} & Pick<ViewStyle, SxInheritedProps>;

export const resolveThemeValue = (
  themeValue: Record<string, string>,
  key?: string,
): string => (key ? themeValue[key] : '');

export const buildBoxStyles = (props: SxProps = {}): ViewProps['style'] => {
  const styles: ViewProps['style'] = {};
  props.row && (styles.flexDirection = 'row');
  props.flex && (styles.flex = props.flex);
  props.height && (styles.height = props.height);
  props.width && (styles.width = props.width);
  props.p && (styles.padding = spacing[props.p]);
  props.m && (styles.margin = spacing[props.m]);
  props.px && (styles.paddingHorizontal = spacing[props.px]);
  props.mx && (styles.marginHorizontal = spacing[props.mx]);
  props.py && (styles.paddingVertical = spacing[props.py]);
  props.my && (styles.marginVertical = spacing[props.my]);
  props.pt && (styles.paddingTop = spacing[props.pt]);
  props.pb && (styles.paddingBottom = spacing[props.pb]);
  props.pl && (styles.paddingLeft = spacing[props.pl]);
  props.pr && (styles.paddingRight = spacing[props.pr]);
  props.mt && (styles.marginTop = spacing[props.mt]);
  props.mb && (styles.marginBottom = spacing[props.mb]);
  props.ml && (styles.marginLeft = spacing[props.ml]);
  props.mr && (styles.marginRight = spacing[props.mr]);
  props.alignItems && (styles.alignItems = props.alignItems);
  props.justifyContent && (styles.justifyContent = props.justifyContent);
  props.borderRadius && (styles.borderRadius = props.borderRadius);
  props.bgColor &&
    (styles.backgroundColor = resolveThemeValue(colors, props.bgColor));
  props.position && (styles.position = props.position);
  props.zIndex && (styles.zIndex = props.zIndex);
  props.opacity && (styles.opacity = props.opacity);
  props.overflow && (styles.overflow = props.overflow);
  props.border && (styles.borderWidth = props.border);
  props.borderColor &&
    (styles.borderColor = resolveThemeValue(colors, props.borderColor));
  props.top !== undefined && (styles.top = props.top);
  props.left !== undefined && (styles.left = props.left);
  props.right !== undefined && (styles.right = props.right);
  props.bottom !== undefined && (styles.bottom = props.bottom);
  props.translateX !== undefined &&
    (styles.transform = [
      ...(styles?.transform || []),
      { translateX: props.translateX },
    ]);
  props.translateY !== undefined &&
    (styles.transform = [
      ...(styles?.transform || []),
      { translateY: props.translateY },
    ]);
  props.gap && (styles.gap = spacing[props.gap]);
  props.rowGap && (styles.rowGap = spacing[props.rowGap]);
  props.columnGap && (styles.columnGap = spacing[props.columnGap]);
  return styles;
};
