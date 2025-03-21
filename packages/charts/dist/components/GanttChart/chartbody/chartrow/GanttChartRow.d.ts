import React from 'react';
import type { IGanttChartRow } from '../../types/GanttChartTypes.js';
interface GanttChartRowProps {
  rowData: IGanttChartRow;
  rowHeight: number;
  rowIndex: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
  hideTooltip: () => void;
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
    handleTaskClick
  }: GanttChartRowProps): React.JSX.Element;
  displayName: string;
};
export {};
