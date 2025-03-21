'use client';
import { enrichEventWithDetails, ThemingParameters, useIsRTL, useSyncRef } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  Bar,
  Brush,
  CartesianGrid,
  Cell,
  ComposedChart as ComposedChartLib,
  Legend,
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
import { ComparisonLine } from './ComparisonLine.js';
import { BulletChartPlaceholder } from './Placeholder.js';
const dimensionDefaults = {
  formatter: defaultFormatter
};
const measureDefaults = {
  formatter: defaultFormatter,
  opacity: 1
};
/**
 * The `BulletChart` is used to compare primary and secondary (comparison) values. The primary and additional values
 * are rendered as a stacked Bar Chart while the comparison value is displayed as a line above.
 */
const BulletChart = forwardRef((props, ref) => {
  const {
    loading,
    dataset,
    onDataPointClick,
    noLegend,
    noAnimation,
    tooltipConfig,
    onLegendClick,
    onClick,
    layout,
    style,
    className,
    slot,
    syncId,
    ChartPlaceholder,
    children,
    ...rest
  } = props;
  const [componentRef, chartRef] = useSyncRef(ref);
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
    yAxisConfig: {},
    xAxisConfig: {},
    secondYAxisConfig: {},
    secondXAxisConfig: {},
    ...props.chartConfig
  };
  const { referenceLine } = chartConfig;
  const { dimensions, measures } = usePrepareDimensionsAndMeasures(
    props.dimensions,
    props.measures,
    dimensionDefaults,
    measureDefaults
  );
  const sortedMeasures = useMemo(() => {
    return measures.sort((measure) => {
      if (measure.type === 'comparison') {
        return 1;
      }
      if (measure.type === 'primary') {
        return -1;
      }
      return 0;
    });
  }, [measures]);
  const tooltipValueFormatter = useTooltipFormatter(sortedMeasures);
  const primaryDimension = dimensions[0];
  const { primaryMeasure, secondaryMeasure } = resolvePrimaryAndSecondaryMeasures(
    sortedMeasures,
    chartConfig?.secondYAxis?.dataKey
  );
  const labelFormatter = useLabelFormatter(primaryDimension);
  const dataKeys = sortedMeasures.map(({ accessor }) => accessor);
  const colorSecondY = chartConfig.secondYAxis
    ? dataKeys.findIndex((key) => key === chartConfig.secondYAxis?.dataKey)
    : 0;
  const onDataPointClickInternal = useCallback(
    (payload, eventOrIndex, event) => {
      if (typeof onDataPointClick === 'function') {
        if (payload.name) {
          const payloadValueLength = payload?.value?.length;
          onDataPointClick(
            enrichEventWithDetails(event ?? eventOrIndex, {
              value: payloadValueLength ? payload.value[1] - payload.value[0] : payload.value,
              dataIndex: payload.index ?? eventOrIndex,
              dataKey: payloadValueLength
                ? Object.keys(payload).filter((key) =>
                    payload.value.length
                      ? payload[key] === payload.value[1] - payload.value[0]
                      : payload[key] === payload.value && key !== 'value'
                  )[0]
                : payload.dataKey ??
                  Object.keys(payload).find((key) => payload[key] === payload.value && key !== 'value'),
              payload: payload.payload
            })
          );
        } else {
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
        }
      }
    },
    [onDataPointClick]
  );
  const onItemLegendClick = useLegendItemClick(onLegendClick);
  const onClickInternal = useOnClickInternal(onClick);
  const isBigDataSet = dataset?.length > 30 ?? false;
  const primaryDimensionAccessor = primaryDimension?.accessor;
  const [yAxisWidth, legendPosition] = useLongestYAxisLabel(
    dataset,
    layout === 'vertical' ? dimensions : sortedMeasures,
    chartConfig.legendPosition
  );
  const marginChart = useChartMargin(chartConfig.margin, chartConfig.zoomingTool);
  const xAxisHeights = useObserveXAxisHeights(chartRef, layout === 'vertical' ? 1 : props.dimensions.length);
  const measureAxisProps = {
    axisLine: chartConfig.yAxisVisible,
    tickLine: tickLineConfig,
    tickFormatter: primaryMeasure?.formatter,
    interval: 0
  };
  const isRTL = useIsRTL(chartRef);
  const Placeholder = useCallback(() => {
    return React.createElement(BulletChartPlaceholder, { layout: layout, measures: measures });
  }, [layout, measures]);
  const { chartConfig: _0, dimensions: _1, measures: _2, ...propsWithoutOmitted } = rest;
  return React.createElement(
    ChartContainer,
    {
      ref: componentRef,
      loading: loading,
      dataset: dataset,
      Placeholder: ChartPlaceholder ?? Placeholder,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: chartConfig.resizeDebounce,
      ...propsWithoutOmitted
    },
    React.createElement(
      ComposedChartLib,
      {
        syncId: syncId,
        onClick: onClickInternal,
        stackOffset: 'sign',
        margin: marginChart,
        data: dataset,
        layout: layout,
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
          let AxisComponent;
          const axisProps = {
            dataKey: dimension.accessor,
            interval: dimension?.interval ?? (isBigDataSet ? 'preserveStart' : 0),
            tickLine: index < 1,
            axisLine: index < 1,
            allowDuplicatedCategory: index === 0
          };
          if (layout === 'vertical') {
            axisProps.type = 'category';
            axisProps.tick = React.createElement(YAxisTicks, { config: dimension });
            axisProps.yAxisId = index;
            axisProps.width = yAxisWidth;
            AxisComponent = YAxis;
            axisProps.orientation = isRTL ? 'right' : 'left';
          } else {
            axisProps.dataKey = dimension.accessor;
            axisProps.tick = React.createElement(XAxisTicks, { config: dimension });
            axisProps.xAxisId = index;
            axisProps.height = xAxisHeights[index];
            AxisComponent = XAxis;
            axisProps.reversed = isRTL;
          }
          return React.createElement(AxisComponent, { key: dimension.accessor, ...axisProps });
        }),
      layout === 'horizontal' &&
        React.createElement(YAxis, {
          ...measureAxisProps,
          yAxisId: 'primary',
          width: yAxisWidth,
          orientation: isRTL ? 'right' : 'left',
          tick: React.createElement(YAxisTicks, { config: primaryMeasure }),
          ...chartConfig.yAxisConfig
        }),
      layout === 'vertical' &&
        React.createElement(XAxis, {
          ...measureAxisProps,
          reversed: isRTL,
          xAxisId: 'primary',
          type: 'number',
          tick: React.createElement(XAxisTicks, { config: primaryMeasure }),
          ...chartConfig.xAxisConfig
        }),
      chartConfig.secondYAxis?.dataKey &&
        layout === 'horizontal' &&
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
          label: {
            value: chartConfig.secondYAxis.name,
            offset: 2,
            angle: +90,
            position: 'center'
          },
          orientation: isRTL ? 'left' : 'right',
          interval: 0,
          yAxisId: 'secondary',
          ...chartConfig.secondYAxisConfig
        }),
      chartConfig.secondYAxis?.dataKey &&
        layout === 'vertical' &&
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
      layout === 'horizontal' && React.createElement(XAxis, { xAxisId: 'comparisonXAxis', hide: true }),
      layout === 'vertical' && React.createElement(YAxis, { yAxisId: 'comparisonYAxis', type: 'category', hide: true }),
      referenceLine &&
        React.createElement(ReferenceLine, {
          ...referenceLine,
          stroke: referenceLine?.color ?? referenceLine?.stroke,
          y: referenceLine?.value ? (layout === 'horizontal' ? referenceLine?.value : undefined) : referenceLine?.y,
          x: referenceLine?.value ? (layout === 'vertical' ? referenceLine?.value : undefined) : referenceLine?.x,
          yAxisId: referenceLine?.yAxisId ?? layout === 'horizontal' ? 'primary' : undefined,
          xAxisId: referenceLine?.xAxisId ?? layout === 'vertical' ? 'primary' : undefined,
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
      !noLegend &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        React.createElement(Legend, {
          verticalAlign: chartConfig.legendPosition,
          align: chartConfig.legendHorizontalAlign,
          onClick: onItemLegendClick,
          wrapperStyle: legendPosition
        }),
      sortedMeasures?.map((element, index) => {
        const chartElementProps = {
          isAnimationActive: noAnimation === false
        };
        let labelPosition = 'top';
        switch (element.type) {
          case 'primary':
          case 'additional':
            chartElementProps.fillOpacity = element.opacity;
            chartElementProps.strokeOpacity = element.opacity;
            chartElementProps.barSize = element.width;
            chartElementProps.onClick = onDataPointClickInternal;
            chartElementProps.stackId = 'A';
            chartElementProps.labelPosition = element.stackId ? 'insideTop' : 'top';
            if (layout === 'vertical') {
              labelPosition = 'insideRight';
            } else {
              labelPosition = 'insideTop';
            }
            break;
          case 'comparison':
            chartElementProps.onClick = onDataPointClickInternal;
            chartElementProps.fill = element.color ?? 'black';
            chartElementProps.strokeWidth = element.width;
            chartElementProps.shape = React.createElement(ComparisonLine, { layout: layout });
            chartElementProps.strokeOpacity = element.opacity;
            chartElementProps.label = false;
            chartElementProps.xAxisId = 'comparisonXAxis';
            chartElementProps.yAxisId = 'comparisonYAxis';
            chartElementProps.dot = !isBigDataSet;
            break;
        }
        if (layout === 'vertical') {
          chartElementProps.xAxisId = chartConfig.secondYAxis?.dataKey === element.accessor ? 'secondary' : 'primary';
        } else {
          chartElementProps.yAxisId = chartConfig.secondYAxis?.dataKey === element.accessor ? 'secondary' : 'primary';
        }
        return React.createElement(
          Bar,
          {
            key: element.accessor,
            name: element.label ?? element.accessor,
            label: isBigDataSet
              ? null
              : React.createElement(ChartDataLabel, { config: element, chartType: 'bar', position: labelPosition }),
            stroke: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
            fill: element.color ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`,
            type: 'monotone',
            dataKey: element.accessor,
            ...chartElementProps
          },
          element.type !== 'comparison' &&
            dataset.map((data, i) => {
              return React.createElement(Cell, {
                key: i,
                fill: getCellColors(element, data, index),
                stroke: getCellColors(element, data, index)
              });
            })
        );
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
BulletChart.defaultProps = {
  noLegend: false,
  noAnimation: false,
  layout: 'horizontal'
};
BulletChart.displayName = 'BulletChart';
export { BulletChart };
