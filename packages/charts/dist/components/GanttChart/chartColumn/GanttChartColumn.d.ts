import React from 'react';
import type { ColumnDataType, IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
export interface GanttChartColumnProps {
  height: number;
  width: number;
  columnTitle: string;
  rowHeight: number;
  dataset: IGanttChartRow[];
  dataType: ColumnDataType;
  handleClick?: (index: number) => void;
  handleSubClick?: (parentIndex: number, index: number) => void;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  numberOfRows: number;
  showStatus?: boolean;
}
export declare const GanttChartColumn: (props: GanttChartColumnProps) => React.JSX.Element;
