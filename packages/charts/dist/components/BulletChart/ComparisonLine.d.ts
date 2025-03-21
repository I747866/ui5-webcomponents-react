import type { CSSProperties } from 'react';
import React from 'react';
interface ComparisonLine {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  strokeWidth?: number;
  fill?: CSSProperties['fill'];
  layout: 'vertical' | 'horizontal';
}
export declare const ComparisonLine: (props: ComparisonLine) => React.JSX.Element;
export {};
