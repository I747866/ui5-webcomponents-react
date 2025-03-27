import type { ReactNode } from 'react';
import React, { useRef, useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { GanttChartBody } from '../chartbody/GanttChartBody.js';
import { GanttChartTimeline } from '../headers/GanttChartTimeline/GanttChartTimeline.js';
import type {
  DateRange,
  DimensionsState,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
} from '../types/GanttChartTypes.js';
import {
  COLUMN_COMPONENT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  MOUSE_CURSOR_AUTO,
  MOUSE_CURSOR_GRAB,
  MOUSE_CURSOR_GRABBING,
  ROW_CONTRACT_DURATION_HEIGHT
} from '../util/constants.js';
import { useStyles } from '../util/styles.js';

export interface GanttChartBodyColumnProps {
  dataset: IGanttChartRow[];
  dimensions: DimensionsState;
  chartBodyScale: number;
  height: number;
  rowHeight: number;
  numberOfRows: number;
  totalDuration: number;
  contractDuration: DateRange;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  showStatus?: boolean;
  staticVerticalLinePosition?: string;
  annotations?: ReactNode | ReactNode[];
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  shouldEventsBeGrouped: boolean;
}

export const GanttChartBodyColumn = (props: GanttChartBodyColumnProps) => {
  const {
    dataset,
    dimensions,
    chartBodyScale,
    height,
    rowHeight,
    numberOfRows,
    totalDuration,
    contractDuration,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    showStatus,
    staticVerticalLinePosition,
    openRowIndexes,
    openSubRowIndexes,
    handleTaskClick,
    onEventClick,
    shouldEventsBeGrouped
  } = props;
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [mPos, setMPos] = useState(0);
  const classes = useStyles();

  const bodyConRef = useRef<HTMLDivElement>(null);

  const unscaledBodyWidth = showStatus
    ? dimensions.width - COLUMN_COMPONENT_WIDTH - COLUMN_STATUS_WIDTH
    : dimensions.width - COLUMN_COMPONENT_WIDTH;
  const bodyWidth = unscaledBodyWidth * chartBodyScale;

  const getCursor = (): string => {
    if (isGrabbed) return MOUSE_CURSOR_GRABBING;
    if (chartBodyScale > 1) return MOUSE_CURSOR_GRAB;
    return MOUSE_CURSOR_AUTO;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (chartBodyScale > 1) {
      // Prevents browser from triggering auto-scroll when grabbing the chart and moving the mouse to the edge
      // (native "edge scroll" behavior), and accidentally selecting text while moving the chart on drag
      bodyConRef.current.style.userSelect = 'none';
      setIsGrabbed(true);
      setMPos(e.clientX);
    }
  };

  const throttledMouseMove = throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isGrabbed) {
      e.preventDefault();
      const dx = e.clientX - mPos;
      bodyConRef.current?.scrollBy({ left: -dx });
      setMPos(e.clientX);
    }
  }, 16); // roughly 60fps

  useEffect(() => {
    const handleMouseUp = () => {
      bodyConRef.current.style.userSelect = '';
      if (chartBodyScale > 1 && isGrabbed) {
        setIsGrabbed(false);
      }
    };
    // handleMouseUp needs to be attached to the window so that it can stop moving the chart if user moves mouse off the component boundaries
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isGrabbed]);

  return (
    <div
      data-component-name="GanttChartBodyContainer"
      className={classes.bodyContainer}
      ref={bodyConRef}
      style={{
        width: unscaledBodyWidth + 12,
        height: height,
        cursor: getCursor(),
        overflowX: 'auto',
        paddingBottom: `15px`
      }}
      onMouseDown={onMouseDown}
      onMouseMove={throttledMouseMove}
    >
      <GanttChartTimeline
        width={bodyWidth}
        height={COLUMN_HEADER_HEIGHT}
        totalDuration={totalDuration}
        contractDuration={contractDuration}
      />
      <GanttChartBody
        dataset={dataset}
        width={bodyWidth}
        chartBodyScale={chartBodyScale}
        height={height - COLUMN_HEADER_HEIGHT - ROW_CONTRACT_DURATION_HEIGHT}
        rowHeight={rowHeight}
        numOfItems={numberOfRows}
        totalDuration={totalDuration}
        contractDuration={contractDuration}
        annotations={annotations}
        showAnnotation={showAnnotation}
        showVerticalLineOnHover={showVerticalLineOnHover}
        showStaticVerticalLine={showStaticVerticalLine}
        staticVerticalLinePosition={staticVerticalLinePosition}
        unscaledWidth={unscaledBodyWidth}
        handleTaskClick={handleTaskClick}
        onEventClick={onEventClick}
        openRowIndexes={openRowIndexes}
        openSubRowIndexes={openSubRowIndexes}
        shouldEventsBeGrouped={shouldEventsBeGrouped}
      />
    </div>
  );
};
