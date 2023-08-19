import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ShoppingCart({
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
        d="M6 17a2 2 0 100 4 2 2 0 000-4zm0 0h11M6 17V3H4m13 14a2 2 0 100 4 2 2 0 000-4zM6 5l14 1-1 7H6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
