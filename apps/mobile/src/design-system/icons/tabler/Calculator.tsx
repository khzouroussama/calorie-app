import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Calculator({
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
        d="M8 14v.01m4-.01v.01m4-.01v.01M8 17v.01m4-.01v.01m4-.01v.01M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm3 4h6a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V8a1 1 0 011-1z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
