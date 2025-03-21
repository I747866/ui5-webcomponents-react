import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export declare const useCollapsableRows: (dataset: IGanttChartRow[]) => {
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numberOfRows: number;
  handleClick: (index: number) => void;
  handleSubClick: (parentIndex: number, index: number) => void;
};
