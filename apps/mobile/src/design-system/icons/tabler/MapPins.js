import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function MapPins({
  size = 24,
  color = '#000',
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
        d="M8 7v.01M16 15v.01m-5.172-5.182a4 4 0 10-5.656 0L8 12.658l2.828-2.83zm8 8a4 4 0 10-5.656 0L16 20.657l2.828-2.83z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
