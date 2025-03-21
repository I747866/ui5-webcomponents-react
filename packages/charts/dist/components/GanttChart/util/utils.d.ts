import type {
  DateRange,
  IEventsGroup,
  IGanttChartEvent,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes
} from '../types/GanttChartTypes.js';
/**
 * Function to count all rows in a dataset of Gantt chart rows, including nested details and sub-details.
 * It calculates the total number of rows based on the expanded rows and sub-rows determined by the provided open row and sub-row indexes.
 *
 * @param {IGanttChartRow[]} rows - The dataset of Gantt chart rows to count.
 * @param {OpenRowIndex} openRowIndex - The index of the row that is currently expanded.
 * @param {OpenSubRowIndexes} openSubRowIndexes - An object mapping the indexes of expanded sub-rows.
 *
 * @returns {number} - The total count of rows, including expanded rows and sub-rows.
 */
export declare const countAllRows: (
  rows: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
) => number;
/**
 * Formats the duration between the start and end dates of a contract.
 * It calculates the strict time difference between the two dates and returns the result in a human-readable format.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {string | null} - A formatted string representing the strict difference between the start and end dates (e.g., "3 months", "1 year"), or `null` if the input is invalid.
 */
export declare const formatContractDuration: (contractDuration: DateRange) => string | null;
/**
 * Calculates the total duration of a contract in days.
 * It computes the difference between the start and end dates of the contract in terms of days.
 *
 * @param {DateRange} contractDuration - An object containing `dateStart` and `dateEnd` properties representing the contract's duration.
 * @returns {number | null} - The total number of days between the start and end dates, or `null` if the input is invalid.
 */
export declare const calculateTotalDuration: (contractDuration: DateRange) => number | null;
/**
 * Counts the duration of a task in days.
 *
 * @param {string} dateStart - The start date of the task in ISO format.
 * @param {string} dateEnd - The end date of the task in ISO format.
 *
 * @returns {number} - The duration of the task in days.
 */
export declare const countTaskDuration: (dateStart: string, dateEnd: string) => number;
/**
 * Calculates the start time of a task relative to the contract start date.
 *
 * @param {string} contractStartDate - The start date of the contract in ISO format.
 * @param {string} taskStartDate - The start date of the task in ISO format.
 *
 * @returns {number} - The start time of the task relative to the contract start date.
 */
export declare const getStartTime: (contractStartDate: string, taskStartDate: string) => number;
/**
 * Function to flatten a dataset of Gantt chart rows, including nested subRows and theirs nested subRows.
 * It processes the dataset to include the expanded rows based on the specified open row and sub-row indexes.
 *
 * @param {IGanttChartRow[]} dataset - The original dataset containing Gantt chart rows.
 * @param {OpenRowIndex} openRowIndex - The index of the row that is currently expanded.
 * @param {OpenSubRowIndexes} openSubRowIndexes - An object mapping the indexes of expanded sub-rows.
 *
 * @returns {IGanttChartRow[]} - The flattened dataset, including expanded rows and sub-rows.
 */
export declare const flattenDataset: (
  dataset: IGanttChartRow[],
  openRowIndex: OpenRowIndex,
  openSubRowIndexes: OpenSubRowIndexes
) => IGanttChartRow[];
/**
 * Groups overlapping events on the Gantt chart.
 * It groups events that are too close to each other based on the provided overlap threshold.
 * ShouldBeGrouped boolean property from IGanttChartEvent determines if the event should be grouped.
 *
 * @param {IGanttChartEvent[]} events - The list of events to group.
 * @param {string} contractStartDate - The start date of the contract in ISO format.
 * @param {number} GanttStart - The start time of the Gantt chart.
 * @param {number} totalDuration - The total duration of the contract in days.
 * @param {number} svgWidth - The width of the SVG element.
 * @param {number} iconSize - The size of the event icons.
 *
 * @returns {IEventsGroup[]} - An array of grouped events.
 */
export declare const groupOverlappingEvents: (
  events: IGanttChartEvent[],
  contractStartDate: string,
  GanttStart: number,
  totalDuration: number,
  svgWidth: number,
  iconSize: number
) => IEventsGroup[];
