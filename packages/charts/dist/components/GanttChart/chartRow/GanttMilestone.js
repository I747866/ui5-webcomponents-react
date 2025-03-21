import { throttle } from '@ui5/webcomponents-react-base';
import React, { useEffect, useRef, useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';
export const GanttMilestone = ({
  id,
  label = 'Milestone',
  time,
  totalDuration,
  color = '#007D00',
  GanttStart,
  showTooltip,
  hideTooltip
}) => {
  const milestoneRef = useRef(null);
  useEffect(() => {
    const milestone = milestoneRef.current;
    // Replace the zero-width Rect with a Rhombus.
    // Draw a rhombus shape with the length of the diagonals equal
    // to the height of the initial rect. A square is drawn first
    // then that square is translated to the left and downwards so
    // that the center aligns with the initial x position and the
    // center of the row. Then it is rotated 45° about that its center.
    const { height: rhombusDiagonal } = milestone.getBoundingClientRect();
    const rhombusSideLength = Math.sqrt(Math.pow(rhombusDiagonal, 2) / 2);
    milestone.setAttribute('width', rhombusSideLength.toString());
    milestone.setAttribute('height', rhombusSideLength.toString());
    milestone.setAttribute(
      'transform',
      `translate(
        ${-rhombusSideLength / 2}, 
        ${(rhombusDiagonal - rhombusSideLength) / 2}) 
      rotate(45, ${rhombusSideLength / 2}, 
        ${rhombusSideLength / 2}
      )`
    );
  }, []);
  const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  const onMouseLeave = (evt) => {
    evt.stopPropagation();
    hideTooltip();
    setOpacity(NORMAL_OPACITY);
  };
  const mouseMoveHandler = (evt) => {
    evt.stopPropagation();
    setOpacity(HOVER_OPACITY);
    showTooltip(evt.clientX, evt.clientY, label, time, 0, color, true);
  };
  const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });
  // The 10% y value is to create a little gap between the top grid line and the
  // rendered Milestone itself. The height is set to 80% to allow for an
  // equal gap at the bottom with the bottom grid line.
  return React.createElement(
    'svg',
    {
      'data-component-name': 'GanttChartMilestone',
      x: `${((time - GanttStart) / totalDuration) * 100}%`,
      y: '10%',
      height: '80%',
      overflow: 'visible'
    },
    React.createElement('rect', {
      id: id,
      ref: milestoneRef,
      width: '1',
      height: '100%',
      rx: '3',
      ry: '3',
      style: { fill: color, pointerEvents: 'auto', cursor: 'pointer', opacity: opacity },
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove
    })
  );
};
GanttMilestone.displayName = 'GanttMilestone';
