import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import stableHash from 'stable-hash';
import { SxProps, buildBoxStyles } from '@/design-system/utils/buildSxProps';

export type BoxProps = {
  sx?: SxProps;
} & ViewProps;

/**
 * @example
 * <Box row px="sm">
 *  <Typography>Hello World</Typography>
 * </Box>
 */
function Box(props: BoxProps, ref: ForwardedRef<typeof View>) {
  const { sx, style, ...rest } = props;

  const sxStyles = useMemo(
    () => (sx ? buildBoxStyles(sx) : undefined),
    // stable hash is used to memoize the sx object even if the component re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stableHash(sx)],
  );

  return <View ref={ref} style={sxStyles} {...(rest as any)} />;
}

export default memo(forwardRef(Box));
