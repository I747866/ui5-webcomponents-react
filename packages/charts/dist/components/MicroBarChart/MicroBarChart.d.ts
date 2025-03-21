import type { CSSProperties } from 'react';
import React from 'react';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartDimension } from '../../interfaces/IChartDimension.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface MeasureConfig extends Omit<IChartMeasure, 'color'> {
  /**
   * array of any valid CSS Color or CSS Variable. Defaults to the `sapChart_OrderedColor_` colors
   */
  colors?: CSSProperties['color'][];
  /**
   * Bar Opacity
   * @default 1
   */
  opacity?: number;
  /**
   * Bar Width
   * @default auto
   */
  width?: number;
}
export interface MicroBarChartProps
  extends Omit<
    IChartBaseProps,
    | 'noLegend'
    | 'onLegendClick'
    | 'noAnimation'
    | 'chartConfig'
    | 'children'
    | 'tooltipConfig'
    | 'onClick'
    | 'measures'
    | 'dimensions'
  > {
  /**
   * A object which contains the configuration of the dimension.
   *
   * **Required Properties**
   * - `accessor`: string containing the path to the dataset key the dimension should display. Supports object structures by using <code>'parent.child'</code>.
   *   Can also be a getter.
   *
   * **Optional Properties**
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   *
   */
  dimension: IChartDimension;
  /**
   * An array of config objects. Each object is defining one bar in the chart.
   *
   * **Required properties**
   * - `accessor`: string containing the path to the dataset key this bar should display. Supports object structures by using <code>'parent.child'</code>.
   * Can also be a getter.
   *
   * **Optional properties**
   *
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   * - `colors`: array of any valid CSS Color or CSS Variable. Defaults to the `sapChart_OrderedColor_` colors
   * - `width`: bar width in pixel, defaults to `4`
   * - `opacity`: bar opacity, defaults to `1`
   * - `hideDataLabel`: flag whether the data labels should be hidden in the chart for this column.
   * - `DataLabel`: a custom component to be used for the data label
   */
  measure: MeasureConfig;
  /**
   * An optional number for the maxValue of the valueBar.
   * Default is the highest number of the corresponding accessor in the dataset.
   */
  maxValue?: number;
}
/**
 * The `MicroBarChart` compares different values of the same category to each other by displaying them in a compact way.
 */
declare const MicroBarChart: React.ForwardRefExoticComponent<MicroBarChartProps & React.RefAttributes<HTMLDivElement>>;
export { MicroBarChart };
