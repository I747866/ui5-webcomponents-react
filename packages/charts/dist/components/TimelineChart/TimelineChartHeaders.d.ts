import React from 'react';
import type { ITimelineChartRow } from './types/TimelineChartTypes.js';
interface TimelineChartRowLabelsProps {
  width: number;
  height: number;
  rowHeight: number;
  dataset: ITimelineChartRow[];
}
declare const TimelineChartRowLabels: ({
  width,
  height,
  rowHeight,
  dataset
}: TimelineChartRowLabelsProps) => React.JSX.Element;
interface TimelineChartColumnLabelProps {
  width: number;
  height: number;
  isDiscrete: boolean;
  totalDuration: number;
  unit: string;
  columnLabels?: string[];
  start: number;
  unscaledWidth: number;
  valueFormat?: (value: number) => string;
}
declare const TimelineChartColumnLabel: ({
  width,
  height,
  isDiscrete,
  totalDuration,
  columnLabels,
  start,
  unscaledWidth,
  valueFormat
}: TimelineChartColumnLabelProps) => React.JSX.Element;
interface TimelineChartRowTitleProps {
  width: number;
  height: number;
  rowTitle: string;
}
declare const TimelineChartRowTitle: ({ width, height, rowTitle }: TimelineChartRowTitleProps) => React.JSX.Element;
export { TimelineChartColumnLabel, TimelineChartRowTitle, TimelineChartRowLabels };
