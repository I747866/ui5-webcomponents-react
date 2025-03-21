import React from 'react';
import { LABEL_Y_BOTTOM_HALF, LABEL_Y_MID_HALF, LABEL_Y_OFFSET, LABEL_Y_TOP_HALF } from '../../util/constants.js';
import { Label } from './Label.js';
import { ThemingParameters } from '@ui5/webcomponents-react-base';
export const YearsQuartersLabel = (props) => {
  const { segmentWidth, yearsQuarters } = props;
  if (!yearsQuarters.length) {
    return null;
  }
  const renderQuarterLabel = (month, monthIndex, quarterIndex, xPosition) =>
    React.createElement(
      Label,
      {
        key: `quarter-${quarterIndex}-${monthIndex}`,
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
    yearsQuarters.reduce(
      (acc, year, yearIndex) => {
        acc.lines.push(
          React.createElement(
            Label,
            {
              key: `year-${yearIndex}`,
              x1: acc.previousTotal * segmentWidth,
              x2: acc.previousTotal * segmentWidth,
              y1: LABEL_Y_TOP_HALF,
              y2: LABEL_Y_MID_HALF,
              x: acc.previousTotal * segmentWidth + (segmentWidth * year.year.days) / 2,
              y: LABEL_Y_MID_HALF,
              dy: LABEL_Y_OFFSET,
              textColor: ThemingParameters.sapButton_Lite_TextColor
            },
            year.year.name
          )
        );
        year.quarters.forEach((quarter, quarterIndex) => {
          const quarterXPosition = acc.previousTotal + quarter.days;
          acc.lines.push(renderQuarterLabel(quarter, quarterIndex, yearIndex, quarterXPosition));
          acc.previousTotal += quarter.days;
        });
        return acc;
      },
      { previousTotal: 0, lines: [] }
    ).lines
  );
};
