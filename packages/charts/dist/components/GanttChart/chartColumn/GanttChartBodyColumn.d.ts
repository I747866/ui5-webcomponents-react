import type { ReactNode } from 'react';
import React from 'react';
import type {
  DateRange,
  DimensionsState,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
} from '../types/GanttChartTypes.js';
export interface GanttChartBodyColumnProps {
  dataset: IGanttChartRow[];
  dimensions: DimensionsState;
  chartBodyScale: number;
  height: number;
  rowHeight: number;
  numberOfRows: number;
  totalDuration: number;
  contractDuration: DateRange;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  showStatus?: boolean;
  staticVerticalLinePosition?: string;
  annotations?: ReactNode | ReactNode[];
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  handleTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  shouldEventsBeGrouped: boolean;
}
export declare const GanttChartBodyColumn: (props: GanttChartBodyColumnProps) => React.JSX.Element;
