import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Edit({ size = 24, color = '#000', strokeWidth = 1, ...props }) {
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
        d="M7 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1M16 5l3 3m1.385-1.415a2.1 2.1 0 00-2.97-2.97L9 12v3h3l8.385-8.415z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
