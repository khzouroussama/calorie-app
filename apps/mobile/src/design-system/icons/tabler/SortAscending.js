import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function SortAscending({
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
        d="M4 6h7m-7 6h7m-7 6h9m2-9l3-3m0 0l3 3m-3-3v12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
