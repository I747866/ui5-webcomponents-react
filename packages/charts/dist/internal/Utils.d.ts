import type { IChartMeasure } from '../interfaces/IChartMeasure.js';
export declare const getCellColors: (element: Record<string, any>, data: Record<string, any>, index: number) => string;
export declare const getTextWidth: (text: any) => any;
export declare const truncateLongLabel: (value: string, length?: number) => string;
export declare const resolvePrimaryAndSecondaryMeasures: (
  measures: IChartMeasure[],
  secondaryAxisDataKey: string
) => {
  primaryMeasure: IChartMeasure;
  secondaryMeasure: IChartMeasure;
};
