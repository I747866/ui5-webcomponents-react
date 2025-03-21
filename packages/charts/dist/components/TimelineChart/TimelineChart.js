import { throttle } from '@ui5/webcomponents-react-base';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TimelineChartBody } from './chartbody/TimelineChartBody.js';
import { TimelineChartPlaceholder } from './Placeholder.js';
import { TimelineChartColumnLabel, TimelineChartRowTitle, TimelineChartRowLabels } from './TimelineChartHeaders.js';
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  ILLEGAL_CONNECTION_MESSAGE,
  INVALID_DISCRETE_LABELS_MESSAGE,
  MOUSE_CURSOR_AUTO,
  MOUSE_CURSOR_GRAB,
  MOUSE_CURSOR_GRABBING,
  ROW_TITLE_WIDTH
} from './util/constants.js';
import { IllegalConnectionError, InvalidDiscreteLabelError } from './util/error.js';
import { useStyles } from './util/styles.js';
/**
 * > __Experimental Component!__ <br />
 * > This component is experimental and not subject to semantic versioning.
 * > Therefore, you could face breaking changes when updating versions.
 * > Please use with caution!
 *
 * A `TimelineChart` is a data visualization chart that can be used to represent
 * Gantt charts or any other timeline-based visualizations. The component has a
 * rich set of various properties that allows the user to:
 * * Zoom the chart body to see the visualizations clearer using the mouse wheel.
 * * Pan the zoomed chart horizonatally by holding down the left click button.
 * * Add annotations to highlight or illustrate different points on the timeline.
 * * Use annotations to create custom Timeline visualizations.
 * * Choose whether the timeline is discrete or continous.
 * * Show relationships between different items on the timeline using different
 * connections.
 */
