import React from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export interface GanttChartRowLabelsProps {
  dataset: IGanttChartRow[];
  width: number;
  height: number;
  rowHeight: number;
  dataType: 'label' | 'status';
  handleClick?: (rowIndex: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndex: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numOfRows: number;
}
export declare const GanttChartRowLabels: React.FC<GanttChartRowLabelsProps>;
