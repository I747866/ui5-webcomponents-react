import { eachMonthOfInterval, endOfMonth, getDaysInMonth, getQuarter, getYear, startOfMonth } from 'date-fns/fp';
import { MONTH_NAMES } from '../../util/constants.js';
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
export const getMonthsDays = (start, end) => {
    return eachMonthOfInterval({ start, end }).map((month) => ({
        name: MONTH_NAMES[month.getMonth()],
        days: getDaysInMonth(month),
        year: getYear(month)
    }));
};
/**
 * Groups months within a specified date interval into their respective quarters,
 * aggregating the number of days in each quarter.
 *
 * @param {Date} start - The start date of the interval (inclusive).
 * @param {Date} end - The end date of the interval (inclusive).
 * @returns {QuarterMonths[]} An array of objects, each representing a quarter,
 *                            containing:
 *                            - quarter: An object with:
 *                              - name: The identifier of the quarter (e.g., "Q1 2024").
 *                              - days: The total number of days in the quarter.
 *                            - months: An array of objects for each month in the quarter,
 *                              each containing:
 *                              - name: The name of the month.
 *                              - days: The number of days in that month.
 *
 * @example
 * const quartersMonths = getQuartersMonths(new Date('2024-01-01'), new Date('2024-06-30'));
 * // returns [
 * //   {
 * //     quarter: { name: 'Q1 2024', days: 91 },
 * //     months: [
 * //       { name: 'January', days: 31 },
 * //       { name: 'February', days: 29 }, // Leap year
 * //       { name: 'March', days: 31 }
 * //     ]
 * //   },
 * //   {
 * //     quarter: { name: 'Q2 2024', days: 91 },
 * //     months: [
 * //       { name: 'April', days: 30 },
 * //       { name: 'May', days: 31 },
 * //       { name: 'June', days: 30 }
 * //     ]
 * //   }
 * // ]
 */
const getQuartersMonths = (start, end) => {
    const result = [];
    eachMonthOfInterval({ start, end }).forEach((month) => {
        const quarter = `Q${getQuarter(month)} ${getYear(month)}`;
        const monthName = MONTH_NAMES[month.getMonth()];
        const daysInMonth = getDaysInMonth(month);
        const existingQuarter = result.find((q) => q.quarter.name === quarter);
        if (existingQuarter) {
            existingQuarter.months.push({ name: monthName, days: daysInMonth });
            existingQuarter.quarter.days += daysInMonth;
        }
        else {
            result.push({
                quarter: { name: quarter, days: daysInMonth },
                months: [{ name: monthName, days: daysInMonth }]
            });
        }
    });
    return result;
};
/**
 * Groups quarters into their respective years, aggregating the number of days
 * for each year based on the provided quarters and their corresponding months.
 *
 * @param {QuarterMonths[]} quartersMonths - An array of objects representing
 *                                           quarters, where each object contains:
 *                                           - quarter: An object with:
 *                                             - name: The identifier of the quarter (e.g., "Q1 2024").
 *                                             - days: The total number of days in the quarter.
 *                                           - months: An array of objects for each month in the quarter,
 *                                             each containing:
 *                                             - name: The name of the month.
 *                                             - days: The number of days in that month.
 * @returns {YearQuarters[]} An array of objects representing years, each containing:
 *                            - year: An object with:
 *                              - name: The year (e.g., "2024").
 *                              - days: The total number of days in that year.
 *                            - quarters: An array of objects for each quarter in the year,
 *                              each containing:
 *                              - name: The identifier of the quarter (e.g., "Q1").
 *                              - days: The total number of days in that quarter.
 *
 * @example
 * const yearQuarters = getYearsQuarters([
 *   {
 *     quarter: { name: 'Q1 2024', days: 91 },
 *     months: [
 *       { name: 'January', days: 31 },
 *       { name: 'February', days: 29 }, // Leap year
 *       { name: 'March', days: 31 }
 *     ]
 *   },
 *   {
 *     quarter: { name: 'Q2 2024', days: 91 },
 *     months: [
 *       { name: 'April', days: 30 },
 *       { name: 'May', days: 31 },
 *       { name: 'June', days: 30 }
 *     ]
 *   }
 * ]);
 * // returns [
 * //   {
 * //     year: { name: '2024', days: 182 },
 * //     quarters: [
 * //       { name: 'Q1', days: 91 },
 * //       { name: 'Q2', days: 91 }
 * //     ]
 * //   }
 * // ]
 */
const getYearsQuarters = (quartersMonths) => {
    const result = [];
    quartersMonths.forEach((quarterMonths) => {
        const { name, days } = quarterMonths.quarter;
        const year = name.slice(3, 7);
        const quarter = name.slice(0, 2);
        const existingYear = result.find((q) => q.year.name === year);
        if (existingYear) {
            existingYear.quarters.push({ name: quarter, days: days });
            existingYear.year.days += days;
        }
        else {
            result.push({
                year: { name: year, days: days },
                quarters: [{ name: quarter, days: days }]
            });
        }
    });
    return result;
};
export const prepareTimelineData = (contractDuration) => {
    const { dateStart, dateEnd } = contractDuration;
    if (!dateStart || !dateEnd) {
        return null;
    }
    const start = startOfMonth(new Date(dateStart));
    const end = endOfMonth(new Date(dateEnd));
    if (start > end) {
        throw new Error('Start date cannot be after end date');
    }
    const monthsDays = getMonthsDays(start, end);
    const quartersMonths = getQuartersMonths(start, end);
    const yearsQuarters = getYearsQuarters(quartersMonths);
    return { monthsDays, quartersMonths, yearsQuarters };
};
