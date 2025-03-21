import { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes, IGanttChartEvent, IGanttChartTask } from '../types/GanttChartTypes.js';
export interface GanttChartBodyProps {
    dataset: IGanttChartRow[];
    width?: number;
    height?: number;
    rowHeight: number;
    numOfItems: number;
    totalDuration: number;
    contractDuration: DateRange;
    annotations?: ReactNode | ReactNode[];
    handleTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
    onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
    showAnnotation?: boolean;
    showVerticalLineOnHover?: boolean;
    showStaticVerticalLine?: boolean;
    staticVerticalLinePosition?: string;
    unscaledWidth?: number;
    openRowIndexes: OpenRowIndex;
    openSubRowIndexes: OpenSubRowIndexes;
    chartBodyScale: number;
    shouldEventsBeGrouped: boolean;
}
declare const GanttChartBody: (props: GanttChartBodyProps) => React.JSX.Element;
export { GanttChartBody };
