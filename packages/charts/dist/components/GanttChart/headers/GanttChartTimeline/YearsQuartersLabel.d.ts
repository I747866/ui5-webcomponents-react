import React from 'react';
import type { YearQuarters } from '../../types/GanttChartTypes.js';
export interface YearsQuartersLabelProps {
  segmentWidth: number;
  yearsQuarters: YearQuarters[];
}
export declare const YearsQuartersLabel: (props: YearsQuartersLabelProps) => React.JSX.Element;
