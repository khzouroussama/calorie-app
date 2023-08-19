import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function PackgeExport({ size = 24, color = '#000', ...props }) {
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
        d="M4 7.5V16.5L12 21V12M4 7.5L12 3L20 7.5M4 7.5L12 12M20 7.5V12M20 7.5L12 12M15 18H22M22 18L19 15M22 18L19 21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
