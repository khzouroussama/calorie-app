import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Flask({
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
        d="M9 3h6m-5 6h4m-4 0V3m0 6L6 20a.7.7 0 00.5 1h11a.7.7 0 00.5-1L14 9m0 0V3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