const TimelineChart = forwardRef(
  (
    {
      dataset,
      totalDuration = 10,
      width = DEFAULT_WIDTH,
      rowHeight = DEFAULT_ROW_HEIGHT,
      isDiscrete,
      annotations,
      showAnnotation,
      showConnection,
      hideTooltip,
      unit,
      rowTitle = 'Activities',
      columnTitle = 'Duration',
      discreteLabels,
      start = 0,
      valueFormat = (x) => x.toFixed(1),
      ...rest
    },
    fRef
  ) => {
    const numOfRows = dataset?.length ?? 0;
    const height = rowHeight * numOfRows + COLUMN_HEADER_HEIGHT;
    const style = {
      height: `${height}px`,
      width: width,
      gridTemplateColumns: `${ROW_TITLE_WIDTH}px auto`
    };
    const ref = useRef(null);
    const bodyConRef = useRef(null);
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
      chartWidth: 0,
      chartHeight: 0
    });
    const [chartBodyScale, setChartBodyScale] = useState(1);
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [mPos, setMPos] = useState(0);
    const classes = useStyles();
    useEffect(() => {
      const ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const width = entry.contentBoxSize[0].inlineSize;
          const height = entry.contentBoxSize[0].blockSize;
          setDimensions({
            width: width,
            height: height,
            chartWidth: width - ROW_TITLE_WIDTH,
            chartHeight: height - COLUMN_HEADER_HEIGHT
          });
          setChartBodyScale(1);
        });
      });
      if (ref.current != null) ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
    useEffect(() => {
      if (isDiscrete && discreteLabels != null && discreteLabels.length !== totalDuration) {
        throw new InvalidDiscreteLabelError(INVALID_DISCRETE_LABELS_MESSAGE);
      }
    }, [isDiscrete, discreteLabels, totalDuration]);
    useEffect(() => {
      if (showConnection && dataset?.length > 0) {
        validateConnections(dataset);
      }
    }, [showConnection, dataset]);
    const scaleChartBody = (value) => setChartBodyScale(value);
    const resetScroll = () => {
      bodyConRef.current.scrollTo({ left: 0 });
    };
    const onMouseDown = (e) => {
      if (chartBodyScale > 1) {
        setIsGrabbed(true);
        setMPos(e.clientX);
      }
    };
    const onMouseUp = () => {
      if (chartBodyScale > 1) setIsGrabbed(false);
    };
    const mouseMoveHandler = (e) => {
      if (isGrabbed) {
        const dx = e.clientX - mPos;
        // Make negative so that the scrolling can move in
        // same direction as the mouse
        bodyConRef.current.scrollBy({ left: -dx });
        setMPos(e.clientX);
      }
    };
    const onMouseMove = useRef(throttle(mouseMoveHandler, 200, { trailing: false }));
    const getCursor = () => {
      if (isGrabbed) return MOUSE_CURSOR_GRABBING;
      if (chartBodyScale > 1) return MOUSE_CURSOR_GRAB;
      return MOUSE_CURSOR_AUTO;
    };
    const unscaledBodyWidth = dimensions.width - ROW_TITLE_WIDTH;
    const bodyWidth = unscaledBodyWidth * chartBodyScale;
    if (!dataset || dataset?.length === 0) {
      return React.createElement(TimelineChartPlaceholder, null);
    }
    return React.createElement(
      'div',
      { ref: fRef, ...rest },
      React.createElement(
        'div',
        { className: classes.main, ref: ref, style: style, 'data-component-name': 'TimelineChart' },
        React.createElement(
          'div',
          { style: { width: ROW_TITLE_WIDTH, height: height } },
          React.createElement(TimelineChartRowTitle, {
            width: ROW_TITLE_WIDTH,
            height: COLUMN_HEADER_HEIGHT,
            rowTitle: rowTitle
          }),
          React.createElement(TimelineChartRowLabels, {
            width: ROW_TITLE_WIDTH,
            height: height - COLUMN_HEADER_HEIGHT,
            rowHeight: rowHeight,
            dataset: dataset
          })
        ),
        React.createElement(
          'div',
          {
            'data-component-name': 'TimelineChartBodyContainer',
            className: classes.bodyContainer,
            ref: bodyConRef,
            style: {
              width: unscaledBodyWidth,
              height: height,
              cursor: getCursor()
            },
            onMouseDown: onMouseDown,
            onMouseUp: onMouseUp,
            onMouseMove: onMouseMove.current
          },
          React.createElement(
            'div',
            {
              className: classes.columnTitle,
              style: {
                width: unscaledBodyWidth,
                height: COLUMN_HEADER_HEIGHT / 2,
                lineHeight: `${COLUMN_HEADER_HEIGHT / 2}px`
              }
            },
            columnTitle,
            ' ',
            unit != null ? `(${unit})` : ''
          ),
          React.createElement(TimelineChartColumnLabel, {
            width: bodyWidth,
            height: COLUMN_HEADER_HEIGHT,
            isDiscrete: isDiscrete,
            totalDuration: totalDuration,
            unit: unit,
            columnLabels: discreteLabels,
            start: start,
            unscaledWidth: unscaledBodyWidth,
            valueFormat: valueFormat
          }),
          React.createElement(TimelineChartBody, {
            dataset: dataset,
            width: bodyWidth,
            height: height - COLUMN_HEADER_HEIGHT,
            rowHeight: rowHeight,
            numOfItems: numOfRows,
            totalDuration: totalDuration,
            isDiscrete: isDiscrete,
            annotations: annotations,
            showAnnotation: showAnnotation,
            showConnection: showConnection,
            showTooltip: !hideTooltip,
            unit: unit,
            onScale: scaleChartBody,
            start: start,
            valueFormat: valueFormat,
            resetScroll: resetScroll,
            unscaledWidth: unscaledBodyWidth
          })
        )
      )
    );
  }
);
TimelineChart.displayName = 'TimelineChart';
const validateConnections = (dataset) => {
  for (const row of dataset) {
    if (row.tasks != null) {
      for (const item of row.tasks) {
        if (item.connections != null && item.connections.length !== 0 && item.id == null) {
          throw new IllegalConnectionError(ILLEGAL_CONNECTION_MESSAGE);
        }
      }
    }
    if (row.milestones != null) {
      for (const item of row.milestones) {
        if (item.connections != null && item.connections.length !== 0 && item.id == null) {
          throw new IllegalConnectionError(ILLEGAL_CONNECTION_MESSAGE);
        }
      }
    }
  }
};
export { TimelineChart };
