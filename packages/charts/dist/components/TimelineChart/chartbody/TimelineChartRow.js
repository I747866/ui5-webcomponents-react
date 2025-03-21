import { throttle } from '@ui5/webcomponents-react-base';
import React, { useEffect, useRef, useState } from 'react';
import { HOVER_OPACITY, NORMAL_OPACITY, THROTTLE_INTERVAL } from '../util/constants.js';
/**
 * This represents each row of the TimelineChart. It is used to display
 * the task items and milestones.
 */
const TimelineChartRow = ({ rowData, rowHeight, rowIndex, totalDuration, timelineStart, showTooltip, hideTooltip }) => {
  rowData.color = rowData.color ?? `var(--sapChart_OrderedColor_${(rowIndex % 11) + 1})`;
  return React.createElement(
    'svg',
    {
      x: '0',
      y: `${rowIndex * rowHeight}`,
      width: '100%',
      height: `${rowHeight}`,
      style: { pointerEvents: 'none' },
      'data-component-name': 'TimelineChartRow'
    },
    rowData.tasks?.map((task, index) => {
      return React.createElement(TimelineTask, {
        key: index,
        id: task.id,
        label: task.label ?? rowData.label,
        startTime: task.start,
        duration: task.duration,
        totalDuration: totalDuration,
        color: task.color ?? rowData.color,
        timelineStart: timelineStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip
      });
    }),
    rowData.milestones?.map((mStone, index) => {
      return React.createElement(TimelineMilestone, {
        key: index,
        id: mStone.id,
        label: mStone.label,
        time: mStone.start,
        color: mStone.color,
        totalDuration: totalDuration,
        timelineStart: timelineStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip
      });
    })
  );
};
TimelineChartRow.displayName = 'TimelineChartRow';
const TimelineTask = ({
  id,
  label,
  startTime,
  duration,
  totalDuration,
  color,
  timelineStart,
  showTooltip,
  hideTooltip
}) => {
  const [opacity, setOpacity] = useState(NORMAL_OPACITY);
  const onMouseLeave = (evt) => {
    evt.stopPropagation();
    hideTooltip();
    setOpacity(NORMAL_OPACITY);
  };
  const mouseMoveHandler = (evt) => {
    evt.stopPropagation();
    setOpacity(HOVER_OPACITY);
    showTooltip(evt.clientX, evt.clientY, label, startTime, duration, color, false);
  };
  const onMouseMove = throttle(mouseMoveHandler, THROTTLE_INTERVAL, { trailing: false });
  // The 10% y value is to create a little gap between the top grid line and the
  // rendered TimelineTask itself. The height is set to 80% to allow for an
  // equal gap at the bottom with the bottom grid line.
  return React.createElement('rect', {
    'data-component-name': 'TimelineChartTask',
    id: id,
    x: `${((startTime - timelineStart) / totalDuration) * 100}%`,
    y: '10%',
    width: `${(duration / totalDuration) * 100}%`,
    height: '80%',
    rx: '4',
    ry: '4',
    style: { fill: color, pointerEvents: 'auto', cursor: 'pointer', opacity: opacity },
    onMouseLeave: onMouseLeave,
    onMouseMove: onMouseMove
  });
};
TimelineTask.displayName = 'TimelineTask';
const TimelineMilestone = ({
  id,
  label = 'Milestone',
  time,
  totalDuration,
  color = '#007D00',
  timelineStart,
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
      'data-component-name': 'TimelineChartMilestone',
      x: `${((time - timelineStart) / totalDuration) * 100}%`,
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
TimelineMilestone.displayName = 'TimelineMilestone';
const TimelineChartRowGroup = ({
  dataset,
  rowHeight,
  totalDuration,
  timelineStart,
  showTooltip,
  hideTooltip,
  postRender
}) => {
  useEffect(() => {
    postRender();
  }, []);
  return React.createElement(
    'svg',
    { width: '100%', height: '100%' },
    dataset.map((data, index) => {
      return React.createElement(TimelineChartRow, {
        key: index,
        rowData: data,
        rowHeight: rowHeight,
        rowIndex: index,
        totalDuration: totalDuration,
        timelineStart: timelineStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip
      });
    })
  );
};
TimelineChartRowGroup.displayName = 'TimelineChartRowGroup';
export { TimelineChartRowGroup };
