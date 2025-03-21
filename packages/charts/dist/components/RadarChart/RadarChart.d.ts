import React from 'react';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartDimension } from '../../interfaces/IChartDimension.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface MeasureConfig extends IChartMeasure {
  /**
   * Opacity
   */
  opacity?: number;
}
export interface RadarChartProps extends IChartBaseProps {
  /**
   * An array of config objects. Each object will define one dimension of the chart.
   *
   * **Required Properties*
   * - `accessor`: string containing the path to the dataset key the dimension should display. Supports object structures by using <code>'parent.child'</code>.
   *   Can also be a getter.
   *
   * **Optional Properties**
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   *
   */
  dimensions: IChartDimension[];
  /**
   * An array of config objects. Each object is defining one radar in the chart.
   *
   * **Required properties**
   * - `accessor`: string containing the path to the dataset key this radar should display. Supports object structures by using <code>'parent.child'</code>.
   *   Can also be a getter.
   *
   * **Optional properties**
   *
   * - `label`: Label to display in legends or tooltips. Falls back to the <code>accessor</code> if not present.
   * - `color`: any valid CSS Color or CSS Variable. Defaults to the `sapChart_Ordinal` colors
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   * - `hideDataLabel`: flag whether the data labels should be hidden in the chart for this radar.
   * - `DataLabel`: a custom component to be used for the data label
   * - `opacity`: radar opacity, defaults to `0.5`
   *
   */
  measures: MeasureConfig[];
}
/**
 * A radar or spider or web chart is a two-dimensional chart type designed to plot one or more series of values over multiple quantitative variables.
 */
declare const RadarChart: React.ForwardRefExoticComponent<RadarChartProps & React.RefAttributes<HTMLDivElement>>;
export { RadarChart };
