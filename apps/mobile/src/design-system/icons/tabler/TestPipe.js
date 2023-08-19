import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function TestPipe({ size = 24, color = '#000', ...props }) {
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
        d="M20 8.04L7.878 20.164a2.857 2.857 0 01-4.041-4.04L15.959 4M7 13h8m0-10l6 6m-2 6l1.5 1.6a2.001 2.001 0 11-3 0L19 15z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
