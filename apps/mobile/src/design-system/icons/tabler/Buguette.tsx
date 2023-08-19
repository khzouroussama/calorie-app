import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Buguette({
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
        d="M9.5 7.5L11 11m-4.5-.5L8 14m4.5-9.5L14 8m-8.372 3.283l5.644-5.637c2.665-2.663 5.924-3.747 8.663-1.205l.188.181a2.988 2.988 0 010 4.228L8.836 20.124a3 3 0 01-4.089.135l-.143-.135C1.876 17.4 2.9 14.007 5.628 11.283z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
