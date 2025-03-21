import type { CSSProperties } from 'react';
import React from 'react';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartDimension } from '../../interfaces/IChartDimension.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
import type { IPolarChartConfig } from '../../interfaces/IPolarChartConfig.js';
interface MeasureConfig extends Omit<IChartMeasure, 'accessor' | 'label' | 'color' | 'hideDataLabel'> {
  /**
   * A string containing the path to the dataset key this pie should display.
   * Supports object structures by using `'parent.child'`. Can also be a getter.
   */
  accessor: string;
  /**
   * array of any valid CSS Color or CSS Variable. Defaults to the `sapChart_OrderedColor_` colors
   */
  colors?: CSSProperties['color'][];
  /**
   * Flag whether the data labels should be hidden in the chart for this segment.
   * When passed a function it will be called for each data label with the corresponding chart properties.
   */
  hideDataLabel?: boolean | ((chartConfig: any) => boolean);
}
export interface PieChartProps extends Omit<IChartBaseProps<IPolarChartConfig>, 'dimensions' | 'measures'> {
  /**
   * A label to display in the center of the `PieChart`.
   * If you use this prop to display a text, we recommend to increase `chartConfig.innerRadius` to have some free
   * space for the text.
   */
  centerLabel?: string;
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
   * A object which contains the configuration of the measure. The object is defining one pie in the chart.
   *
   * **Required properties**
   * - `accessor`: string containing the path to the dataset key this pie should display. Supports object structures by using <code>'parent.child'</code>.
   *
   * **Optional properties**
   *
   * - `formatter`: function will be called for each data label and allows you to format it according to your needs
   * - `DataLabel`: a custom component to be used for the data label
   * - `colors`: array of any valid CSS Color or CSS Variable. Defaults to the `sapChart_OrderedColor_` colors
   * - `hideDataLabel`: flag whether the data labels should be hidden in the chart for this segment. When passed a function it will be called for each data label with the corresponding chart properties.
   */
  measure: MeasureConfig;
}
/**
 * A Pie Chart is a type of graph that displays data in a circular graph.
 * The pieces of the graph are proportional to the fraction of the whole in each category.
 *
 * In other words, each slice of the pie is relative to the size of that category in the group as a whole.
 * The entire “pie” represents 100 percent of a whole, while the pie “slices” represent portions of the whole.
 */
declare const PieChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<HTMLDivElement>>;
export { PieChart };
