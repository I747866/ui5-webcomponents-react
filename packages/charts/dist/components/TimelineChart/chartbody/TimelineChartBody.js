import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MAX_BODY_WIDTH, SCALE_FACTOR } from '../util/constants.js';
import { TimelineChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { TimelineChartGrid } from './TimelineChartGrid.js';
import { TimelineChartLayer } from './TimelineChartLayer.js';
import { TimelineChartRowGroup } from './TimelineChartRow.js';
import { TimelineChartConnections } from './TimelineConnections.js';
const TimelineChartBody = ({
  dataset,
  width,
  rowHeight,
  numOfItems,
  totalDuration,
  isDiscrete,
  annotations,
  showAnnotation,
  showConnection,
  showTooltip,
  unit,
  start,
  unscaledWidth,
  onScale,
  valueFormat,
  resetScroll
}) => {
  const classes = useStyles();
  const tooltipRef = useRef(null);
  const bodyRef = useRef(null);
  const scaleExpRef = useRef(0);
  const [displayArrows, setDisplayArrows] = useState(false);
  useEffect(() => {
    const bodyElement = bodyRef.current;
    bodyElement?.addEventListener('wheel', onMouseWheelEvent);
    return () => {
      bodyElement?.removeEventListener('wheel', onMouseWheelEvent);
    };
  }, []);
  const style = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight}px`
  };
  const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
    tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
  };
  const hideTooltip = () => tooltipRef.current?.onLeaveItem();
  const onMouseWheelEvent = (evt) => {
    evt.preventDefault();
    if (evt.deltaY < 0) {
      // Only scale up if scaled width will not exceed MAX_BODY_WIDTH
      const msrWidth = bodyRef.current.getBoundingClientRect().width;
      if (msrWidth * SCALE_FACTOR < MAX_BODY_WIDTH) {
        scaleExpRef.current++;
      }
    } else {
      // Only scale down if scaled width will not be less than original
      // width
      if (scaleExpRef.current > 0) {
        resetScroll();
        scaleExpRef.current--;
      }
    }
    onScale(Math.pow(SCALE_FACTOR, scaleExpRef.current));
  };
  const showArrows = () => setDisplayArrows(true);
  return React.createElement(
    'div',
    { 'data-component-name': 'TimelineChartBody', ref: bodyRef, className: classes.chartBody, style: style },
    React.createElement(
      TimelineChartLayer,
      { name: 'TimelineChartGridLayer', ignoreClick: true },
      React.createElement(TimelineChartGrid, {
        isDiscrete: isDiscrete,
        numOfRows: numOfItems,
        totalDuration: totalDuration,
        rowHeight: rowHeight,
        width: width,
        unscaledWidth: unscaledWidth
      })
    ),
    showConnection && displayArrows
      ? React.createElement(
          TimelineChartLayer,
          { name: 'TimelineChartConnectionLayer', ignoreClick: true },
          React.createElement(TimelineChartConnections, {
            dataSet: dataset,
            width: width,
            rowHeight: rowHeight,
            bodyRect: bodyRef.current?.getBoundingClientRect()
          })
        )
      : null,
    React.createElement(
      TimelineChartLayer,
      { name: 'TimelineChartRowsLayer', ignoreClick: true },
      React.createElement(TimelineChartRowGroup, {
        dataset: dataset,
        rowHeight: rowHeight,
        totalDuration: totalDuration,
        timelineStart: start,
        showTooltip: showTooltipOnHover,
        hideTooltip: hideTooltip,
        postRender: showArrows
      })
    ),
    showAnnotation && annotations != null
      ? React.createElement(
          TimelineChartLayer,
          { name: 'TimelineChartAnnotationLayer', isAnnotation: true, ignoreClick: true },
          React.createElement(TimelineChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations)
        )
      : null,
    showTooltip
      ? React.createElement(TimelineChartTooltip, { ref: tooltipRef, unit: unit, valueFormat: valueFormat })
      : null
  );
};
const TimelineChartTooltip = forwardRef(function TimelineChartTooltip({ unit, valueFormat }, ref) {
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
    { 'data-component-name': 'TimelineChartTooltipContainer', className: classes.tooltipContainer, ref: divRef },
    state.visible
      ? React.createElement(
          'span',
          {
            'data-component-name': 'TimelineChartTooltip',
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
          React.createElement(
            'span',
            null,
            'Start: ',
            valueFormat != null ? valueFormat(state.startTime) : state.startTime,
            unit
          ),
          state.isMilestone
            ? null
            : React.createElement(
                'span',
                null,
                'Duration: ',
                valueFormat != null ? valueFormat(state.duration) : state.duration,
                unit
              ),
          React.createElement(
            'span',
            null,
            'End:',
            ' ',
            valueFormat != null ? valueFormat(state.startTime + state.duration) : state.startTime + state.duration,
            unit
          )
        )
      : null
  );
});
export { TimelineChartBody };
