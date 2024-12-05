import type { CSSProperties, ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { GanttChartRowGroup } from '../chartRow/GanttChartRowGroup.js';
import type {
  DateRange,
  IGanttChartRow,
  OpenRowIndex,
  OpenSubRowIndexes,
  IGanttChartEvent,
  IGanttChartTask
} from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { getStartTime } from '../util/utils.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
import type { GanttTooltipHandle } from './GanttChartTooltip.js';

export interface GanttChartBodyProps {
  dataset: IGanttChartRow[];
  width?: number;
  height?: number;
  rowHeight: number;
  numOfItems: number;
  totalDuration: number;
  contractDuration: DateRange;
  annotations?: ReactNode | ReactNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick?: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  onEventClick: (events: IGanttChartEvent[], e: React.MouseEvent) => void;
  showAnnotation?: boolean;
  showVerticalLineOnHover?: boolean;
  showStaticVerticalLine?: boolean;
  staticVerticalLinePosition?: string;
  unscaledWidth?: number;
  openRowIndexes: OpenRowIndex;
  openSubRowIndexes: OpenSubRowIndexes;
  chartBodyScale: number;
  shouldEventsBeGrouped: boolean;
}


const GanttChartBody = (props: GanttChartBodyProps) => {
  const {
    dataset,
    width,
    rowHeight,
    numOfItems,
    totalDuration,
    contractDuration,
    handleTaskClick,
    annotations,
    showAnnotation,
    showVerticalLineOnHover,
    showStaticVerticalLine,
    staticVerticalLinePosition,
    openRowIndexes,
    openSubRowIndexes,
    chartBodyScale,
    onEventClick,
    shouldEventsBeGrouped
  } = props;
  const classes = useStyles();
  const tooltipRef = useRef<GanttTooltipHandle>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [verticalLinePosition, setVerticalLinePosition] = useState<number | null>(null);

  const style: CSSProperties = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
  };

  const showTooltipOnHover = (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => {
    tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
  };
  const hideTooltip = () => tooltipRef.current?.onLeaveItem();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bodyRef.current.getBoundingClientRect();
    if (rect) {
      setVerticalLinePosition(e.clientX - rect.left);
    }
  };

  const onMouseLeave = () => {
    setVerticalLinePosition(null);
  };

  const handleEventsClick = (events: IGanttChartEvent[], e: React.MouseEvent) => {
    onEventClick?.(events, e);
  };

  return (
    <div
      data-component-name="GanttChartBody"
      ref={bodyRef}
      className={classes.chartBody}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <GanttChartLayer name="GanttChartRowsLayer" ignoreClick>
        <GanttChartRowGroup
          dataset={dataset}
          rowHeight={rowHeight}
          totalDuration={totalDuration}
          contractDuration={contractDuration}
          GanttStart={0}
          showTooltip={showTooltipOnHover}
          hideTooltip={hideTooltip}
          handleTaskClick={handleTaskClick}
          openRowIndexes={openRowIndexes}
          openSubRowIndexes={openSubRowIndexes}
          chartBodyScale={chartBodyScale}
          ganttChartBodyWidth={width}
          handleEventsClick={handleEventsClick}
          shouldEventsBeGrouped={shouldEventsBeGrouped}
        />
      </GanttChartLayer>

      {showAnnotation && annotations != null ? (
        <GanttChartLayer name="GanttChartAnnotationLayer" isAnnotation ignoreClick>
          <GanttChartBodyCtx.Provider value={{ chartBodyWidth: width }}>{annotations}</GanttChartBodyCtx.Provider>
        </GanttChartLayer>
      ) : null}

      {showVerticalLineOnHover && verticalLinePosition && (
        <GanttChartHoverVerticalLine verticalLinePosition={verticalLinePosition} />
      )}
      {showStaticVerticalLine && (
        <GanttChartStaticVerticalLine
          time={getStartTime(contractDuration.dateStart, staticVerticalLinePosition)}
          totalDuration={totalDuration}
          GanttStart={0}
        />
      )}
    </div>
  );
};

export { GanttChartBody };
