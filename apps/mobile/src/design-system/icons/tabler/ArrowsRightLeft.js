import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ArrowsRightLeft({
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
        d="M21 7H3m18 0l-3 3m3-3l-3-3M6 20l-3-3m0 0l3-3m-3 3h18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
