import type { IChartMeasure } from '../interfaces/IChartMeasure.js';
interface ITrendChartMeasure extends IChartMeasure {
  type: 'line' | 'bar';
}
export declare const usePrepareTrendMeasures: (
  measures: ITrendChartMeasure[],
  dataset: Record<string, unknown>[]
) => {
  lineMeasures: any[];
  columnMeasures: any[];
  columnDataset: any[];
};
export {};
