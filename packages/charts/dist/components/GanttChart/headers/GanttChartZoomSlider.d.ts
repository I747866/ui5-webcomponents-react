import React from 'react';
import type { DimensionsState } from '../types/GanttChartTypes.js';
import '@ui5/webcomponents-icons/dist/zoom-out.js';
import '@ui5/webcomponents-icons/dist/zoom-in.js';
import '@ui5/webcomponents-icons/dist/legend.js';
export interface GanttChartZoomSliderProps {
  dimensions: DimensionsState;
  resetScroll: () => void;
  onScale: (x: number) => void;
  onLegendClick: (event: React.MouseEvent) => void;
}
export declare const GanttChartZoomSlider: (props: GanttChartZoomSliderProps) => React.JSX.Element;
