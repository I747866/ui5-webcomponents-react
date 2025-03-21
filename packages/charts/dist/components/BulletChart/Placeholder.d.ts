import React from 'react';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface BulletChartPlaceholderPropTypes {
  layout: 'vertical' | 'horizontal';
  measures: (IChartMeasure & {
    type: string;
  })[];
}
export declare const BulletChartPlaceholder: ({
  layout,
  measures
}: BulletChartPlaceholderPropTypes) => React.JSX.Element;
export {};
