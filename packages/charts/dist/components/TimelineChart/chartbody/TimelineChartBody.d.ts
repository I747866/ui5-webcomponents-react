import type { ReactNode } from 'react';
import React from 'react';
import type { ITimelineChartRow } from '../types/TimelineChartTypes.js';
interface TimelineChartBodyProps {
  dataset: ITimelineChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  isDiscrete: boolean;
  annotations?: ReactNode | ReactNode[];
  showAnnotation?: boolean;
  showConnection?: boolean;
  showTooltip?: boolean;
  unit: string;
  start: number;
  unscaledWidth?: number;
  onScale: (x: number) => void;
  valueFormat?: (value: number) => string;
  resetScroll: () => void;
}
declare const TimelineChartBody: ({
  dataset,
  width,
  rowHeight,
  numOfItems,
  totalDuration,
  isDiscrete,
  annotations,
  showAnnotation,
  showConnection,
  showTooltip,
  unit,
  start,
  unscaledWidth,
  onScale,
  valueFormat,
  resetScroll
}: TimelineChartBodyProps) => React.JSX.Element;
export { TimelineChartBody };
