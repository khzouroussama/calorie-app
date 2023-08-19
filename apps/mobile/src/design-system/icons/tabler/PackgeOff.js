import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function PackgeOff({ size = 24, color = '#000', ...props }) {
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
        d="M8.812 4.793L12 3L20 7.5M20 7.5V16M20 7.5L14.543 10.57M17.718 17.784L12 21M12 21L4 16.5V7.5M12 21V12L4 7.5M4 7.5L6.223 6.25M16 5.25L11.65 7.697M9.086 9.139L8 9.75M3 3L21 21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
