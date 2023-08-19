import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Photo({
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
        d="M15 8h.01M4 15l4-4c.456-.439.973-.67 1.5-.67s1.044.231 1.5.67l5 5m-2-2l1-1c.456-.439.973-.67 1.5-.67s1.044.231 1.5.67l2 2M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
