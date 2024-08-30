import type { CommonProps } from '@ui5/webcomponents-react';
import { throttle } from '@ui5/webcomponents-react-base';
import type { CSSProperties, ReactNode } from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { GanttChartBody } from './chartbody/GanttChartBody.js';
import { GanttChartColumnLabel } from './headers/GanttChartColumnLabel.js';
import { GanttChartRowLabels } from './headers/GanttChartRowLabels.js';
import { GanttChartRowTitle } from './headers/GanttChartRowTitle.js';
import { GanttChartPlaceholder } from './Placeholder.js';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from './types/GanttChartTypes.js';
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  INVALID_DISCRETE_LABELS_MESSAGE,
  MOUSE_CURSOR_AUTO,
  MOUSE_CURSOR_GRAB,
  MOUSE_CURSOR_GRABBING,
  ROW_TITLE_WIDTH,
  ROW_STATUS_WIDTH
} from './util/constants.js';
import { InvalidDiscreteLabelError } from './util/error.js';
import { useStyles } from './util/styles.js';
import { countAllRows } from './util/utils.js';

interface GanttChartProps extends CommonProps {
  /**
   * The data is an array of objects that is displayed on the chart.
   */
  dataset?: IGanttChartRow[];

  /**
   * The total duration of the Gantt.
   */
  totalDuration?: number;

  /**
   * The total width of the chart. If not supplied, the chart's
   * width expands to fill its conatainer.
   */
  width?: CSSProperties['width'];

  /**
   * The height the row of the Gantt.
   */
  rowHeight?: number;

  /**
   * Whether the Gantt is a continuous Gantt or broken
   * into discrete sections.
   */
  isDiscrete?: boolean;

  /**
   * Defines the annonations to be applied on top on the chart.
   *
   * **Note:** Use the `GanttChartAnnotation` component here.
   */
  annotations?: ReactNode | ReactNode[];

  /**
   * A callback function that is applied when a task is clicked.
   */
  onTaskClick?: (task: Record<string, any>, event: React.MouseEvent) => void;

  /**
   * Toggles the visibility of the annotations applied to the chart.
   */
  showAnnotation?: boolean;

  /**
   * Toggles the visibility of the connections of the task and milestone
   * items in the chart.
   */
  showConnection?: boolean;

  /**
   * Toggles the visibility of the status column in the chart.
   */

  showStatus?: boolean;

  /**
   * Toggles the visibility of the line that appears when hovering over
   * the chart.
   */
  showVerticalLineOnHover?: boolean;

  /**
   * Toggles the visibility of the static vertical line in the chart.
   */
  showStaticVerticalLine?: boolean;

  /**
   * The position of the static vertical line in the
   */
  staticVerticalLinePosition?: number;

  /**
   * Toggles the visibility of the tooltip.
   */
  hideTooltip?: boolean;

  /**
   * The unit of the duration of the Gantt.
   */
  unit?: string;

  /**
   * The label for the activity axis.
   */
  rowTitle?: string;

  /**
   * The label for the title of the duration axis.
   */
  columnTitle?: string;

  /**
   * The label for the columns if the chart is separated into discrete columns
   * based on if `isDiscrete` is true. If set, the length of this array
   * __must__ be equal to the `totalDuration`. If not set, an
   * array of numbers with size equal to the `totalDuration` and with values
   * starting from the value __start__ prop of the `GanttChart` will be used.
   */
  discreteLabels?: string[];

  /**
   * The starting value of the Gantt duration.
   */
  start?: number;

  /**
   * A callback function that is applied to each value in the tick and tootltip
   * to format how it is displayed.
   */
  valueFormat?: (value: number) => string;
}

/**
 * > __Experimental Component!__ <br />
 * > This component is experimental and not subject to semantic versioning.
 * > Therefore, you could face breaking changes when updating versions.
 * > Please use with caution!
 *
 * A `GanttChart` is a data visualization chart that can be used to represent
 * Gantt charts or any other Gantt-based visualizations. The component has a
 * rich set of various properties that allows the user to:
 * * Zoom the chart body to see the visualizations clearer using the mouse wheel.
 * * Pan the zoomed chart horizonatally by holding down the left click button.
 * * Add annotations to highlight or illustrate different points on the Gantt.
 * * Use annotations to create custom Gantt visualizations.
 * * Choose whether the Gantt is discrete or continous.
 * * Show relationships between different items on the Gantt using different
 * connections.
 */
