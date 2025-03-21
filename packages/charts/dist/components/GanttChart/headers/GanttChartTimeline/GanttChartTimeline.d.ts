import React from 'react';
import type { DateRange } from '../../types/GanttChartTypes.js';
export interface GanttChartTimelineProps {
  width: number;
  height: number;
  totalDuration: number;
  contractDuration: DateRange;
}
export declare const GanttChartTimeline: (props: GanttChartTimelineProps) => React.JSX.Element;
