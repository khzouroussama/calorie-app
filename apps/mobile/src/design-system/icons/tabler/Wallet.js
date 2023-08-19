import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Wallet({
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
        d="M4 6a2 2 0 012-2h10a1 1 0 011 1v3l2 4V9a1 1 0 00-1-1H6a2 2 0 01-2-2zm0 0v12a2 2 0 002 2h12a1 1 0 001-1v-3m1-4v4h-4a2 2 0 010-4h4z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
