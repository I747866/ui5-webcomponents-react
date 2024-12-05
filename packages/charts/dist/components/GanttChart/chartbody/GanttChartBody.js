import React, { useRef, useState } from 'react';
import { GanttChartRowGroup } from '../chartRow/GanttChartRowGroup.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { useStyles } from '../util/styles.js';
import { getStartTime } from '../util/utils.js';
import { GanttChartHoverVerticalLine } from './GanttChartHoverVerticalLine.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartStaticVerticalLine } from './GanttChartStaticVerticalLine.js';
const GanttChartBody = (props) => {
    const { dataset, width, rowHeight, numOfItems, totalDuration, contractDuration, handleTaskClick, annotations, showAnnotation, showVerticalLineOnHover, showStaticVerticalLine, staticVerticalLinePosition, openRowIndexes, openSubRowIndexes, chartBodyScale, onEventClick, shouldEventsBeGrouped } = props;
    const classes = useStyles();
    const tooltipRef = useRef(null);
    const bodyRef = useRef(null);
    const [verticalLinePosition, setVerticalLinePosition] = useState(null);
    const style = {
        width: `${width}px`,
        height: `${numOfItems * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`
    };
    const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
        tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
    };
    const hideTooltip = () => tooltipRef.current?.onLeaveItem();
    const onMouseMove = (e) => {
        const rect = bodyRef.current.getBoundingClientRect();
        if (rect) {
            setVerticalLinePosition(e.clientX - rect.left);
        }
    };
    const onMouseLeave = () => {
        setVerticalLinePosition(null);
    };
    const handleEventsClick = (events, e) => {
        onEventClick?.(events, e);
    };
    return (React.createElement("div", { "data-component-name": "GanttChartBody", ref: bodyRef, className: classes.chartBody, style: style, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave },
        React.createElement(GanttChartLayer, { name: "GanttChartRowsLayer", ignoreClick: true },
            React.createElement(GanttChartRowGroup, { dataset: dataset, rowHeight: rowHeight, totalDuration: totalDuration, contractDuration: contractDuration, GanttStart: 0, showTooltip: showTooltipOnHover, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick, openRowIndexes: openRowIndexes, openSubRowIndexes: openSubRowIndexes, chartBodyScale: chartBodyScale, ganttChartBodyWidth: width, handleEventsClick: handleEventsClick, shouldEventsBeGrouped: shouldEventsBeGrouped })),
        showAnnotation && annotations != null ? (React.createElement(GanttChartLayer, { name: "GanttChartAnnotationLayer", isAnnotation: true, ignoreClick: true },
            React.createElement(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations))) : null,
        showVerticalLineOnHover && verticalLinePosition && (React.createElement(GanttChartHoverVerticalLine, { verticalLinePosition: verticalLinePosition })),
        showStaticVerticalLine && (React.createElement(GanttChartStaticVerticalLine, { time: getStartTime(contractDuration.dateStart, staticVerticalLinePosition), totalDuration: totalDuration, GanttStart: 0 }))));
};
export { GanttChartBody };
