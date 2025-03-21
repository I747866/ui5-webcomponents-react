import React from 'react';
import { useStyles } from '../util/styles.js';
/**
 * The GanttChartLayer represents each layer of the chart rendering. This
 * is used to seperate the chart into different rendering concerns. One layer
 * can be used to render the grid lines and another can be used to render
 * annotations or tasks.
 */
const GanttChartLayer = ({ ignoreClick = false, isAnnotation, children, name }) => {
  const classes = useStyles();
  const position = 'absolute';
  const pointerEvents = ignoreClick ? 'none' : 'auto';
  if (isAnnotation) {
    return React.createElement(
      'div',
      {
        'data-component-name': name,
        className: classes.layer,
        style: { position: position, pointerEvents: pointerEvents }
      },
      children
    );
  }
  return React.createElement(
    'svg',
    {
      'data-component-name': name,
      width: '100%',
      height: '100%',
      style: { position: position, pointerEvents: pointerEvents, overflow: 'visible' }
    },
    children
  );
};
export { GanttChartLayer };
