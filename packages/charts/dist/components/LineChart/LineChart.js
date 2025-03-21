'use client';
import { enrichEventWithDetails, ThemingParameters, useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback, useRef } from 'react';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart as LineChartLib,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useChartMargin } from '../../hooks/useChartMargin.js';
import { useLabelFormatter } from '../../hooks/useLabelFormatter.js';
import { useLegendItemClick } from '../../hooks/useLegendItemClick.js';
import { useLongestYAxisLabel } from '../../hooks/useLongestYAxisLabel.js';
import { useObserveXAxisHeights } from '../../hooks/useObserveXAxisHeights.js';
import { usePrepareDimensionsAndMeasures } from '../../hooks/usePrepareDimensionsAndMeasures.js';
import { useTooltipFormatter } from '../../hooks/useTooltipFormatter.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { ChartDataLabel } from '../../internal/ChartDataLabel.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { tickLineConfig, tooltipContentStyle, tooltipFillOpacity, xAxisPadding } from '../../internal/staticProps.js';
import { resolvePrimaryAndSecondaryMeasures } from '../../internal/Utils.js';
import { XAxisTicks } from '../../internal/XAxisTicks.js';
import { YAxisTicks } from '../../internal/YAxisTicks.js';
import { LineChartPlaceholder } from './Placeholder.js';
const dimensionDefaults = {
  formatter: defaultFormatter
};
const measureDefaults = {
  formatter: defaultFormatter,
  width: 1,
  opacity: 1
};
/**
 * A `LineChart` is a type of chart used to show information that changes over time - it connects multiple dots.
 */
const LineChart = forwardRef((props, ref) => {
  const {
    dataset,
    loading,
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
    yAxisVisible: false,
    xAxisVisible: true,
    gridStroke: ThemingParameters.sapList_BorderColor,
    gridHorizontal: true,
    gridVertical: false,
    legendPosition: 'bottom',
    legendHorizontalAlign: 'left',
    zoomingTool: false,
    resizeDebounce: 250,
    yAxisTicksVisible: true,
    yAxisConfig: {},
    xAxisConfig: {},
    secondYAxisConfig: {},
    ...props.chartConfig
  };
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
  const labelFormatter = useLabelFormatter(primaryDimension);
  const [componentRef, chartRef] = useSyncRef(ref);
  const dataKeys = measures.map(({ accessor }) => accessor);
  const colorSecondY = chartConfig.secondYAxis
    ? dataKeys.findIndex((key) => key === chartConfig.secondYAxis?.dataKey)
    : 0;
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const preventOnClickCall = useRef(0);
  const onDataPointClickInternal = useCallback(
    (payload, eventOrIndex) => {
      if (eventOrIndex.dataKey && typeof onDataPointClick === 'function') {
        preventOnClickCall.current = 2;
        onDataPointClick(
          enrichEventWithDetails(
            {},
            {
              value: eventOrIndex.value,
              dataKey: eventOrIndex.dataKey,
              dataIndex: eventOrIndex.index,
              payload: eventOrIndex.payload
            }
          )
        );
      } else if (typeof onClick === 'function' && preventOnClickCall.current === 0) {
        onClick(
          enrichEventWithDetails(eventOrIndex, {
            payload: payload?.activePayload?.[0]?.payload,
            activePayloads: payload?.activePayload
          })
        );
      }
      if (preventOnClickCall.current > 0) {
        preventOnClickCall.current -= 1;
      }
    },
    [onDataPointClick, preventOnClickCall.current]
  );
  const isBigDataSet = dataset?.length > 30 ?? false;
  const primaryDimensionAccessor = primaryDimension?.accessor;
  const [yAxisWidth, legendPosition] = useLongestYAxisLabel(dataset, measures, chartConfig.legendPosition);
  const marginChart = useChartMargin(chartConfig.margin, chartConfig.zoomingTool);
  const xAxisHeights = useObserveXAxisHeights(chartRef, props.dimensions.length);
  const { chartConfig: _0, dimensions: _1, measures: _2, ...propsWithoutOmitted } = rest;
  const isRTL = useIsRTL(chartRef);
  const referenceLine = chartConfig.referenceLine;
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      loading: loading,
      Placeholder: ChartPlaceholder ?? LineChartPlaceholder,
      ref: componentRef,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      LineChartLib,
      {
        syncId: syncId,
        margin: marginChart,
        data: dataset,
        onClick: onDataPointClickInternal,
        className: typeof onDataPointClick === 'function' ? 'has-click-handler' : undefined
      },
      React.createElement(CartesianGrid, {
        vertical: chartConfig.gridVertical,
        horizontal: chartConfig.gridHorizontal,
        stroke: chartConfig.gridStroke
      }),
      dimensions.map((dimension, index) => {
        return React.createElement(XAxis, {
          key: dimension.accessor,
          dataKey: dimension.accessor,
          xAxisId: index,
          interval: dimension?.interval ?? (isBigDataSet ? 'preserveStart' : 0),
          tick: React.createElement(XAxisTicks, { config: dimension }),
          tickLine: index < 1,
          axisLine: index < 1,
          height: chartConfig.xAxisVisible ? xAxisHeights[index] : 0,
          padding: xAxisPadding,
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
        tickFormatter: primaryMeasure?.formatter,
        interval: 0,
        tick: chartConfig.yAxisTicksVisible && React.createElement(YAxisTicks, { config: primaryMeasure }),
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
      measures.map((element, index) => {
        return React.createElement(Line, {
          dot: element.showDot ?? !isBigDataSet,
          yAxisId: chartConfig.secondYAxis?.dataKey === element.accessor ? 'right' : 'left',
          key: element.accessor,
          name: element.label ?? element.accessor,
          strokeOpacity: element.opacity,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: isBigDataSet
            ? false
            : React.createElement(ChartDataLabel, { config: element, chartType: 'line', position: 'top' }),
          type: 'monotone',
          dataKey: element.accessor,
          stroke: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
          strokeWidth: element.width,
          activeDot: { onClick: onDataPointClickInternal },
          isAnimationActive: noAnimation === false,
          ...element.lineConfig
        });
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
LineChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
LineChart.displayName = 'LineChart';
export { LineChart };
