import React from 'react';
import type {
  DateRange,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
} from '../types/GanttChartTypes.js';
export interface GanttChartRowGroupProps {
  dataset: IGanttChartRow[];
  rowHeight: number;
  totalDuration: number;
  contractDuration: DateRange;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  hideTooltip: () => void;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  chartBodyScale: number;
  ganttChartBodyWidth: number;
  shouldEventsBeGrouped: boolean;
}
export declare const GanttChartRowGroup: {
  (props: GanttChartRowGroupProps): React.JSX.Element;
  displayName: string;
};
