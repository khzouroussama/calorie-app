import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ViewportNarrow({
  size = 24,
  color = '#000',
  strokeWidth = 2,
  ...props
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 12h7m0 0L7 9m3 3l-3 3m14-3h-7m0 0l3-3m-3 3l3 3M9 6V3h6v3M9 18v3h6v-3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
