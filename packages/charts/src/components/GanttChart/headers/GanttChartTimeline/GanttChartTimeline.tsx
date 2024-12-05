import type { CSSProperties } from 'react';
import React from 'react';
import type { DateRange } from '../../types/GanttChartTypes.js';
import { FONT_SIZE, SEGMENT_WIDTH_FULL_LABEL, SEGMENT_WIDTH_THRESHOLD } from '../../util/constants.js';
import { useStyles } from '../../util/styles.js';
import { prepareTimelineData } from './GanttChartTimelineSupport.js';
import { MonthsDaysLabel } from './MonthsDaysLabel.js';
import { QuartersMonthsLabel } from './QuartersMonthsLabel.js';
import { YearsQuartersLabel } from './YearsQuartersLabel.js';

export interface GanttChartTimelineProps {
  width: number;
  height: number;
  // TODO: this is redundand, it's dates difference in days
  totalDuration: number;
  contractDuration: DateRange;
}

export const GanttChartTimeline = (props: GanttChartTimelineProps) => {
  const { width, height, totalDuration, contractDuration } = props;
  const classes = useStyles();
  const style: CSSProperties = {
    width: width,
    height: height
  };

  const { monthsDays, quartersMonths, yearsQuarters } = prepareTimelineData(contractDuration);
  const segmentWidth = width / totalDuration;

  return (
    <div className={classes.columnLabel} style={style} data-component-name="GanttChartTimeline">
      <svg height={height} width="100%" fontFamily="inherit" fontSize={FONT_SIZE}>
        {segmentWidth > SEGMENT_WIDTH_FULL_LABEL ? (
          <MonthsDaysLabel segmentWidth={segmentWidth} months={monthsDays} />
        ) : null}
        {segmentWidth > SEGMENT_WIDTH_THRESHOLD && segmentWidth <= SEGMENT_WIDTH_FULL_LABEL ? (
          <QuartersMonthsLabel segmentWidth={segmentWidth} quartersMonths={quartersMonths} />
        ) : null}
        {segmentWidth <= SEGMENT_WIDTH_THRESHOLD ? (
          <YearsQuartersLabel segmentWidth={segmentWidth} yearsQuarters={yearsQuarters} />
        ) : null}
      </svg>
    </div>
  );
};
