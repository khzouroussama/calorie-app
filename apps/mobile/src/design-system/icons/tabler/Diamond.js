import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Diamond({
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
        d="M10 12L8 9.8l.6-1M6 5h12l3 5-8.5 9.5a.7.7 0 01-1 0L3 10l3-5z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
