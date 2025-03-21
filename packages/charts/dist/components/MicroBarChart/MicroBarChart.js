'use client';
import { enrichEventWithDetails, ThemingParameters } from '@ui5/webcomponents-react-base';
import { clsx } from 'clsx';
import React, { createElement, forwardRef, useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { getValueByDataKey } from 'recharts/lib/util/ChartUtils.js';
import { ChartContainer } from '../../internal/ChartContainer.js';
import { defaultFormatter } from '../../internal/defaults.js';
import { BarChartPlaceholder } from '../BarChart/Placeholder.js';
const resolveColor = (index, color = null) => {
  if (color) {
    return ThemingParameters[color] ?? color;
  }
  return ThemingParameters[`sapChart_Sequence_${(index % 11) + 1}`];
};
const MicroBarChartStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: ThemingParameters.sapFontFamily,
    fontWeight: 'normal',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around'
  },
  barContainer: {
    cursor: 'auto'
  },
  barContainerActive: {
    '&:active': { opacity: '0.3 !important' },
    cursor: 'pointer'
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  valueContainer: {
    display: 'flex',
    backgroundColor: ThemingParameters.sapContent_Placeholderloading_Background
  },
  valueBar: { height: '100%' },
  label: {
    color: ThemingParameters.sapContent_LabelColor,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: ThemingParameters.sapFontSmallSize,
    maxWidth: '70%'
  },
  text: {
    paddingLeft: '6px',
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: ThemingParameters.sapFontSmallSize,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: ThemingParameters.sapTextColor,
    textAlign: 'right'
  }
};
const useStyles = createUseStyles(MicroBarChartStyles, { name: 'MicroBarChart' });
/**
 * The `MicroBarChart` compares different values of the same category to each other by displaying them in a compact way.
 */
const MicroBarChart = forwardRef((props, ref) => {
  const { loading, dataset, onDataPointClick, style, className, slot, ChartPlaceholder, ...rest } = props;
  const classes = useStyles();
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
  const maxValue = useMemo(() => {
    if (dataset) {
      const maxDatasetValue = Math.max(...dataset?.map((item) => getValueByDataKey(item, measure.accessor)));
      return props.maxValue ?? maxDatasetValue;
    }
    return 0;
  }, [dataset, measure, props.maxValue]);
  const barHeight = measure?.width ? `${measure.width}px` : '4px';
  const onBarClick = useCallback(
    (item, index) => (e) => {
      if (typeof onDataPointClick === 'function') {
        onDataPointClick(
          enrichEventWithDetails(e, {
            dataKey: measure.accessor,
            value: getValueByDataKey(item, measure.accessor),
            payload: item,
            dataIndex: index
          })
        );
      }
    },
    [measure.accessor, onDataPointClick]
  );
  const barContainerClasses = clsx(classes.barContainer, onDataPointClick && classes.barContainerActive);
  const { maxValue: _0, dimension: _1, measure: _2, ...propsWithoutOmitted } = rest;
  return React.createElement(
    ChartContainer,
    {
      dataset: dataset,
      loading: loading,
      Placeholder: ChartPlaceholder ?? BarChartPlaceholder,
      ref: ref,
      style: style,
      className: className,
      slot: slot,
      resizeDebounce: 250,
      ...propsWithoutOmitted
    },
    React.createElement(
      'div',
      { className: classes.container },
      dataset?.map((item, index) => {
        const dimensionValue = getValueByDataKey(item, dimension.accessor);
        const measureValue = getValueByDataKey(item, measure.accessor);
        const formattedDimension = dimension.formatter(dimensionValue);
        let formattedMeasure = '';
        if (!measure.hideDataLabel) {
          if (measure.DataLabel) {
            formattedMeasure = createElement(measure.DataLabel, {
              value: measureValue,
              config: measure,
              formattedValue: measure.formatter(measureValue)
            });
          } else {
            formattedMeasure = measure.formatter(measureValue);
          }
        }
        return React.createElement(
          'div',
          { key: dimensionValue, className: barContainerClasses, onClick: onBarClick(item, index) },
          React.createElement(
            'div',
            { className: classes.labelContainer },
            React.createElement('span', { className: classes.label, title: formattedDimension }, formattedDimension),
            React.createElement(
              'span',
              { className: classes.text, title: formattedMeasure },
              measure.hideDataLabel ? '' : formattedMeasure
            )
          ),
          React.createElement(
            'div',
            {
              className: classes.valueContainer,
              style: {
                opacity: measure?.opacity ?? 1,
                height: barHeight
              }
            },
            React.createElement('div', {
              className: classes.valueBar,
              style: {
                width: `${(measureValue / maxValue) * 100}%`,
                backgroundColor: resolveColor(index, measure?.colors?.[index])
              }
            })
          )
        );
      })
    )
  );
});
MicroBarChart.displayName = 'MicroBarChart';
export { MicroBarChart };
