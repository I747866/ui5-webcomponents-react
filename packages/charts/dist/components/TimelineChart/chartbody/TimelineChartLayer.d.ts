import type { ReactNode } from 'react';
import React from 'react';
interface TimelineChartLayerProps {
  ignoreClick?: boolean;
  children?: ReactNode | ReactNode[];
  isAnnotation?: boolean;
  name?: string;
}
/**
 * The TimeLineChartLayer represents each layer of the chart rendering. This
 * is used to seperate the chart into different rendering concerns. One layer
 * can be used to render the grid lines and another can be used to render
 * annotations or tasks.
 */
declare const TimelineChartLayer: ({
  ignoreClick,
  isAnnotation,
  children,
  name
}: TimelineChartLayerProps) => React.JSX.Element;
export { TimelineChartLayer };
