import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { defaultMaxYAxisWidth } from './defaults.js';
import { getTextWidth, truncateLongLabel } from './Utils.js';
export const YAxisTicks = (props) => {
  const { x, y, payload, config, secondYAxisConfig, tickFormatter, index } = props;
  const formattedValue = tickFormatter?.(payload.value, index) ?? config.formatter(payload.value);
  let textToDisplay = formattedValue;
  if (getTextWidth(formattedValue) > defaultMaxYAxisWidth) {
    for (let i = `${formattedValue}`.length; i > 0; i--) {
      textToDisplay = truncateLongLabel(formattedValue, i);
      if (getTextWidth(textToDisplay) <= defaultMaxYAxisWidth) {
        break;
      }
    }
  }
  return React.createElement(
    'g',
    { transform: `translate(${x},${y + 3})` },
    React.createElement(
      'text',
      {
        fill: secondYAxisConfig?.color ?? ThemingParameters.sapContent_LabelColor,
        textAnchor: secondYAxisConfig ? 'start' : 'end'
      },
      textToDisplay
    )
  );
};
