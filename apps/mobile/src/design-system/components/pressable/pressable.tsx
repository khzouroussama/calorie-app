import React, { forwardRef, memo, useMemo } from 'react';
import Animated, {
  AnimateProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ViewProps } from 'react-native';
import { Color, colors } from '@/design-system/theme';
import { buildBoxStyles } from '@/design-system/utils';
import { SxProps, resolveThemeValue } from '@/design-system/utils/buildSxProps';

type TouchableWithoutFeedbackProps = React.ComponentPropsWithoutRef<
  typeof TouchableWithoutFeedback
>;

const ITEM_SCALE_FACTOR = 0.95;

export type PressableProps = {
  containerStyle?: TouchableWithoutFeedbackProps['style'];
  style?: AnimateProps<ViewProps>['style'];
  activeScale?: number;
  /**
   * The color of the background when the pressable is pressed.
   * @requires bgColor must be set otherwise this prop will be ignored
   */
  pressedBgColor?: Color;
  sx?: SxProps;
} & TouchableWithoutFeedbackProps;

/**
 * @example
 * <Pressable activeScale={0.98} />
 */
export const Pressable = memo(
  forwardRef<typeof TouchableWithoutFeedback, PressableProps>(
    (
      {
        style,
        containerStyle,
        children,
        activeScale = ITEM_SCALE_FACTOR,
        pressedBgColor,
        onPressIn,
        onPressOut,
        ...rest
      },
      ref,
    ): JSX.Element => {
      const scale = useSharedValue(1);

      const pressedBackgroundColor = useMemo(() => {
        return resolveThemeValue(colors, pressedBgColor);
      }, [pressedBgColor]);

      const originalBackgroundColor = useMemo(() => {
        return resolveThemeValue(colors, rest?.sx?.bgColor);
      }, [rest?.sx?.bgColor]);

      const bgColor = useDerivedValue(() => {
        return withTiming(
          scale.value === activeScale
            ? pressedBackgroundColor
            : originalBackgroundColor,
          { duration: 100 },
        );
      });

      const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = bgColor.value;
        const transform = [
          { scale: withTiming(scale.value, { duration: 100 }) },
        ];

        return originalBackgroundColor && pressedBackgroundColor
          ? { backgroundColor, transform }
          : { transform };
      });

      const handleOnPressIn = () => {
        scale.value = activeScale;
        if (onPressIn) onPressIn();
      };

      const handleOnPressOut = () => {
        scale.value = 1;
        if (onPressOut) onPressOut();
      };

      const viewStyles = useMemo(
        () => [animatedStyle, buildBoxStyles(rest.sx), style],
        [animatedStyle, rest, style],
      );

      return (
        <TouchableWithoutFeedback
          ref={ref}
          {...rest}
          style={containerStyle}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Animated.View style={viewStyles}>{children}</Animated.View>
        </TouchableWithoutFeedback>
      );
    },
  ),
);
