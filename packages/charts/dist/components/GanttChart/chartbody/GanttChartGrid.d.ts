import React from 'react';
interface GanttChartGridProps {
  /**
   * Whether to render the vertical grid lines for a GanttChart
   * with discrete segments.
   */
  numOfRows: number;
  rowHeight: number;
  width: number;
  unscaledWidth: number;
}
/**
 * This component represents the grid lines on the chart. The `isDiscrete` prop is
 * used to decided whether to render the vertical grid lines.
 */
declare const GanttChartGrid: ({
  numOfRows,
  rowHeight,
  width,
  unscaledWidth
}: GanttChartGridProps) => React.JSX.Element;
export { GanttChartGrid };
