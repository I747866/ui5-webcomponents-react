import type { CommonProps } from '@ui5/webcomponents-react';
import type { CSSProperties } from 'react';
import React from 'react';
interface RadialChartConfig {
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  innerRadius?: number | string;
  outerRadius?: number | string;
  [rest: string]: any;
}
export interface RadialChartProps extends Omit<CommonProps, 'onClick' | 'children' | 'onLegendClick'> {
  /**
   * The actual value which defines how much the ring is filled.
   */
  value?: number;
  /**
   * The maximum value of the ring. If `value` >= `maxValue`, the ring will be filled to 100%.
   *
   * __Default:__ `100`.
   */
  maxValue?: number;
  /**
   * The value that should be displayed in the center of the `RadialChart`.
   */
  displayValue?: number | string;
  /**
   * Font size of the `displayValue`.
   *
   * __Default values:__
   *
   * - fontSize: `1.25rem`
   * - fill: `ThemingParameters.sapTextColor`
   */
  displayValueStyle?: CSSProperties;
  /**
   * A custom color you want to apply to the ring fill. This props accepts any valid CSS color or CSS variable.
   */
  color?: CSSProperties['color'];
  /**
   * `onDataPointClick` fires when the user clicks on the filled part of the ring.
   */
  onDataPointClick?: (
    event: CustomEvent<{
      value: number;
      payload: unknown;
      dataIndex: number;
    }>
  ) => void;
  /**
   * Fired when clicked anywhere in the chart.
   */
  onClick?: (
    event: CustomEvent<{
      payload: unknown;
      activePayloads: Record<string, unknown>[];
      dataIndex: number;
      value: number;
    }>
  ) => void;
  /**
   * `noAnimation` disables all chart animations when set to `true`.
   */
  noAnimation?: boolean;
  /**
   * Defines possible configurations of the internally used [RadialBarChart](https://recharts.org/en-US/api/RadialBarChart).
   *
   * __Note:__ It is possible to overwrite internally used props. Please use with caution!
   *
   * __Default values:__
   *
   * - margin: `{ top: 5, right: 5, bottom: 5, left: 5 }`
   * - innerRadius: `"90%"`
   * - outerRadius: `"100%"`
   */
  chartConfig?: RadialChartConfig;
}
/**
 * Displays a ring chart highlighting a current status.
 * The status can be emphasized by using the `color` prop.
 */
declare const RadialChart: React.ForwardRefExoticComponent<RadialChartProps & React.RefAttributes<HTMLDivElement>>;
export { RadialChart };
