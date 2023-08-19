import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function CurrencyEuro({ size = 24, color = '#000', ...props }) {
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
        d="M17.2 7c-.844-.965-1.913-1.617-3.074-1.876a5.212 5.212 0 00-3.45.423c-1.089.534-2.019 1.43-2.672 2.579A7.857 7.857 0 007 12c0 1.378.349 2.726 1.003 3.874.653 1.148 1.583 2.045 2.673 2.58 1.089.533 2.289.68 3.45.422 1.16-.259 2.23-.911 3.073-1.876M13 10H5m0 4h8"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
