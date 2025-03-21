'use client';
import { enrichEventWithDetails, ThemingParameters, useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback } from 'react';
import {
  Bar as Column,
  BarChart as ColumnChartLib,
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
import { useLongestYAxisLabel } from '../../hooks/useLongestYAxisLabel.js';
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
import { ColumnChartPlaceholder } from './Placeholder.js';
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
 * A `ColumnChart` is a data visualization where each category is represented by a rectangle, with the height of the rectangle being proportional to the values being plotted.
 */
const ColumnChart = forwardRef((props, ref) => {
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
    ChartPlaceholder,
    syncId,
    children,
    ...rest
  } = props;
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
    yAxisConfig: {},
    xAxisConfig: {},
    secondYAxisConfig: {},
    ...props.chartConfig
  };
  const { referenceLine } = chartConfig;
  const { dimensions, measures } = usePrepareDimensionsAndMeasures(
    props.dimensions,
    props.measures,
    dimensionDefaults,
    measureDefaults
  );
  const tooltipValueFormatter = useTooltipFormatter(measures);
  const [yAxisWidth, legendPosition] = useLongestYAxisLabel(dataset, measures, chartConfig.legendPosition);
  const primaryDimension = dimensions[0];
  const { primaryMeasure, secondaryMeasure } = resolvePrimaryAndSecondaryMeasures(
    measures,
    chartConfig?.secondYAxis?.dataKey
  );
  const labelFormatter = useLabelFormatter(primaryDimension);
  const [componentRef, chartRef] = useSyncRef(ref);
  const dataKeys = measures.map(({ accessor }) => accessor);
  const colorSecondY = chartConfig.secondYAxis
    ? dataKeys.findIndex((key) => key === chartConfig.secondYAxis?.dataKey)
    : 0;
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const onDataPointClickInternal = useCallback(
    (payload, eventOrIndex, event) => {
      if (payload && onDataPointClick) {
        onDataPointClick(
          enrichEventWithDetails(event, {
            dataKey: Object.keys(payload).filter((key) =>
              payload.value.length
                ? payload[key] === payload.value[1] - payload.value[0]
                : payload[key] === payload.value && key !== 'value'
            )[0],
            value: payload.value.length ? payload.value[1] - payload.value[0] : payload.value,
            dataIndex: eventOrIndex,
            payload: payload.payload
          })
        );
      }
    },
    [onDataPointClick]
  );
  const onClickInternal = useOnClickInternal(onClick);
  const isBigDataSet = dataset?.length > 30 ?? false;
  const primaryDimensionAccessor = primaryDimension?.accessor;
  const marginChart = useChartMargin(chartConfig.margin, chartConfig.zoomingTool);
  const xAxisHeights = useObserveXAxisHeights(chartRef, props.dimensions.length);
  const isRTL = useIsRTL(chartRef);
  const { chartConfig: _0, dimensions: _1, measures: _2, ...propsWithoutOmitted } = rest;
  const { isMounted, handleBarAnimationStart, handleBarAnimationEnd } = useCancelAnimationFallback(noAnimation);
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      loading: loading,
      Placeholder: ChartPlaceholder ?? ColumnChartPlaceholder,
      ref: componentRef,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      ColumnChartLib,
      {
        syncId: syncId,
        onClick: onClickInternal,
        stackOffset: 'sign',
        margin: marginChart,
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
        dimensions.map((dimension, index) => {
          return React.createElement(XAxis, {
            key: dimension.accessor,
            dataKey: dimension.accessor,
            xAxisId: index,
            interval: dimension?.interval ?? (isBigDataSet ? 'preserveStart' : 0),
            tick: React.createElement(XAxisTicks, { config: dimension }),
            tickLine: index < 1,
            axisLine: index < 1,
            height: xAxisHeights[index],
            allowDuplicatedCategory: index === 0,
            reversed: isRTL,
            ...chartConfig.xAxisConfig
          });
        }),
      React.createElement(YAxis, {
        orientation: isRTL === true ? 'right' : 'left',
        axisLine: chartConfig.yAxisVisible,
        tickLine: tickLineConfig,
        yAxisId: 'left',
        interval: 0,
        tick: React.createElement(YAxisTicks, { config: primaryMeasure }),
        width: yAxisWidth,
        ...chartConfig.yAxisConfig
      }),
      chartConfig.secondYAxis?.dataKey &&
        React.createElement(YAxis, {
          dataKey: chartConfig.secondYAxis.dataKey,
          axisLine: {
            stroke: chartConfig.secondYAxis.color ?? `var(--sapChart_OrderedColor_${(colorSecondY % 11) + 1})`
          },
          tick: React.createElement(YAxisTicks, {
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
          orientation: isRTL === true ? 'left' : 'right',
          yAxisId: 'right',
          interval: 0,
          ...chartConfig.secondYAxisConfig
        }),
      isMounted &&
        measures.map((element, index) => {
          return React.createElement(
            Column,
            {
              yAxisId: chartConfig.secondYAxis?.dataKey === element.accessor ? 'right' : 'left',
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
                chartType: 'column',
                position: 'insideTop'
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
          y: referenceLine?.value ?? referenceLine?.y,
          yAxisId: referenceLine?.yAxisId ?? 'left',
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
ColumnChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
ColumnChart.displayName = 'ColumnChart';
export { ColumnChart };
