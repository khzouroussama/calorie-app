import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Apple({
  color = 'black',
  size = 24,
  strokeWidth = 1,
  ...props
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 11V5a2 2 0 012-2h2v1a2 2 0 01-2 2h-2m-2 4.5c1.333.667 2.667.667 4 0M5 14a7 7 0 1014 0 7 7 0 00-14 0z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
