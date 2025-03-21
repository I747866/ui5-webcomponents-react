import React from 'react';
import type { IGanttChartEvent } from '../types/GanttChartTypes.js';
interface GanttChartEventProps {
  date?: string;
  icon?: string;
  iconSize?: number;
  shiftIconPx?: number;
  iconColor?: string;
  events: IGanttChartEvent[];
  position: number | string;
  handleEventsClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  groupIcon?: string;
}
export declare const GanttChartEvent: ({
  iconSize,
  shiftIconPx,
  events,
  position,
  handleEventsClick,
  groupIcon
}: GanttChartEventProps) => React.JSX.Element;
export {};
