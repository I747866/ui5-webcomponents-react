import type { CSSProperties } from 'react';
import React from 'react';
import type { ReferenceLineProps } from 'recharts';
import type { ICartesianChartConfig } from '../../interfaces/ICartesianChartConfig.js';
import type { IChartBaseProps } from '../../interfaces/IChartBaseProps.js';
import type { IChartMeasure } from '../../interfaces/IChartMeasure.js';
interface MeasureConfig extends Omit<IChartMeasure, 'color' | 'hideDataLabel' | 'DataLabel'> {
  /**
   * Defines the axis of the measure
   */
  axis: 'x' | 'y' | 'z';
}
interface ScatterDataObject {
  /**
   * Defines label of the dataset
   */
  label?: string;
  /**
   * Contains the data of the chart
   */
  data?: Record<string, unknown>[];
  /**
   * Any valid CSS Color or CSS Variable. Defaults to the `sapChart_Ordinal` colors
   */
  color?: CSSProperties['color'];
  /**
   * Defines opacity of the displayed dataset
   * @default 1
   */
  opacity?: number;
}
interface IScatterChartConfig extends ICartesianChartConfig {
  referenceLineX?: {
    value?: number;
    color?: string;
  } & ReferenceLineProps;
}
export interface ScatterChartProps extends Omit<IChartBaseProps<IScatterChartConfig>, 'dataset'> {
  /**
   * An array of dataset objects. Each object defines a dataset which is displayed.
   *
   * **Required properties**
   *  - `data`: array of objects which contains the data.
   *
   * **Optional properties**
   *  - `label`: string containing the label of the dataset which is also displayed in the legend.
   *  - `color`: any valid CSS color or CSS variable. Defaults to the `sapChart_Ordinal` colors.
   *  - `opacity`: number contains value of opacity of dataset
   *
   * **Example of dataset:**
   *
   * <code>
   *   <pre>
   *    [
   *      {
   *       label: 'America',
   *       opacity: 0.7,
   *       data: [
   *         {
   *           users: 120,
   *           sessions: 200,
   *           volume: 302
   *         },
   *         {
   *           users: 20,
   *           sessions: 230,
   *           volume: 392
   *         }
   *       ]
   *      }
   *    ]
   *   </pre>
   * </code>
   */
  dataset?: ScatterDataObject[];
  /**
   * An array of config objects. Each object is defining one axis in the chart.
   *
   * **Required properties**
   *  - `accessor`: string containing the path to the dataset key this line should display. Supports object structures by using <code>'parent.child'</code>.
   *     Can also be a getter.
   *  - `axis`: string containing definition of axis. Must be x, y or z data to the axis.
   *
   * **Optional properties**
   *  - `label`: Label to display in tooltips. Falls back to the <code>accessor</code> if not present.
   *  - `formatter`: function will be called for each data label and allows you to format it according to your needs. Also addresses labels of axis.
   */
  measures?: MeasureConfig[];
}
/**
 *
 * A `ScatterChart` is a data visualization that displays multiple circles (bubbles) in a two-dimensional plot.
 *
 * Most commonly, a scatter chart displays the values of three numeric variables,where each observation's data is
 * shown by a circle, while the horizontal and vertical positions of the bubble show the values of two other variables.
 */
declare const ScatterChart: React.ForwardRefExoticComponent<ScatterChartProps & React.RefAttributes<HTMLDivElement>>;
export { ScatterChart };
