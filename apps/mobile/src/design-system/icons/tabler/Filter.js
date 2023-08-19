import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Filter({
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
        d="M5.5 5h13a1 1 0 01.5 1.5L14 12v7l-4-3v-4L5 6.5A1 1 0 015.5 5z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
