import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function TruckDelivery({ size = 24, color = '#000', ...props }) {
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
        d="M9 17C9 18.1046 8.10457 19 7 19C5.89543 19 5 18.1046 5 17M9 17C9 15.8954 8.10457 15 7 15C5.89543 15 5 15.8954 5 17M9 17H15M5 17H3V13M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M19 17H21V11M2 5H13V17M21 11H13M21 11L18 6H13M3 9H7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
