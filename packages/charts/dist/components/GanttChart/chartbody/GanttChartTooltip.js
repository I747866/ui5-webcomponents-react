import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useStyles } from '../util/styles.js';
export const GanttChartTooltip = forwardRef(function GanttChartTooltip(_, ref) {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    label: '',
    visible: false,
    startTime: 0,
    duration: 0,
    color: 'black',
    isMilestone: false
  });
  const divRef = useRef(null);
  const popupRef = useRef(null);
  const classes = useStyles();
  const onHoverItem = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
    const { x, y, width, height } = divRef.current?.getBoundingClientRect();
    // Adjust the x and y position of the tooltip popover in order to try
    // to prevent it from being cut off by the bounds of the parent div.
    const offSetX = mouseX - x;
    const offSetY = mouseY - y;
    const xPos = offSetX < width - 80 ? offSetX : offSetX - 120;
    const yPos = offSetY < height - 70 ? offSetY : offSetY - 70;
    setState({ x: xPos, y: yPos, label, visible: true, startTime, duration, color, isMilestone });
  };
  const onLeaveItem = () => {
    setState({ ...state, visible: false });
  };
  useImperativeHandle(ref, () => ({
    onHoverItem: onHoverItem,
    onLeaveItem: onLeaveItem
  }));
  return React.createElement(
    'div',
    { 'data-component-name': 'GanttChartTooltipContainer', className: classes.tooltipContainer, ref: divRef },
    state.visible
      ? React.createElement(
          'span',
          {
            'data-component-name': 'GanttChartTooltip',
            className: classes.tooltip,
            ref: popupRef,
            style: {
              insetInlineStart: state.x,
              insetBlockStart: state.y
            }
          },
          React.createElement(
            'span',
            { className: classes.tooltipLabel },
            React.createElement('strong', null, state.label)
          ),
          React.createElement('span', { className: classes.tooltipColorBar, style: { backgroundColor: state.color } }),
          React.createElement('span', null, 'Start: ', state.startTime),
          state.isMilestone ? null : React.createElement('span', null, 'Duration: ', state.duration),
          React.createElement('span', null, 'End:', state.startTime + state.duration)
        )
      : null
  );
});
