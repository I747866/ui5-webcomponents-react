import type { DateRange, TimelineData, TimelineUnit } from '../../types/GanttChartTypes.js';
/**
 * Gets an array of months with their corresponding number of days and year
 * within a specified date interval.
 *
 * @param {Date} start - The start date of the interval (inclusive).
 * @param {Date} end - The end date of the interval (inclusive).
 * @returns {TimelineUnit[]} An array of objects, each representing a month
 *                           within the interval, containing:
 *                           - name: The name of the month.
 *                           - days: The number of days in that month.
 *                           - year: The year of that month.
 *
 * @example
 * const monthsDays = getMonthsDays(new Date('2024-01-01'), new Date('2024-03-31'));
 * // returns [
 * //   { name: 'January', days: 31, year: 2024 },
 * //   { name: 'February', days: 29, year: 2024 }, // Leap year
 * //   { name: 'March', days: 31, year: 2024 }
 * // ]
 */
export declare const getMonthsDays: (start: Date, end: Date) => TimelineUnit[];
export declare const prepareTimelineData: (contractDuration: DateRange) => TimelineData;
