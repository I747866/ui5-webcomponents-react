'use client';
import { enrichEventWithDetails, ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback, useRef } from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RadarChartLib,
  Tooltip
} from 'recharts';
import { useLabelFormatter } from '../../hooks/useLabelFormatter.js';
import { useLegendItemClick } from '../../hooks/useLegendItemClick.js';
import { usePrepareDimensionsAndMeasures } from '../../hooks/usePrepareDimensionsAndMeasures.js';
import { useTooltipFormatter } from '../../hooks/useTooltipFormatter.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { ChartDataLabel } from '../../internal/ChartDataLabel.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { tooltipContentStyle, tooltipFillOpacity } from '../../internal/staticProps.js';
import { PieChartPlaceholder } from '../PieChart/Placeholder.js';
const dimensionDefaults = {
  formatter: (d) => d
};
const measureDefaults = {
  formatter: defaultFormatter,
  opacity: 0.5
};
/**
 * A radar or spider or web chart is a two-dimensional chart type designed to plot one or more series of values over multiple quantitative variables.
 */
const RadarChart = forwardRef((props, ref) => {
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
    children,
    ...rest
  } = props;
  const chartConfig = {
    legendPosition: 'bottom',
    legendHorizontalAlign: 'center',
    dataLabel: true,
    polarGridType: 'circle',
    resizeDebounce: 250,
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
  const labelFormatter = useLabelFormatter(primaryDimension);
  const primaryDimensionAccessor = primaryDimension?.accessor;
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const preventOnClickCall = useRef(false);
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
    (payload, eventOrIndex) => {
      if (eventOrIndex.value && onDataPointClick) {
        onDataPointClick(
          enrichEventWithDetails(
            {},
            {
              value: eventOrIndex.value,
              dataKey: eventOrIndex.dataKey,
              name: eventOrIndex.payload.label,
              dataIndex: eventOrIndex.index,
              payload: eventOrIndex.payload
            }
          )
        );
        preventOnClickCall.current = true;
      }
    },
    [onDataPointClick, preventOnClickCall.current]
  );
  const { chartConfig: _0, dimensions: _1, measures: _2, ...propsWithoutOmitted } = rest;
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      ref: ref,
      loading: loading,
      Placeholder: ChartPlaceholder ?? PieChartPlaceholder,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      RadarChartLib,
      {
        onClick: onClickInternal,
        data: dataset,
        margin: chartConfig.margin,
        className: typeof onDataPointClick === 'function' ? 'has-click-handler' : undefined
      },
      React.createElement(PolarGrid, { gridType: chartConfig.polarGridType }),
      React.createElement(PolarAngleAxis, {
        dataKey: primaryDimensionAccessor,
        tickFormatter: primaryDimension?.formatter,
        tick: {
          fill: ThemingParameters.sapContent_LabelColor
        }
      }),
      React.createElement(PolarRadiusAxis, null),
      measures.map((element, index) => {
        return React.createElement(Radar, {
          key: element.accessor,
          activeDot: { onClick: onDataPointClickInternal },
          name: element.label ?? element.accessor,
          dataKey: element.accessor,
          stroke: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
          fill: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
          fillOpacity: element.opacity,
          label: React.createElement(ChartDataLabel, { config: element, chartType: 'radar', position: 'outside' }),
          isAnimationActive: noAnimation === false
        });
      }),
      tooltipConfig?.active !== false &&
        React.createElement(Tooltip, {
          cursor: tooltipFillOpacity,
          formatter: tooltipValueFormatter,
          contentStyle: tooltipContentStyle,
          labelFormatter: labelFormatter,
          ...tooltipConfig
        }),
      !noLegend &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        React.createElement(Legend, {
          verticalAlign: chartConfig.legendPosition,
          align: chartConfig.legendHorizontalAlign,
          onClick: onItemLegendClick
        }),
      children
    )
  );
});
RadarChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
RadarChart.displayName = 'RadarChart';
export { RadarChart };
