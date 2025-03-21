'use client';
import { enrichEventWithDetails, ThemingParameters, useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback } from 'react';
import {
  Bar,
  BarChart as BarChartLib,
  Brush,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { getValueByDataKey } from 'recharts/lib/util/ChartUtils.js';
import { useCancelAnimationFallback } from '../../hooks/useCancelAnimationFallback.js';
import { useChartMargin } from '../../hooks/useChartMargin.js';
import { useLabelFormatter } from '../../hooks/useLabelFormatter.js';
import { useLegendItemClick } from '../../hooks/useLegendItemClick.js';
import { useLongestYAxisLabelBar } from '../../hooks/useLongestYAxisLabelBar.js';
import { useObserveXAxisHeights } from '../../hooks/useObserveXAxisHeights.js';
import { useOnClickInternal } from '../../hooks/useOnClickInternal.js';
import { usePrepareDimensionsAndMeasures } from '../../hooks/usePrepareDimensionsAndMeasures.js';
import { useTooltipFormatter } from '../../hooks/useTooltipFormatter.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { ChartDataLabel } from '../../internal/ChartDataLabel.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { tickLineConfig, tooltipContentStyle, tooltipFillOpacity } from '../../internal/staticProps.js';
import { getCellColors, resolvePrimaryAndSecondaryMeasures } from '../../internal/Utils.js';
import { XAxisTicks } from '../../internal/XAxisTicks.js';
import { YAxisTicks } from '../../internal/YAxisTicks.js';
import { BarChartPlaceholder } from './Placeholder.js';
const dimensionDefaults = {
  formatter: defaultFormatter
};
const measureDefaults = {
  formatter: defaultFormatter,
  opacity: 1
};
const valueAccessor =
  (attribute) =>
  ({ payload }) => {
    return getValueByDataKey(payload, attribute);
  };
/**
 * A `BarChart` is a data visualization where each category is represented by a rectangle, with the width of the rectangle being proportional to the values being plotted.
 */
const BarChart = forwardRef((props, ref) => {
  const {
    loading,
    dataset,
    noLegend,
    noAnimation,
    tooltipConfig,
    onDataPointClick,
    onLegendClick,
    onClick,
    style,
    className,
    slot,
    syncId,
    ChartPlaceholder,
    children,
    ...rest
  } = props;
  const chartConfig = {
    margin: {},
    yAxisVisible: true,
    xAxisVisible: true,
    gridStroke: ThemingParameters.sapList_BorderColor,
    gridHorizontal: true,
    gridVertical: false,
    legendPosition: 'bottom',
    legendHorizontalAlign: 'left',
    barGap: 3,
    zoomingTool: false,
    resizeDebounce: 250,
    yAxisConfig: {},
    xAxisConfig: {},
    secondXAxisConfig: {},
    ...props.chartConfig
  };
  const referenceLine = chartConfig.referenceLine;
  const { dimensions, measures } = usePrepareDimensionsAndMeasures(
    props.dimensions,
    props.measures,
    dimensionDefaults,
    measureDefaults
  );
  const tooltipValueFormatter = useTooltipFormatter(measures);
  const primaryDimension = dimensions[0];
  const { primaryMeasure, secondaryMeasure } = resolvePrimaryAndSecondaryMeasures(
    measures,
    chartConfig?.secondYAxis?.dataKey
  );
  const dataKeys = measures.map(({ accessor }) => accessor);
  const colorSecondY = chartConfig.secondYAxis
    ? dataKeys.findIndex((key) => key === chartConfig.secondYAxis?.dataKey)
    : 0;
  const [componentRef, chartRef] = useSyncRef(ref);
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const labelFormatter = useLabelFormatter(primaryDimension);
  const onDataPointClickInternal = useCallback(
    (payload, i, event) => {
      if (payload && onDataPointClick) {
        const value = payload.value.length ? payload.value[1] - payload.value[0] : payload.value;
        onDataPointClick(
          enrichEventWithDetails(event, {
            dataKey: Object.keys(payload)
              .filter((key) => key !== 'value')
              .find((key) => payload[key] === value),
            value,
            payload: payload.payload,
            dataIndex: i
          })
        );
      }
    },
    [onDataPointClick]
  );
  const onClickInternal = useOnClickInternal(onClick);
  const isBigDataSet = dataset?.length > 30;
  const primaryDimensionAccessor = primaryDimension?.accessor;
  const [width, legendPosition] = useLongestYAxisLabelBar(dataset, dimensions, chartConfig.legendPosition);
  const marginChart = useChartMargin(chartConfig.margin, chartConfig.zoomingTool);
  const [xAxisHeight] = useObserveXAxisHeights(chartRef, 1);
  const isRTL = useIsRTL(chartRef);
  const { isMounted, handleBarAnimationStart, handleBarAnimationEnd } = useCancelAnimationFallback(noAnimation);
  const { chartConfig: _0, dimensions: _1, measures: _2, ...propsWithoutOmitted } = rest;
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      loading: loading,
      Placeholder: ChartPlaceholder ?? BarChartPlaceholder,
      ref: componentRef,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      BarChartLib,
      {
        syncId: syncId,
        onClick: onClickInternal,
        stackOffset: 'sign',
        margin: marginChart,
        layout: 'vertical',
        data: dataset,
        barGap: chartConfig.barGap,
        className:
          typeof onDataPointClick === 'function' || typeof onClick === 'function' ? 'has-click-handler' : undefined
      },
      React.createElement(CartesianGrid, {
        vertical: chartConfig.gridVertical,
        horizontal: chartConfig.gridHorizontal,
        stroke: chartConfig.gridStroke
      }),
      chartConfig.xAxisVisible &&
        React.createElement(XAxis, {
          interval: 0,
          type: 'number',
          tick: React.createElement(XAxisTicks, { config: primaryMeasure }),
          axisLine: chartConfig.xAxisVisible,
          tickLine: tickLineConfig,
          tickFormatter: primaryMeasure?.formatter,
          height: xAxisHeight,
          reversed: isRTL,
          ...chartConfig.xAxisConfig
        }),
      chartConfig.secondYAxis?.dataKey &&
        React.createElement(XAxis, {
          dataKey: chartConfig.secondYAxis.dataKey,
          axisLine: {
            stroke: chartConfig.secondYAxis.color ?? `var(--sapChart_OrderedColor_${(colorSecondY % 11) + 1})`
          },
          tick: React.createElement(XAxisTicks, {
            config: secondaryMeasure,
            secondYAxisConfig: {
              color: chartConfig.secondYAxis.color ?? `var(--sapChart_OrderedColor_${(colorSecondY % 11) + 1})`
            }
          }),
          tickLine: {
            stroke: chartConfig.secondYAxis.color ?? `var(--sapChart_OrderedColor_${(colorSecondY % 11) + 1})`
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: { value: chartConfig.secondYAxis.name, offset: 2, angle: +90, position: 'center' },
          orientation: 'top',
          interval: 0,
          xAxisId: 'secondary',
          type: 'number',
          ...chartConfig.secondXAxisConfig
        }),
      chartConfig.yAxisVisible &&
        dimensions.map((dimension, index) => {
          return React.createElement(YAxis, {
            interval: dimension?.interval ?? (isBigDataSet ? 'preserveStart' : 0),
            type: 'category',
            key: dimension.accessor,
            dataKey: dimension.accessor,
            tick: React.createElement(YAxisTicks, { config: dimension }),
            tickLine: index < 1,
            axisLine: index < 1,
            yAxisId: index,
            width: width[index],
            allowDuplicatedCategory: index === 0,
            orientation: isRTL ? 'right' : 'left',
            ...chartConfig.yAxisConfig
          });
        }),
      isMounted &&
        measures.map((element, index) => {
          return React.createElement(
            Bar,
            {
              stackId: element.stackId,
              fillOpacity: element.opacity,
              key: element.accessor,
              name: element.label ?? element.accessor,
              strokeOpacity: element.opacity,
              type: 'monotone',
              dataKey: element.accessor,
              fill: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
              stroke: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
              barSize: element.width,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onClick: onDataPointClickInternal,
              isAnimationActive: noAnimation === false,
              onAnimationStart: handleBarAnimationStart,
              onAnimationEnd: handleBarAnimationEnd
            },
            React.createElement(LabelList, {
              data: dataset,
              valueAccessor: valueAccessor(element.accessor),
              content: React.createElement(ChartDataLabel, {
                config: element,
                chartType: 'bar',
                position: 'insideRight'
              })
            }),
            dataset.map((data, i) => {
              return React.createElement(Cell, {
                key: i,
                fill: getCellColors(element, data, index),
                stroke: getCellColors(element, data, index)
              });
            })
          );
        }),
      !noLegend &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        React.createElement(Legend, {
          verticalAlign: chartConfig.legendPosition,
          align: chartConfig.legendHorizontalAlign,
          onClick: onItemLegendClick,
          wrapperStyle: legendPosition
        }),
      referenceLine &&
        React.createElement(ReferenceLine, {
          ...referenceLine,
          stroke: referenceLine?.color ?? referenceLine?.stroke,
          x: referenceLine?.value ?? referenceLine?.x,
          label: referenceLine?.label
        }),
      tooltipConfig?.active !== false &&
        React.createElement(Tooltip, {
          cursor: tooltipFillOpacity,
          formatter: tooltipValueFormatter,
          contentStyle: tooltipContentStyle,
          labelFormatter: labelFormatter,
          ...tooltipConfig
        }),
      chartConfig.zoomingTool &&
        React.createElement(Brush, {
          y: 10,
          dataKey: primaryDimensionAccessor,
          tickFormatter: primaryDimension?.formatter,
          stroke: ThemingParameters.sapObjectHeader_BorderColor,
          travellerWidth: 10,
          height: 20
        }),
      children
    )
  );
});
BarChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
BarChart.displayName = 'BarChart';
export { BarChart };
