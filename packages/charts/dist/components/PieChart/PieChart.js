'use client';
import { enrichEventWithDetails } from '@ui5/webcomponents-react-base';
import { clsx } from 'clsx';
import React, { cloneElement, forwardRef, isValidElement, useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import {
  Cell,
  Label as RechartsLabel,
  Legend,
  Pie,
  PieChart as PieChartLib,
  Sector,
  Text as RechartsText,
  Tooltip
} from 'recharts';
import { getValueByDataKey } from 'recharts/lib/util/ChartUtils.js';
import { useLegendItemClick } from '../../hooks/useLegendItemClick.js';
import { useOnClickInternal } from '../../hooks/useOnClickInternal.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { tooltipContentStyle, tooltipFillOpacity } from '../../internal/staticProps.js';
import { PieChartPlaceholder } from './Placeholder.js';
const useStyles = createUseStyles(
  {
    piechart: { '& g:focus,& path:focus': { outline: 'none' } }
  },
  { name: 'PieChartStyles' }
);
const tooltipItemDefaultStyle = { color: 'var (--sapTextColor)' };
/**
 * A Pie Chart is a type of graph that displays data in a circular graph.
 * The pieces of the graph are proportional to the fraction of the whole in each category.
 *
 * In other words, each slice of the pie is relative to the size of that category in the group as a whole.
 * The entire “pie” represents 100 percent of a whole, while the pie “slices” represent portions of the whole.
 */
const PieChart = forwardRef((props, ref) => {
  const {
    loading,
    dataset,
    noLegend,
    noAnimation,
    tooltipConfig,
    onDataPointClick,
    onLegendClick,
    onClick,
    centerLabel,
    style,
    className,
    slot,
    ChartPlaceholder,
    children,
    ...rest
  } = props;
  const classes = useStyles();
  const chartConfig = {
    margin: { right: 30, left: 30, bottom: 30, top: 30, ...(props.chartConfig?.margin ?? {}) },
    legendPosition: 'bottom',
    legendHorizontalAlign: 'center',
    paddingAngle: 0,
    outerRadius: '80%',
    resizeDebounce: 250,
    tooltipItemStyle: tooltipItemDefaultStyle,
    ...props.chartConfig
  };
  const showActiveSegmentDataLabel = chartConfig.showActiveSegmentDataLabel ?? true;
  const dimension = useMemo(
    () => ({
      formatter: defaultFormatter,
      ...props.dimension
    }),
    [props.dimension]
  );
  const measure = useMemo(
    () => ({
      formatter: defaultFormatter,
      ...props.measure
    }),
    [props.measure]
  );
  const dataLabel = (props) => {
    const hideDataLabel =
      typeof measure.hideDataLabel === 'function' ? measure.hideDataLabel(props) : measure.hideDataLabel;
    if (hideDataLabel || chartConfig.activeSegment === props.index) return null;
    if (isValidElement(measure.DataLabel)) {
      return cloneElement(measure.DataLabel, { ...props, config: measure });
    }
    return React.createElement(
      RechartsText,
      { ...props, alignmentBaseline: 'middle', className: 'recharts-pie-label-text' },
      measure.formatter(props.value)
    );
  };
  const tooltipValueFormatter = useCallback(
    (value, name) => [measure.formatter(value), dimension.formatter(name)],
    [measure.formatter, dimension.formatter]
  );
  const onItemLegendClick = useLegendItemClick(onLegendClick, () => measure.accessor);
  const onClickInternal = useOnClickInternal(onClick);
  const onDataPointClickInternal = useCallback(
    (payload, dataIndex, event) => {
      if (payload && payload && typeof onDataPointClick === 'function') {
        onDataPointClick(
          enrichEventWithDetails(event, {
            value: payload.value,
            dataKey: payload.tooltipPayload?.[0]?.dataKey,
            name: payload.name,
            payload: payload.payload,
            dataIndex
          })
        );
      }
    },
    [onDataPointClick]
  );
  const renderActiveShape = useCallback(
    (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';
      return React.createElement(
        'g',
        null,
        React.createElement('text', { x: cx, y: cy, dy: 8, textAnchor: 'middle', fill: fill }, payload.name),
        React.createElement(Sector, {
          cx: cx,
          cy: cy,
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          startAngle: startAngle,
          endAngle: endAngle,
          fill: fill
        }),
        React.createElement(Sector, {
          cx: cx,
          cy: cy,
          startAngle: startAngle,
          endAngle: endAngle,
          innerRadius: outerRadius + 6,
          outerRadius: outerRadius + 10,
          fill: fill
        }),
        showActiveSegmentDataLabel &&
          React.createElement(
            React.Fragment,
            null,
            React.createElement('path', { d: `M${sx},${sy}L${mx},${my}L${ex},${ey}`, stroke: fill, fill: 'none' }),
            React.createElement('circle', { cx: ex, cy: ey, r: 2, fill: fill, stroke: 'none' }),
            React.createElement(
              'text',
              { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, textAnchor: textAnchor, fill: fill },
              measure.formatter(value)
            ),
            React.createElement(
              'text',
              { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, dy: 18, textAnchor: textAnchor, fill: fill },
              `(${(percent * 100).toFixed(2)}%)`
            )
          )
      );
    },
    [showActiveSegmentDataLabel]
  );
  const renderLabelLine = useCallback(
    (props) => {
      const hideDataLabel =
        typeof measure.hideDataLabel === 'function' ? measure.hideDataLabel(props) : measure.hideDataLabel;
      if (hideDataLabel || chartConfig.activeSegment === props.index) return null;
      return Pie.renderLabelLineItem(undefined, props);
    },
    [chartConfig.activeSegment, measure.hideDataLabel]
  );
  const legendWrapperStyle = useMemo(() => {
    if (chartConfig.activeSegment != null && showActiveSegmentDataLabel) {
      if (chartConfig.legendPosition === 'bottom') {
        return {
          paddingTop: '30px'
        };
      } else if (chartConfig.legendPosition === 'top') {
        return {
          paddingBottom: '30px'
        };
      }
    }
    return null;
  }, [showActiveSegmentDataLabel, chartConfig.activeSegment, chartConfig.legendPosition]);
  const { chartConfig: _0, dimension: _1, measure: _2, ...propsWithoutOmitted } = rest;
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
      PieChartLib,
      {
        onClick: onClickInternal,
        margin: chartConfig.margin,
        className: clsx(
          typeof onDataPointClick === 'function' || typeof onClick === 'function' ? 'has-click-handler' : undefined,
          classes.piechart
        )
      },
      React.createElement(
        Pie,
        {
          onClick: onDataPointClickInternal,
          innerRadius: chartConfig.innerRadius,
          outerRadius: chartConfig.outerRadius,
          paddingAngle: chartConfig.paddingAngle,
          nameKey: dimension.accessor,
          dataKey: measure.accessor,
          data: dataset,
          animationBegin: 0,
          isAnimationActive: noAnimation === false,
          labelLine: renderLabelLine,
          label: dataLabel,
          activeIndex: chartConfig.activeSegment,
          activeShape: chartConfig.activeSegment != null && renderActiveShape
        },
        centerLabel && React.createElement(RechartsLabel, { position: 'center' }, centerLabel),
        dataset &&
          dataset.map((data, index) =>
            React.createElement(Cell, {
              key: index,
              name: dimension.formatter(getValueByDataKey(data, dimension.accessor, '')),
              fill: measure.colors?.[index] ?? `var(--sapChart_OrderedColor_${(index % 11) + 1})`
            })
          )
      ),
      tooltipConfig?.active !== false &&
        React.createElement(Tooltip, {
          cursor: tooltipFillOpacity,
          formatter: tooltipValueFormatter,
          contentStyle: tooltipContentStyle,
          itemStyle: chartConfig.tooltipItemStyle,
          labelStyle: chartConfig.tooltipLabelStyle,
          ...tooltipConfig
        }),
      !noLegend &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        React.createElement(Legend, {
          verticalAlign: chartConfig.legendPosition,
          align: chartConfig.legendHorizontalAlign,
          onClick: onItemLegendClick,
          wrapperStyle: legendWrapperStyle
        }),
      children
    )
  );
});
PieChart.defaultProps = {
  noLegend: false,
  noAnimation: false
};
PieChart.displayName = 'PieChart';
export { PieChart };
