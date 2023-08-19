import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function HandOff({
  size = 24,
  color = '#000',
  strokeWidth = 1,
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
        d="M3 3l18 18M8 13.5V8m.44-3.562A1.5 1.5 0 0111 5.5m0 0V7m0-1.5v-2a1.5 1.5 0 113 0V10m-3 1.008V12m3-6.5a1.5 1.5 0 113 0V12m0-4.5a1.5 1.5 0 113 0V16a6 6 0 01-6 6h-2c-2.114-.292-3.956-1.397-5-3l-2.7-5.25a1.7 1.7 0 012.75-2l.9 1.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
