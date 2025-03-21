import React from 'react';
import type { LineProps } from 'recharts';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartDimension } from '../../interfaces/IChartDimension.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface MeasureConfig extends IChartMeasure {
  /**
   * Line Width
   * @default 1
   */
  width?: number;
  /**
   * Line Opacity
   * @default 1
   */
  opacity?: number;
  /**
   * Flag whether the line dot should be displayed or not.
   */
  showDot?: boolean;
  /**
   * This prop allows passing all [Line Properties](https://recharts.org/en-US/api/Line) of the Recharts library.
   *
   * __Note:__ It is possible to overwrite internal implementations. Please use with caution!
   */
  lineConfig?: LineProps;
}
interface DimensionConfig extends IChartDimension {
  interval?: number;
}
export interface LineChartProps extends IChartBaseProps {
  /**
   * An array of config objects. Each object will define one dimension of the chart.
   *
   * **Required Properties**
   * - `accessor`: string containing the path to the dataset key the dimension should display. Supports object structures by using <code>'parent.child'</code>.
   *   Can also be a getter.
   *
   * **Optional Properties**
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   * - `interval`: number that controls how many ticks are rendered on the x axis
   *
   */
  dimensions: DimensionConfig[];
  /**
   * An array of config objects. Each object is defining one line in the chart.
   *
   * **Required properties**
   * - `accessor`: string containing the path to the dataset key this line should display. Supports object structures by using <code>'parent.child'</code>.
   *   Can also be a getter.
   *
   * **Optional properties**
   *
   * - `label`: Label to display in legends or tooltips. Falls back to the <code>accessor</code> if not present.
   * - `color`: any valid CSS Color or CSS Variable. Defaults to the `sapChart_Ordinal` colors
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   * - `hideDataLabel`: flag whether the data labels should be hidden in the chart for this line.
   * - `DataLabel`: a custom component to be used for the data label
   * - `width`: line width, defaults to `1`
   * - `opacity`: line opacity, defaults to `1`
   * - `showDot`: Flag whether the line dot should be displayed or not.
   * - `lineConfig`: This prop allows passing all [Line Properties](https://recharts.org/en-US/api/Line) of the Recharts library.
   *
   */
  measures: MeasureConfig[];
}
/**
 * A `LineChart` is a type of chart used to show information that changes over time - it connects multiple dots.
 */
declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<HTMLDivElement>>;
export { LineChart };
