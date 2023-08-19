import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ZoomQuestion({
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
        d="M21 21l-6-6m-5-2v.01M10 10a1.5 1.5 0 10-1.14-2.474M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
