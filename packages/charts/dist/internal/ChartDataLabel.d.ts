import React from 'react';
import type { IChartMeasure } from '../interfaces/IChartMeasure.js';
interface CustomDataLabelProps {
  config: IChartMeasure;
  viewBox?: any;
  chartType: 'bar' | 'column' | 'line' | 'radar' | 'pie' | 'area';
  position?: string;
  value?: any;
  children?: any;
}
export declare const ChartDataLabel: (props: CustomDataLabelProps) => React.JSX.Element;
export {};
