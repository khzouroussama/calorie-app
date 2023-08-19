import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Server2({
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
        d="M18 12a3 3 0 003-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v2a3 3 0 003 3m12 0H6m12 0a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2a3 3 0 013-3m1-4v.01M7 16v.01M11 8h6m-6 8h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
