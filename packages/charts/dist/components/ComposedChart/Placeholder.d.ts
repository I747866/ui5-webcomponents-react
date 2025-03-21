import React from 'react';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface ComposedChartPlaceholderPropTypes {
  layout: 'vertical' | 'horizontal';
  measures: (IChartMeasure & {
    type: string;
  })[];
}
export declare const ComposedChartPlaceholder: ({
  layout,
  measures
}: ComposedChartPlaceholderPropTypes) => React.JSX.Element;
export {};
