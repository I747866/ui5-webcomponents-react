import type { PropsWithChildren } from 'react';
import React from 'react';
export interface LabelProps {
  x1: number;
  x2: number;
  y1: number | string;
  y2: number | string;
  x: number;
  y: number | string;
  dy: number;
  textColor?: string;
}
export declare const Label: (props: PropsWithChildren<LabelProps>) => React.JSX.Element;
