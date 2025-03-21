import React from 'react';
import type { ITimelineChartRow } from '../types/TimelineChartTypes.js';
interface TimelineChartConnectionsProps {
  dataSet: ITimelineChartRow[];
  /**
   * The row height. This is used to calculate drawing the
   * connection arrows.
   */
  rowHeight: number;
  /**
   * The width of the chart body.
   * This is required to help rerender the arrows when the size
   * of the chart body changes.
   */
  width: number;
  /**
   * This is required to get the bounding box of the chart body
   * and to be able to calculate the relative positions of the
   * start and end points of the connection arrows based on the
   * bounding box parameters of the chart body.
   */
  bodyRect: DOMRect;
}
/**
 * This holds all the arrows that show the connections between different tasks.
 */
declare const TimelineChartConnections: ({
  dataSet,
  width,
  rowHeight,
  bodyRect
}: TimelineChartConnectionsProps) => React.JSX.Element;
export { TimelineChartConnections };
