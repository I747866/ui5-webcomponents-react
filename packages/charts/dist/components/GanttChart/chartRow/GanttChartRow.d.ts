import React from 'react';
import type { DateRange, IGanttChartRow, IGanttChartEvent, IGanttChartTask } from '../types/GanttChartTypes.js';
interface GanttChartRowProps {
  rowData: IGanttChartRow;
  rowHeight: number;
  rowIndex: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  hideTooltip: () => void;
  contractDuration: DateRange;
  chartBodyScale: number;
  ganttChartBodyWidth: number;
  shouldEventsBeGrouped: boolean;
}
/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
export declare const GanttChartRow: {
  ({
    rowData,
    rowHeight,
    rowIndex,
    totalDuration,
    GanttStart,
    showTooltip,
    hideTooltip,
    handleTaskClick,
    contractDuration,
    chartBodyScale,
    ganttChartBodyWidth,
    handleEventsClick,
    shouldEventsBeGrouped,
    ...rest
  }: GanttChartRowProps): React.JSX.Element;
  displayName: string;
};
export {};
