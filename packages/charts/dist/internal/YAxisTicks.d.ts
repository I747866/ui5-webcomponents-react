import React from 'react';
import type { IChartMeasure } from '../interfaces/IChartMeasure.js';
interface YAxisTicksProps {
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
export declare const YAxisTicks: (props: YAxisTicksProps) => React.JSX.Element;
export {};
