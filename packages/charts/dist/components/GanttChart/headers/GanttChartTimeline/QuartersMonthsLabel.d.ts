import React from 'react';
import type { QuarterMonths } from '../../types/GanttChartTypes.js';
export interface QuartersMonthsLabelProps {
  segmentWidth: number;
  quartersMonths: QuarterMonths[];
}
export declare const QuartersMonthsLabel: (props: QuartersMonthsLabelProps) => React.JSX.Element;
