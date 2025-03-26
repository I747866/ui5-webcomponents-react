import React, { useRef, useState } from 'react';
import { GanttChartBody } from '../chartbody/GanttChartBody.js';
import { GanttChartTimeline } from '../headers/GanttChartTimeline/GanttChartTimeline.js';
import { COLUMN_COMPONENT_WIDTH, COLUMN_HEADER_HEIGHT, COLUMN_STATUS_WIDTH, MOUSE_CURSOR_AUTO, MOUSE_CURSOR_GRAB, MOUSE_CURSOR_GRABBING, ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
export const GanttChartBodyColumn = (props) => {
    const { dataset, dimensions, chartBodyScale, height, rowHeight, numberOfRows, totalDuration, contractDuration, annotations, showAnnotation, showVerticalLineOnHover, showStaticVerticalLine, showStatus, staticVerticalLinePosition, openRowIndexes, openSubRowIndexes, handleTaskClick, onEventClick, shouldEventsBeGrouped } = props;
    const [isGrabbed, setIsGrabbed] = useState(false);
    const [mPos, setMPos] = useState(0);
    const classes = useStyles();
    const bodyConRef = useRef(null);
    const unscaledBodyWidth = showStatus
        ? dimensions.width - COLUMN_COMPONENT_WIDTH - COLUMN_STATUS_WIDTH
        : dimensions.width - COLUMN_COMPONENT_WIDTH;
    const bodyWidth = unscaledBodyWidth * chartBodyScale;
    const getCursor = () => {
        if (isGrabbed)
            return MOUSE_CURSOR_GRABBING;
        if (chartBodyScale > 1)
            return MOUSE_CURSOR_GRAB;
        return MOUSE_CURSOR_AUTO;
    };
    const onMouseDown = (e) => {
        if (chartBodyScale > 1) {
            setIsGrabbed(true);
            setMPos(e.clientX);
        }
    };
    const onMouseUp = () => {
        if (chartBodyScale > 1)
            setIsGrabbed(false);
    };
    // TODO: throttle this function!
    const mouseMoveHandler = (e) => {
        if (isGrabbed) {
            const dx = e.clientX - mPos;
            // Make negative so that the scrolling can move in
            // same direction as the mouse
            bodyConRef.current.scrollBy({ left: -dx });
            setMPos(e.clientX);
        }
    };
    return (React.createElement("div", { "data-component-name": "GanttChartBodyContainer", className: classes.bodyContainer, ref: bodyConRef, style: {
            width: unscaledBodyWidth + 12,
            height: height,
            cursor: getCursor(),
            overflowX: 'auto',
            paddingBottom: `15px`
        }, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseMove: mouseMoveHandler },
        React.createElement(GanttChartTimeline, { width: bodyWidth, height: COLUMN_HEADER_HEIGHT, totalDuration: totalDuration, contractDuration: contractDuration }),
        React.createElement(GanttChartBody, { dataset: dataset, width: bodyWidth, chartBodyScale: chartBodyScale, height: height - COLUMN_HEADER_HEIGHT - ROW_CONTRACT_DURATION_HEIGHT, rowHeight: rowHeight, numOfItems: numberOfRows, totalDuration: totalDuration, contractDuration: contractDuration, annotations: annotations, showAnnotation: showAnnotation, showVerticalLineOnHover: showVerticalLineOnHover, showStaticVerticalLine: showStaticVerticalLine, staticVerticalLinePosition: staticVerticalLinePosition, unscaledWidth: unscaledBodyWidth, handleTaskClick: handleTaskClick, onEventClick: onEventClick, openRowIndexes: openRowIndexes, openSubRowIndexes: openSubRowIndexes, shouldEventsBeGrouped: shouldEventsBeGrouped })));
};
