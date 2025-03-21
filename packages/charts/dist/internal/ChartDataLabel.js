import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { createElement } from 'react';
import { Label } from 'recharts';
import { getTextWidth } from '../internal/Utils.js';
export const ChartDataLabel = (props) => {
  const { config, chartType, viewBox } = props;
  if (config.hideDataLabel) {
    return null;
  }
  if (config.DataLabel) {
    return createElement(config.DataLabel, props);
  }
  const formattedLabel = config.formatter(props.value ?? props.children);
  if (chartType === 'bar' || chartType === 'column') {
    if (Math.abs(viewBox.width) < getTextWidth(formattedLabel)) {
      return null;
    }
    if (Math.abs(viewBox.height) < 12) {
      return null;
    }
  }
  let fill = ThemingParameters.sapContent_ContrastTextColor;
  if (['area', 'line', 'radar'].includes(chartType)) {
    fill = ThemingParameters.sapTextColor; // label is displayed outside of the colored element
  }
  return React.createElement(Label, {
    viewBox: viewBox,
    ...props,
    fill: fill,
    stroke: 'none',
    content: undefined,
    value: formattedLabel
  });
};
