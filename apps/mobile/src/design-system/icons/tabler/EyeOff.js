import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function EyeOff({ size = 24, color = '#FFF', ...props }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 1L20 19M9.58399 8.58698C9.20871 8.96199 8.99778 9.47073 8.99759 10.0013C8.9974 10.5318 9.20798 11.0407 9.58299 11.416C9.95801 11.7913 10.4667 12.0022 10.9973 12.0024C11.5278 12.0026 12.0367 11.792 12.412 11.417M8.363 3.365C9.22042 3.11972 10.1082 2.99684 11 3C15 3 18.333 5.333 21 10C20.222 11.361 19.388 12.524 18.497 13.488M16.357 15.349C14.726 16.449 12.942 17 11 17C7 17 3.667 14.667 1 10C2.369 7.605 3.913 5.825 5.632 4.659"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
