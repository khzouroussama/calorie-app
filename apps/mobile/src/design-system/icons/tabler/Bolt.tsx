import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Bolt({
  color = 'black',
  size = 24,
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
        d="M13 3v7h6l-8 11v-7H5l8-11z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
