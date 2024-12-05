import type { CSSProperties } from 'react';
export interface IGanttChartRow {
    id: string;
    label: string;
    badge?: string;
    status?: string;
    details?: IGanttChartRow[];
    subDetails?: IGanttChartRow[];
    tasks: IGanttChartTask[];
    subRows?: IGanttChartRow[];
}
/**
 * This is the data representing each task on the row.
 */
export interface IGanttChartTask {
    /**
     * A unique id for identifying the task or milestone in the Gantt
     */
    id?: string;
    /**
     * The start date of the task or milestone. This is used to determine the
     * proportional starting point of the task or milestone on the Gantt.
     */
    dateStart: string;
    /**
     * The end date of the task. This is used to determine the proportional
     * ending point of the task on the Gantt.
     */
    dateEnd: string;
    /**
     * The task status displayed in the middle of the task bar.
     */
    status?: string;
    /**
     * The color of the task in the row. If not provided, the color
     * of the `IGanttChartRow` is used. Any valid CSS color will do.
     */
    color?: CSSProperties['color'];
    /**
     * The tooltip text to be displayed on the Gantt task
     */
    tooltipText?: string;
    /**
     * A list of events (icons) to be displayed on the task.
     */
    events: IGanttChartEvent[];
}
/**
 * The data representing an event on the Gantt. The event has two fields: the
 * icon to be displayed and the date on which the icon will be placed.
 */
export interface IGanttChartEvent {
    /**
     * The unique id of the event.
     */
    id: string;
    /**
     * The icon to be displayed on the Gantt. It has to be from SAP Icons library.
     */
    icon: string;
    /**
     * The date on which the icon will be placed on the Gantt.
     */
    date: string;
    color?: CSSProperties['color'];
    startTime: number;
    shouldBeGrouped?: boolean;
}
/**
 * The data representing the connection between two tasks on the Gantt.
 * The tasks can be on the same row or on different rows.
 */
export interface DateRange {
    dateStart: string;
    dateEnd: string;
}
export type OpenRowIndex = number[];
export type OpenSubRowIndexes = {
    [key: string]: boolean;
};
export type DimensionsState = {
    width: number;
    height: number;
    chartWidth: number;
    chartHeight: number;
    currentChartWidth: number;
};
export type ColumnDataType = 'label' | 'status';
export type YearQuarters = {
    year: TimelineUnit;
    quarters: TimelineUnit[];
};
export type QuarterMonths = {
    quarter: TimelineUnit;
    months: TimelineUnit[];
};
export type TimelineUnit = {
    name: string;
    days: number;
    year?: number;
};
export type TimelineData = {
    monthsDays: TimelineUnit[];
    quartersMonths: QuarterMonths[];
    yearsQuarters: YearQuarters[];
};
export interface IEventsGroup {
    key: string;
    events: IGanttChartEvent[];
    startTime: number;
    positionPx: number;
}
