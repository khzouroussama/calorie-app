import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ShoppingCartX({
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
        d="M6 17a2 2 0 100 4 2 2 0 000-4zm0 0h11M6 17V3H4m13 14a2 2 0 100 4 2 2 0 000-4zM6 5l7.999.571m5.43 4.43L19 13H6M17 3l4 4m0-4l-4 4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
