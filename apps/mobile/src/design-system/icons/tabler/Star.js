import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Star({ size = 24, color = '#000', strokeWidth = 2, ...props }) {
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
        d="M12 17.75l-6.172 3.245 1.18-6.873-5-4.867 6.9-1 3.085-6.253 3.086 6.253 6.9 1-5 4.867 1.18 6.873L12 17.75z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
