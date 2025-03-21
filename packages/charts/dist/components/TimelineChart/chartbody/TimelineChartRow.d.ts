import React from 'react';
import type { ITimelineChartRow } from '../types/TimelineChartTypes.js';
interface TimelineChartRowGroupProps {
  dataset: ITimelineChartRow[];
  rowHeight: number;
  totalDuration: number;
  timelineStart: number;
  showTooltip: (...x: unknown[]) => void;
  hideTooltip: () => void;
  postRender: () => void;
}
declare const TimelineChartRowGroup: {
  ({
    dataset,
    rowHeight,
    totalDuration,
    timelineStart,
    showTooltip,
    hideTooltip,
    postRender
  }: TimelineChartRowGroupProps): React.JSX.Element;
  displayName: string;
};
export { TimelineChartRowGroup };
