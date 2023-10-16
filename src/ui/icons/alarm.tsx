import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Polyline } from 'react-native-svg';

export const Alarm = ({ color, ...props }: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    stroke={color || 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="12 6 12 12 16.5 12" />
  </Svg>
);