const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>(
  (
    {
      dataset,
      totalDuration = 10,
      width = DEFAULT_WIDTH,
      rowHeight = DEFAULT_ROW_HEIGHT,
      isDiscrete,
      onTaskClick,
      annotations,
      showAnnotation,
      showVerticalLineOnHover,
      showStaticVerticalLine,
      staticVerticalLinePosition,
      hideTooltip,
      unit,
      rowTitle = 'Component',
      columnTitle = '',
      discreteLabels,
      start = 0,
      valueFormat = (x: number) => x.toFixed(1),
      showStatus = true,
      ...rest
    },
    fRef
  ) => {
    const [openRowIndex, setOpenRowIndex] = useState<OpenRowIndex>(null);
    const [openSubRowIndexes, setOpenSubRowIndexes] = useState<OpenSubRowIndexes>({});
    const [numOfRows, setNumOfRows] = useState<number>(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
    const height = rowHeight * numOfRows + COLUMN_HEADER_HEIGHT;

    const style: CSSProperties = {
      height: `${height}px`,
      width: width,
      gridTemplateColumns: showStatus ? `${ROW_TITLE_WIDTH}px ${ROW_STATUS_WIDTH}px auto` : `${ROW_TITLE_WIDTH}px auto`
    };

    const ref = useRef(null);
    const bodyConRef = useRef<HTMLDivElement>(null);
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

    // const scaleChartBody = (value: number) => setChartBodyScale(value);
    //
    // const resetScroll = () => {
    //   bodyConRef.current.scrollTo({ left: 0 });
    // };

    useEffect(() => {
      setNumOfRows(() => countAllRows(dataset, openRowIndex, openSubRowIndexes));
    }, [dataset, numOfRows, openRowIndex, openSubRowIndexes]);

    const handleClick = (index: number): void => {
      if (openRowIndex === index) {
        setOpenRowIndex(null);
      } else {
        setOpenRowIndex(index);
      }
      setOpenSubRowIndexes({});
    };

    const handleSubClick = (parentIndex: number, index: number): void => {
      setOpenSubRowIndexes((prevState) => ({
        ...prevState,
        [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
      }));
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (chartBodyScale > 1) {
        setIsGrabbed(true);
        setMPos(e.clientX);
      }
    };

    const onMouseUp = () => {
      if (chartBodyScale > 1) setIsGrabbed(false);
    };

    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isGrabbed) {
        const dx = e.clientX - mPos;
        // Make negative so that the scrolling can move in
        // same direction as the mouse
        bodyConRef.current.scrollBy({ left: -dx });
        setMPos(e.clientX);
      }
    };

    const onMouseMove = useRef(throttle(mouseMoveHandler, 200, { trailing: false }));

    const getCursor = (): string => {
      if (isGrabbed) return MOUSE_CURSOR_GRABBING;
      if (chartBodyScale > 1) return MOUSE_CURSOR_GRAB;
      return MOUSE_CURSOR_AUTO;
    };

    const unscaledBodyWidth = showStatus
      ? dimensions.width - ROW_TITLE_WIDTH - ROW_STATUS_WIDTH
      : dimensions.width - ROW_TITLE_WIDTH;
    const bodyWidth = unscaledBodyWidth * chartBodyScale;

    if (!dataset || dataset?.length === 0) {
      return <GanttChartPlaceholder />;
    }

    return (
      <div ref={fRef} {...rest}>
        <div className={classes.main} ref={ref} style={style} data-component-name="GanttChart">
          <div style={{ width: ROW_TITLE_WIDTH, height: height }}>
            <GanttChartRowTitle width={ROW_TITLE_WIDTH} height={COLUMN_HEADER_HEIGHT} rowTitle={rowTitle} />
            <GanttChartRowLabels
              width={ROW_TITLE_WIDTH}
              height={height - COLUMN_HEADER_HEIGHT}
              rowHeight={rowHeight}
              dataset={dataset}
              dataType="label"
              handleClick={handleClick}
              handleSubClick={handleSubClick}
              openRowIndex={openRowIndex}
              openSubRowIndexes={openSubRowIndexes}
              numOfRows={numOfRows}
            />
          </div>
          {showStatus ? (
            <div style={{ width: ROW_STATUS_WIDTH, height: height, textAlign: 'center' }}>
              <GanttChartRowTitle width={ROW_STATUS_WIDTH} height={COLUMN_HEADER_HEIGHT} rowTitle={'Status'} />
              <GanttChartRowLabels
                width={ROW_STATUS_WIDTH}
                height={height - COLUMN_HEADER_HEIGHT}
                rowHeight={rowHeight}
                dataset={dataset}
                dataType="status"
                openRowIndex={openRowIndex}
                openSubRowIndexes={openSubRowIndexes}
                numOfRows={numOfRows}
              />
            </div>
          ) : null}
          <div
            data-component-name="GanttChartBodyContainer"
            className={classes.bodyContainer}
            ref={bodyConRef}
            style={{
              width: unscaledBodyWidth,
              height: height,
              cursor: getCursor()
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove.current}
          >
            <div
              className={classes.columnTitle}
              style={{
                width: unscaledBodyWidth,
                height: COLUMN_HEADER_HEIGHT / 2,
                lineHeight: `${COLUMN_HEADER_HEIGHT / 2}px`
              }}
            >
              {columnTitle} {unit != null ? `(${unit})` : ''}
            </div>
            <GanttChartColumnLabel
              width={bodyWidth}
              height={COLUMN_HEADER_HEIGHT}
              isDiscrete={isDiscrete}
              totalDuration={totalDuration}
              unit={unit}
              columnLabels={discreteLabels}
              start={start}
              unscaledWidth={unscaledBodyWidth}
              valueFormat={valueFormat}
            />
            <GanttChartBody
              dataset={dataset}
              width={bodyWidth}
              height={height - COLUMN_HEADER_HEIGHT}
              rowHeight={rowHeight}
              numOfItems={numOfRows}
              totalDuration={totalDuration}
              isDiscrete={isDiscrete}
              annotations={annotations}
              showAnnotation={showAnnotation}
              showTooltip={!hideTooltip}
              showVerticalLineOnHover={showVerticalLineOnHover}
              showStaticVerticalLine={showStaticVerticalLine}
              staticVerticalLinePosition={staticVerticalLinePosition}
              unit={unit}
              // onScale={scaleChartBody}
              start={start}
              valueFormat={valueFormat}
              // resetScroll={resetScroll}
              unscaledWidth={unscaledBodyWidth}
              onTaskClick={onTaskClick}
              openRowIndex={openRowIndex}
              openSubRowIndexes={openSubRowIndexes}
            />
          </div>
        </div>
      </div>
    );
  }
);

GanttChart.displayName = 'GanttChart';

export { GanttChart };