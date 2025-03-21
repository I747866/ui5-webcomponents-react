import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_OFFSET, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';
export const QuartersMonthsLabel = (props) => {
  const { segmentWidth, quartersMonths } = props;
  if (!quartersMonths.length) {
    return null;
  }
  const renderMonthLabel = (month, monthIndex, quarterIndex, xPosition) =>
    React.createElement(
      Label,
      {
        key: `month-${quarterIndex}-${monthIndex}`,
        x1: xPosition * segmentWidth,
        x2: xPosition * segmentWidth,
        y1: LABEL_Y_MID_HALF,
        y2: LABEL_Y_BOTTOM_HALF,
        x: xPosition * segmentWidth - (segmentWidth * month.days) / 2,
        y: LABEL_Y_BOTTOM_HALF,
        dy: LABEL_Y_OFFSET,
        textColor: ThemingParameters.sapTextColor
      },
      month.name
    );
  return React.createElement(
    React.Fragment,
    null,
    quartersMonths.reduce(
      (acc, quarter, quarterIndex) => {
        acc.lines.push(
          React.createElement(
            Label,
            {
              key: `quarter-${quarterIndex}`,
              x1: acc.previousTotal * segmentWidth,
              x2: acc.previousTotal * segmentWidth,
              y1: LABEL_Y_TOP_HALF,
              y2: LABEL_Y_MID_HALF,
              x: acc.previousTotal * segmentWidth + (segmentWidth * quarter.quarter.days) / 2,
              y: LABEL_Y_MID_HALF,
              dy: LABEL_Y_OFFSET,
              textColor: ThemingParameters.sapButton_Lite_TextColor
            },
            quarter.quarter.name
          )
        );
        quarter.months.forEach((month, monthIndex) => {
          const monthXPosition = acc.previousTotal + month.days;
          acc.lines.push(renderMonthLabel(month, monthIndex, quarterIndex, monthXPosition));
          acc.previousTotal += month.days;
        });
        return acc;
      },
      { previousTotal: 0, lines: [] }
    ).lines
  );
};
