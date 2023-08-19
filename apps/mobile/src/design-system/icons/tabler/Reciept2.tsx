import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Reciept2({
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
        d="M14 8h-2.5a1.5 1.5 0 000 3h1a1.5 1.5 0 110 3H10m2 0v1.5m0-9V8M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
