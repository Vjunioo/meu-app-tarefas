import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '../styles/theme';

export default function Logo({ size = 100 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="11" fill={COLORS.primary} stroke={COLORS.white} strokeWidth="1"/>
      <Path
        d="M9 12l2 2 4-4"
        stroke={COLORS.white}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}