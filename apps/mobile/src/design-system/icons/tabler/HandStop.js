import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function HandStop({
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
        d="M11 5.5a1.5 1.5 0 10-3 0V13l-1.47-1.47a1.868 1.868 0 00-2.28-.28 1.5 1.5 0 00-.536 2.022C5.593 16.612 6.688 18.521 7 19l.196.3a6 6 0 005.012 2.7H12h2a6 6 0 006-6V7.5a1.5 1.5 0 10-3 0m-6-2V12m0-6.5v-2a1.5 1.5 0 113 0V12m0-6.5a1.5 1.5 0 013 0V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
