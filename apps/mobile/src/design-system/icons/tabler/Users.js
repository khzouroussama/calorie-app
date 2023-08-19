import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Users({
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
        d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2m1-17.87a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
