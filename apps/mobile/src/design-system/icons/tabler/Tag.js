import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Tag({ size = 24, color = '#000', strokeWidth = 2, ...props }) {
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
        d="M8.5 9.5a1 1 0 100-2 1 1 0 000 2z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 7v3.859c0 .537.213 1.052.593 1.432l8.116 8.116a2.023 2.023 0 002.864 0l4.834-4.834a2.023 2.023 0 000-2.864L12.29 4.593A2.025 2.025 0 0010.859 4H7a3 3 0 00-3 3z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
