import React from 'react';
import type { IChartMeasure } from '../interfaces/IChartMeasure.js';
interface XAxisTicksProps {
  visibleTicksCount?: number;
  width?: number;
  x?: number;
  y?: number;
  payload?: any;
  config: IChartMeasure;
  secondYAxisConfig?: {
    color: string;
  };
  tickFormatter?: (value: any, index: number) => string;
  index?: number;
}
export declare const XAxisTicks: (props: XAxisTicksProps) => React.JSX.Element;
export {};
