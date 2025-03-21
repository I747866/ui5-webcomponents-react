import React from 'react';
import type { TimelineUnit } from '../../types/GanttChartTypes.js';
export interface MonthsDaysLabelProps {
  segmentWidth: number;
  months: TimelineUnit[];
}
export declare const MonthsDaysLabel: (props: MonthsDaysLabelProps) => React.JSX.Element;
