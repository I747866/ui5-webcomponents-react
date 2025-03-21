'use client';
import { ThemingParameters, useIsomorphicId } from '@ui5/webcomponents-react-base';
import React, { forwardRef } from 'react';
import { useLongestYAxisLabel } from '../../hooks/useLongestYAxisLabel.js';
import { usePrepareDimensionsAndMeasures } from '../../hooks/usePrepareDimensionsAndMeasures.js';
import { usePrepareTrendMeasures } from '../../hooks/usePrepareTrendMeasures.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { ComposedChart } from '../ComposedChart/index.js';
import { ColumnChartWithTrendPlaceholder } from './Placeholder.js';
const dimensionDefaults = {
  formatter: defaultFormatter
};
const measureDefaults = {
  formatter: defaultFormatter,
  opacity: 1
};
const lineTooltipConfig = { wrapperStyle: { visibility: 'hidden' } };
/**
 * A `ColumnChartWithTrend` is a data visualization where each category is represented by a rectangle, with the height of the rectangle being proportional to the values being plotted amd a trend line which is displayed above the column chart.
 */
const ColumnChartWithTrend = forwardRef((props, ref) => {
  const {
    loading,
    dataset,
    style,
    className,
    slot,
    onClick,
    noLegend,
    noAnimation,
    onDataPointClick,
    onLegendClick,
    ChartPlaceholder,
    ...rest
  } = props;
  const syncId = useIsomorphicId();
  const chartConfig = {
    yAxisVisible: false,
    xAxisVisible: true,
    gridStroke: ThemingParameters.sapList_BorderColor,
    gridHorizontal: true,
    gridVertical: false,
    legendPosition: 'bottom',
    legendHorizontalAlign: 'left',
    barGap: 3,
    zoomingTool: false,
    resizeDebounce: 250,
    ...props.chartConfig
  };
  const { dimensions, measures } = usePrepareDimensionsAndMeasures(
    props.dimensions,
    props.measures,
    dimensionDefaults,
    measureDefaults
  );
  const { lineMeasures, columnMeasures, columnDataset } = usePrepareTrendMeasures(measures, dataset);
  const [yAxisWidth] = useLongestYAxisLabel(columnDataset, columnMeasures, chartConfig.legendPosition);
  const columnTooltipConfig = {
    formatter: (value, name, tooltipProps) => {
      const line = lineMeasures.find(
        (currLine) => currLine.type === 'line' && currLine.accessor === tooltipProps.dataKey
      );
      if (line) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return line.formatter(tooltipProps.payload[`__${line.accessor}`]);
      }
      const column = columnMeasures.find((currLine) => currLine.accessor === tooltipProps.dataKey);
      return column.formatter(value, name, tooltipProps);
    }
  };
  const { chartConfig: _0, dimensions: _1, measures: _2, tooltipConfig: _3, ...propsWithoutOmitted } = rest;
  return React.createElement(
    'div',
    {
      ref: ref,
      style: { display: 'flex', flexDirection: 'column', height: style?.height, width: style?.width, ...style },
      className: className,
      slot: slot,
      ...propsWithoutOmitted
    },
    dataset?.length !== 0 &&
      React.createElement(ComposedChart, {
        className:
          typeof onDataPointClick === 'function' || typeof onClick === 'function' ? 'has-click-handler' : undefined,
        tooltipConfig: lineTooltipConfig,
        noAnimation: noAnimation,
        loading: loading,
        onClick: onClick,
        syncId: syncId,
        style: { ...style, height: `calc(${style?.height} * 0.2)` },
        dataset: dataset,
        measures: lineMeasures,
        dimensions: dimensions,
        noLegend: true,
        onDataPointClick: onDataPointClick,
        chartConfig: {
          xAxisVisible: false,
          yAxisVisible: false,
          yAxisTicksVisible: false,
          gridHorizontal: false,
          yAxisLabelsVisible: false,
          yAxisWidth
        }
      }),
    React.createElement(ComposedChart, {
      onLegendClick: onLegendClick,
      tooltipConfig: columnTooltipConfig,
      noAnimation: noAnimation,
      noLegend: noLegend,
      loading: loading,
      onClick: onClick,
      onDataPointClick: onDataPointClick,
      syncId: syncId,
      ChartPlaceholder: ChartPlaceholder ?? ColumnChartWithTrendPlaceholder,
      dataset: columnDataset,
      measures: columnMeasures,
      dimensions: dimensions,
      chartConfig: chartConfig,
      style: { ...style, height: `calc(${style?.height} * ${dataset?.length !== 0 ? 0.8 : 1})` },
      className:
        typeof onDataPointClick === 'function' || typeof onClick === 'function' ? 'has-click-handler' : undefined
    })
  );
});
ColumnChartWithTrend.defaultProps = {
  noLegend: false,
  noAnimation: false
};
ColumnChartWithTrend.displayName = 'ColumnChartWithTrend';
export { ColumnChartWithTrend };
