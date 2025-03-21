import React, { forwardRef, useEffect, useRef } from 'react';
import { GanttChartBodyColumn } from './chartColumn/GanttChartBodyColumn.js';
import { GanttChartColumn } from './chartColumn/GanttChartColumn.js';
import { GanttChartZoomSlider } from './headers/GanttChartZoomSlider.js';
import { useCollapsableRows } from './hooks/useCollapsableRows.js';
import { useDimensions } from './hooks/useDimensions.js';
import { GanttChartPlaceholder } from './Placeholder.js';
import {
  DEFAULT_ROW_HEIGHT,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  CONTROLS_ROW_HEIGHT,
  COLUMN_COMPONENT_TITLE,
  COLUMN_COMPONENT_WIDTH,
  COLUMN_STATUS_TITLE
} from './util/constants.js';
import { useStyles } from './util/styles.js';
import { calculateTotalDuration } from './util/utils.js';
const GanttChart = forwardRef((props, fRef) => {
  const {
    dataset,
    contractDuration,
    rowHeight = DEFAULT_ROW_HEIGHT,
    onTaskClick,
    onEventClick,
    onLegendClick,
    onScaleChange,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    showStatus = true,
    shouldEventsBeGrouped = false,
    ...rest
  } = props;
  const { openRowIndexes, openSubRowIndexes, numberOfRows, handleClick, handleSubClick } = useCollapsableRows(dataset);
  const { dimensions, height, bodyWidth, gridTemplateColumns, setDimensions, chartBodyScale, setChartBodyScale } =
    useDimensions(showStatus, rowHeight, numberOfRows);
  const { dateStart, dateEnd } = contractDuration;
  const totalDuration = calculateTotalDuration(contractDuration);
  const style = {
    height: `${height}px`,
    gridTemplateColumns
  };
  const ref = useRef(null);
  const bodyConRef = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const width = entry.contentBoxSize[0].inlineSize;
        const height = entry.contentBoxSize[0].blockSize;
        setDimensions({
          width: width,
          height: height,
          chartWidth: width - COLUMN_COMPONENT_WIDTH,
          chartHeight: height - COLUMN_HEADER_HEIGHT - CONTROLS_ROW_HEIGHT,
          currentChartWidth: bodyWidth
        });
        setChartBodyScale(1);
      });
    });
    if (ref.current != null) ro.observe(ref.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset]);
  const resetScroll = () => {
    bodyConRef.current.scrollTo({ left: 0 });
  };
  if (!dataset || dataset?.length === 0 || !dateStart || !dateEnd) {
    return React.createElement(GanttChartPlaceholder, null);
  }
  const handleTaskClick = (parentId, task, event) => {
    if (onTaskClick) {
      onTaskClick(parentId, task, event);
    }
  };
  const handleScaleChange = (value) => {
    if (onScaleChange) {
      onScaleChange(value);
    }
    setChartBodyScale(value);
  };
  return React.createElement(
    'div',
    { ref: fRef, ...rest },
    React.createElement(GanttChartZoomSlider, {
      onScale: handleScaleChange,
      onLegendClick: onLegendClick,
      dimensions: dimensions,
      resetScroll: resetScroll
    }),
    React.createElement(
      'div',
      { className: classes.main, ref: ref, style: style, 'data-component-name': 'GanttChart' },
      React.createElement(GanttChartColumn, {
        height: height,
        width: COLUMN_COMPONENT_WIDTH,
        columnTitle: COLUMN_COMPONENT_TITLE,
        rowHeight: rowHeight,
        dataset: dataset,
        dataType: 'label',
        handleClick: handleClick,
        handleSubClick: handleSubClick,
        openRowIndexes: openRowIndexes,
        openSubRowIndexes: openSubRowIndexes,
        numberOfRows: numberOfRows,
        showStatus: showStatus
      }),
      showStatus
        ? React.createElement(GanttChartColumn, {
            height: height,
            width: COLUMN_STATUS_WIDTH,
            columnTitle: COLUMN_STATUS_TITLE,
            rowHeight: rowHeight,
            dataset: dataset,
            dataType: 'status',
            openRowIndexes: openRowIndexes,
            openSubRowIndexes: openSubRowIndexes,
            numberOfRows: numberOfRows
          })
        : null,
      React.createElement(GanttChartBodyColumn, {
        dataset: dataset,
        dimensions: dimensions,
        chartBodyScale: chartBodyScale,
        height: height,
        rowHeight: rowHeight,
        numberOfRows: numberOfRows,
        totalDuration: totalDuration,
        contractDuration: contractDuration,
        annotations: annotations,
        showAnnotation: showAnnotation,
        showVerticalLineOnHover: showVerticalLineOnHover,
        showStaticVerticalLine: showStaticVerticalLine,
        showStatus: showStatus,
        staticVerticalLinePosition: staticVerticalLinePosition,
        handleTaskClick: handleTaskClick,
        onEventClick: onEventClick,
        openRowIndexes: openRowIndexes,
        openSubRowIndexes: openSubRowIndexes,
        shouldEventsBeGrouped: shouldEventsBeGrouped
      })
    )
  );
});
GanttChart.displayName = 'GanttChart';
export { GanttChart };
