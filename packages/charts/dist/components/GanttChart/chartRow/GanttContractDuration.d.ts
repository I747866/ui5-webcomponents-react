import React from 'react';
import type { DateRange } from '../types/GanttChartTypes.js';
export interface GanttContractDurationProps {
  contractDuration: DateRange;
}
export declare const GanttContractDuration: {
  (props: GanttContractDurationProps): React.JSX.Element;
  displayName: string;
};
