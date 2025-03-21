import React from 'react';
import { FONT_SIZE, SEGMENT_WIDTH_FULL_LABEL, SEGMENT_WIDTH_THRESHOLD } from '../../util/constants.js';
import { useStyles } from '../../util/styles.js';
import { prepareTimelineData } from './GanttChartTimelineSupport.js';
import { MonthsDaysLabel } from './MonthsDaysLabel.js';
import { QuartersMonthsLabel } from './QuartersMonthsLabel.js';
import { YearsQuartersLabel } from './YearsQuartersLabel.js';
export const GanttChartTimeline = (props) => {
  const { width, height, totalDuration, contractDuration } = props;
  const classes = useStyles();
  const style = {
    width: width,
    height: height
  };
  const { monthsDays, quartersMonths, yearsQuarters } = prepareTimelineData(contractDuration);
  const segmentWidth = width / totalDuration;
  return React.createElement(
    'div',
    { className: classes.columnLabel, style: style, 'data-component-name': 'GanttChartTimeline' },
    React.createElement(
      'svg',
      { height: height, width: '100%', fontFamily: 'inherit', fontSize: FONT_SIZE, overflow: 'visible' },
      segmentWidth > SEGMENT_WIDTH_FULL_LABEL
        ? React.createElement(MonthsDaysLabel, { segmentWidth: segmentWidth, months: monthsDays })
        : null,
      segmentWidth > SEGMENT_WIDTH_THRESHOLD && segmentWidth <= SEGMENT_WIDTH_FULL_LABEL
        ? React.createElement(QuartersMonthsLabel, { segmentWidth: segmentWidth, quartersMonths: quartersMonths })
        : null,
      segmentWidth <= SEGMENT_WIDTH_THRESHOLD
        ? React.createElement(YearsQuartersLabel, { segmentWidth: segmentWidth, yearsQuarters: yearsQuarters })
        : null
    )
  );
};
