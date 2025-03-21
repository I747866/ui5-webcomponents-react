import type { CommonProps } from '@ui5/webcomponents-react';
import type { ReactNode } from 'react';
import React from 'react';
import type { DateRange, IGanttChartRow, IGanttChartEvent, IGanttChartTask } from './types/GanttChartTypes.js';
export interface GanttChartProps extends CommonProps {
  dataset?: IGanttChartRow[];
  contractDuration: DateRange;
  rowHeight?: number;
  annotations?: ReactNode | ReactNode[];
  onTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  onLegendClick?: (event: React.MouseEvent) => void;
  onScaleChange?: (scale: number) => void;
  showAnnotation?: boolean;
  showStatus?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: string;
  shouldEventsBeGrouped?: boolean;
}
declare const GanttChart: React.ForwardRefExoticComponent<GanttChartProps & React.RefAttributes<HTMLDivElement>>;
export { GanttChart };
