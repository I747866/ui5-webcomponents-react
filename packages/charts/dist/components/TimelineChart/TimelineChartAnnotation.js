import React, { forwardRef } from 'react';
import { DEFAULT_ROW_HEIGHT } from './util/constants.js';
import { useStyles } from './util/styles.js';
/**
 * This is designed to be used for creating custom annotations, markers
 * or illustrations on the timeline of the chart.
 */
const TimelineChartAnnotation = forwardRef((props, ref) => {
  const { width = 'auto', height, rowIndex = 0, rowHeight = DEFAULT_ROW_HEIGHT, figure, ...rest } = props;
  const classes = useStyles();
  const style = {
    width: width,
    height: height != null ? height : rowHeight,
    insetBlockStart: `${rowIndex * rowHeight}px`
  };
  return React.createElement(
    'div',
    {
      ref: ref,
      className: classes.annotation,
      ...rest,
      style: style,
      'data-component-name': 'TimelineChartAnnotation'
    },
    figure
  );
});
TimelineChartAnnotation.displayName = 'TimelineChartAnnotation';
export { TimelineChartAnnotation };
