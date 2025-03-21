import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { getTextWidth, truncateLongLabel } from './Utils.js';
export const XAxisTicks = (props) => {
  const { x, y, payload, config, visibleTicksCount, width, secondYAxisConfig, tickFormatter, index } = props;
  const bandWidth = width / visibleTicksCount;
  const shouldRotate = bandWidth <= 100;
  const formattedValue = tickFormatter?.(payload.value, index) ?? config.formatter(payload.value);
  let textToDisplay = formattedValue;
  if (shouldRotate) {
    textToDisplay = truncateLongLabel(formattedValue, 11);
  } else if (getTextWidth(formattedValue) > bandWidth) {
    for (let i = `${formattedValue}`.length; i > 0; i--) {
      textToDisplay = truncateLongLabel(formattedValue, i);
      if (getTextWidth(textToDisplay) <= bandWidth) {
        break;
      }
    }
  }
  return React.createElement(
    'g',
    { style: { direction: 'ltr' }, transform: `translate(${x},${y + (secondYAxisConfig ? 0 : 10)})` },
    React.createElement(
      'text',
      {
        fill: secondYAxisConfig?.color ?? ThemingParameters.sapContent_LabelColor,
        transform: shouldRotate ? 'rotate(-35)' : undefined,
        textAnchor: shouldRotate ? 'end' : 'middle'
      },
      textToDisplay
    )
  );
};
