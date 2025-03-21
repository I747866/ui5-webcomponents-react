import React from 'react';
import type { ColumnDataType, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export interface GanttChartRowLabelsProps {
  dataset: IGanttChartRow[];
  width: number;
  height: number;
  rowHeight: number;
  dataType: ColumnDataType;
  handleClick?: (rowIndex: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numOfRows: number;
}
export declare const GanttChartRowLabels: React.FC<GanttChartRowLabelsProps>;
