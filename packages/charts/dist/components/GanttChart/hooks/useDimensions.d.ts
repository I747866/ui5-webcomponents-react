/// <reference types="react" />
import type { DimensionsState } from '../types/GanttChartTypes.js';
export declare const useDimensions: (
  showStatus: boolean,
  rowHeight: number,
  numberOfRows: number
) => {
  dimensions: DimensionsState;
  height: number;
  bodyWidth: number;
  gridTemplateColumns: string;
  setDimensions: import('react').Dispatch<import('react').SetStateAction<DimensionsState>>;
  chartBodyScale: number;
  setChartBodyScale: import('react').Dispatch<import('react').SetStateAction<number>>;
};
