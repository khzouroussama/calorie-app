import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Mail({ size = 24, color = '#000', strokeWidth = 1, ...props }) {
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
        d="M21 7a2 2 0 00-2-2H5a2 2 0 00-2 2m18 0v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7m18 0l-9 6-9-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
