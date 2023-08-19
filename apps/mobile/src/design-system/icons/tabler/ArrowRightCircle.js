import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function TablerArrowRightCircle({
  size = 24,
  color = '#000',
  strokeWidth = 1,
  ...props
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16 7L19 4M19 4L16 1M19 4H5M5 4C5 5.10457 4.10457 6 3 6C1.89543 6 1 5.10457 1 4C1 2.89543 1.89543 2 3 2C4.10457 2 5 2.89543 5 4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
