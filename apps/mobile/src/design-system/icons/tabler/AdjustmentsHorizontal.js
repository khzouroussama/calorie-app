import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function AdjustmentsHorizontal({
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
        d="M16 6a2 2 0 11-4 0m4 0a2 2 0 10-4 0m4 0h4m-8 0H4m6 6a2 2 0 11-4 0m4 0a2 2 0 10-4 0m4 0h10M6 12H4m15 6a2 2 0 11-4 0m4 0a2 2 0 10-4 0m4 0h1m-5 0H4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
