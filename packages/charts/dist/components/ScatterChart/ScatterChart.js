'use client';
import { enrichEventWithDetails, ThemingParameters, useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback, useRef } from 'react';
import {
  CartesianGrid,
  Legend,
  ReferenceLine,
  Scatter,
  ScatterChart as ScatterChartLib,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';
import { useChartMargin } from '../../hooks/useChartMargin.js';
import { useLegendItemClick } from '../../hooks/useLegendItemClick.js';
import { useLongestYAxisLabel } from '../../hooks/useLongestYAxisLabel.js';
import { useObserveXAxisHeights } from '../../hooks/useObserveXAxisHeights.js';
import { usePrepareDimensionsAndMeasures } from '../../hooks/usePrepareDimensionsAndMeasures.js';
import { useTooltipFormatter } from '../../hooks/useTooltipFormatter.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { tickLineConfig, tooltipContentStyle, tooltipFillOpacity, xAxisPadding } from '../../internal/staticProps.js';
import { XAxisTicks } from '../../internal/XAxisTicks.js';
import { YAxisTicks } from '../../internal/YAxisTicks.js';
import { ScatterChartPlaceholder } from './Placeholder.js';
const measureDefaults = {
  formatter: defaultFormatter
};
/**
 *
 * A `ScatterChart` is a data visualization that displays multiple circles (bubbles) in a two-dimensional plot.
 *
 * Most commonly, a scatter chart displays the values of three numeric variables,where each observation's data is
 * shown by a circle, while the horizontal and vertical positions of the bubble show the values of two other variables.
 */
const ScatterChart = forwardRef((props, ref) => {
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
    ...props.chartConfig
  };
  const { referenceLine, referenceLineX } = chartConfig;
  const { measures } = usePrepareDimensionsAndMeasures([], props.measures, {}, measureDefaults);
  const tooltipValueFormatter = useTooltipFormatter(measures);
  const [componentRef, chartRef] = useSyncRef(ref);
  const preventOnClickCall = useRef(false);
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const onClickInternal = useCallback(
    (payload, event) => {
      if (typeof onClick === 'function' && !preventOnClickCall.current) {
        onClick(
          enrichEventWithDetails(event, {
            payload: payload?.activePayload?.[0]?.payload,
            activePayloads: payload?.activePayload
          })
        );
      }
      if (preventOnClickCall.current) {
        preventOnClickCall.current = false;
      }
    },
    [onClick, preventOnClickCall.current]
  );
  const onDataPointClickInternal = useCallback(
    (payload, eventOrIndex, event) => {
      if (payload && onDataPointClick) {
        onDataPointClick(
          enrichEventWithDetails(event, {
            value: payload.node,
            dataKey: payload.zAxis.dataKey,
            dataIndex: eventOrIndex,
            payload: payload.payload
          })
        );
        preventOnClickCall.current = true;
      }
    },
    [onDataPointClick, preventOnClickCall.current]
  );
  const isBigDataSet = dataset?.length > 30 ?? false;
  const xMeasure = measures.find(({ axis }) => axis === 'x');
  const yMeasure = measures.find(({ axis }) => axis === 'y');
  const zMeasure = measures.find(({ axis }) => axis === 'z');
  const [yAxisWidth, legendPosition] = useLongestYAxisLabel(dataset?.[0]?.data, [yMeasure], chartConfig.legendPosition);
  const xAxisHeights = useObserveXAxisHeights(chartRef, 1);
  const marginChart = useChartMargin(chartConfig.margin, chartConfig.zoomingTool);
  const { chartConfig: _0, measures: _1, ...propsWithoutOmitted } = rest;
  const isRTL = useIsRTL(chartRef);
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      loading: loading,
      Placeholder: ChartPlaceholder ?? ScatterChartPlaceholder,
      ref: componentRef,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      ScatterChartLib,
      {
        onClick: onClickInternal,
        margin: marginChart,
        className: typeof onDataPointClick === 'function' ? 'has-click-handler' : undefined
      },
      React.createElement(CartesianGrid, {
        vertical: chartConfig.gridVertical,
        horizontal: chartConfig.gridHorizontal,
        stroke: chartConfig.gridStroke
      }),
      chartConfig.xAxisVisible &&
        React.createElement(XAxis, {
          type: 'number',
          key: xMeasure?.accessor,
          name: xMeasure?.label,
          dataKey: xMeasure?.accessor,
          xAxisId: 0,
          interval: xMeasure?.interval ?? (isBigDataSet ? 'preserveStart' : 0),
          tick: React.createElement(XAxisTicks, { config: xMeasure }),
          padding: xAxisPadding,
          height: xAxisHeights[0],
          reversed: isRTL,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: xMeasure?.label ? { value: xMeasure?.label, dy: 15, position: 'insideRight' } : 0
        }),
      React.createElement(
        YAxis,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: yMeasure?.label
            ? { value: yMeasure?.label, angle: -90, position: isRTL ? 'insideRight' : 'insideLeft' }
            : false,
          type: 'number',
          name: yMeasure?.label,
          axisLine: chartConfig.yAxisVisible,
          tickLine: tickLineConfig,
          key: yMeasure?.accessor,
          dataKey: yMeasure?.accessor,
          tickFormatter: yMeasure?.formatter,
          interval: 0,
          tick: React.createElement(YAxisTicks, { config: yMeasure }),
          width: yMeasure?.label ? yAxisWidth + 10 : yAxisWidth,
          margin: yMeasure?.label ? { left: 200 } : 0,
          orientation: isRTL === true ? 'right' : 'left'
        }
      ),
      React.createElement(ZAxis, {
        name: zMeasure?.label,
        dataKey: zMeasure?.accessor,
        range: [0, 5000],
        key: zMeasure?.accessor
      }),
      dataset?.map((dataSet, index) => {
        return React.createElement(Scatter, {
          className: typeof onDataPointClick === 'function' ? 'has-click-handler' : undefined,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onMouseDown: onDataPointClickInternal,
          opacity: dataSet.opacity,
          data: dataSet?.data,
          name: dataSet?.label,
          key: dataSet?.label,
          fill: dataSet?.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
          isAnimationActive: noAnimation === false
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
          label: referenceLine?.label
        }),
      referenceLineX &&
        React.createElement(ReferenceLine, {
          ...referenceLineX,
          stroke: referenceLineX?.color ?? referenceLineX?.stroke,
          x: referenceLineX?.value ?? referenceLineX?.x,
          label: referenceLineX?.label
        }),
      tooltipConfig?.active !== false &&
        React.createElement(Tooltip, {
          cursor: tooltipFillOpacity,
          formatter: tooltipValueFormatter,
          contentStyle: tooltipContentStyle,
          ...tooltipConfig
        }),
      children
    )
  );
});
ScatterChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
ScatterChart.displayName = 'ScatterChart';
export { ScatterChart };
