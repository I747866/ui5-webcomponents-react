'use client';
import { enrichEventWithDetails, ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { forwardRef } from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { useOnClickInternal } from '../../hooks/useOnClickInternal.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { PieChartPlaceholder } from '../PieChart/Placeholder.js';
const radialBarBackground = { fill: ThemingParameters.sapContent_ImagePlaceholderBackground };
const defaultDisplayValueStyles = {
  fontSize: '1.25rem',
  fill: ThemingParameters.sapTextColor,
  fontFamily: ThemingParameters.sapFontFamily
};
/**
 * Displays a ring chart highlighting a current status.
 * The status can be emphasized by using the `color` prop.
 */
const RadialChart = forwardRef((props, ref) => {
  const {
    maxValue,
    value,
    displayValue,
    onDataPointClick,
    onClick,
    color,
    style,
    className,
    slot,
    noAnimation,
    chartConfig,
    displayValueStyle,
    ...rest
  } = props;
  const range = [0, maxValue];
  const dataset = [{ value }];
  const onDataPointClickInternal = (payload, i, event) => {
    if (payload && onDataPointClick) {
      onDataPointClick(
        enrichEventWithDetails(event, {
          value: payload.value,
          payload: payload.payload,
          dataIndex: i
        })
      );
    }
  };
  const onClickInternal = useOnClickInternal(onClick);
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      ref: ref,
      Placeholder: PieChartPlaceholder,
      className: className,
      slot: slot,
      resizeDebounce: 250,
      style: style,
      ...rest
    },
    React.createElement(
      RadialBarChart,
      {
        onClick: onClickInternal,
        innerRadius: '90%',
        outerRadius: '100%',
        barSize: 10,
        data: dataset,
        cx: '50%',
        cy: '50%',
        startAngle: 90,
        endAngle: -270,
        ...chartConfig
      },
      React.createElement(PolarAngleAxis, { type: 'number', domain: range, tick: false }),
      React.createElement(RadialBar, {
        isAnimationActive: noAnimation === false,
        background: radialBarBackground,
        dataKey: 'value',
        fill: color ?? ThemingParameters.sapChart_OrderedColor_1,
        onClick: onDataPointClickInternal
      }),
      displayValue &&
        React.createElement(
          'text',
          {
            x: '50%',
            y: '50%',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            className: 'progress-label',
            style: { ...defaultDisplayValueStyles, ...displayValueStyle }
          },
          displayValue
        )
    )
  );
});
RadialChart.defaultProps = {
  maxValue: 100,
  noAnimation: false,
  displayValueStyle: defaultDisplayValueStyles
};
RadialChart.displayName = 'RadialChart';
export { RadialChart };
