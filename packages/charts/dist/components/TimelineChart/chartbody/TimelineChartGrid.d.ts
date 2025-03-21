import React from 'react';
interface TimelineChartGridProps {
  /**
   * Whether to render the vertical grid lines for a TimelineChart
   * with discrete segments.
   */
  isDiscrete: boolean;
  numOfRows: number;
  rowHeight: number;
  totalDuration: number;
  width: number;
  unscaledWidth: number;
}
/**
 * This component represents the grid lines on the chart. The `isDiscrete` prop is
 * used to decided whether to render the vertical grid lines.
 */
declare const TimelineChartGrid: ({
  isDiscrete,
  numOfRows,
  rowHeight,
  totalDuration,
  width,
  unscaledWidth
}: TimelineChartGridProps) => React.JSX.Element;
export { TimelineChartGrid };
