import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ViewportWide({
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
        d="M10 12H3m0 0l3-3m-3 3l3 3m8-3h7m0 0l-3-3m3 3l-3 3M3 6V3h18v3M3 18v3h18v-3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
