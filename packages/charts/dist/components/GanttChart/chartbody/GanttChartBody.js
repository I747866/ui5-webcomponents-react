import React, { useRef, useState } from 'react';
import { GanttChartRowGroup } from '../chartRow/GanttChartRowGroup.js';
import { getMonthsDays } from '../headers/GanttChartTimeline/GanttChartTimelineSupport.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { solidOutline, useStyles } from '../util/styles.js';
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
    const [hoverHeaderText, setHoverHeaderText] = useState('');
    const [hideHoverVerticalLine, setHideHoverVerticalLine] = useState(false);
    const style = {
        width: `${width}px`,
        height: `${numOfItems * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}px`,
        borderBottom: solidOutline
    };
    const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
        tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
    };
    const hideTooltip = () => tooltipRef.current?.onLeaveItem();
    const onMouseMove = (e) => {
        const rect = bodyRef.current.getBoundingClientRect();
        if (rect) {
            const relativeX = e.clientX - rect.left;
            setVerticalLinePosition(relativeX);
            const headerText = getHoverLineHeaderText(relativeX);
            setHoverHeaderText(headerText);
        }
    };
    const onMouseLeave = () => {
        setVerticalLinePosition(null);
    };
    const handleEventsClick = (events, e) => {
        onEventClick?.(events, e);
    };
    const getHoverLineHeaderText = (position) => {
        if (!showVerticalLineOnHover || !contractDuration || !width)
            return '';
        const { dateStart, dateEnd } = contractDuration;
        if (!dateStart || !dateEnd)
            return '';
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
        // Get exact month boundaries, and how many days from begining the hover is now
        const monthsData = getMonthsDays(start, end);
        const hoveredDays = Math.round((position / width) * totalDuration);
        if (hoveredDays === 0)
            return '';
        // Find  month the hover falls on
        let accumulatedDays = 0;
        for (const month of monthsData) {
            accumulatedDays += month.days;
            if (hoveredDays < accumulatedDays) {
                return month.name;
            }
        }
        return monthsData[monthsData.length - 1].name; // fallback to December
    };
    return (React.createElement("div", { "data-component-name": "GanttChartBody", ref: bodyRef, className: classes.chartBody, style: style, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave },
        React.createElement(GanttChartLayer, { name: "GanttChartRowsLayer", ignoreClick: true },
            React.createElement(GanttChartRowGroup, { dataset: dataset, rowHeight: rowHeight, totalDuration: totalDuration, contractDuration: contractDuration, GanttStart: 0, showTooltip: showTooltipOnHover, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick, openRowIndexes: openRowIndexes, openSubRowIndexes: openSubRowIndexes, chartBodyScale: chartBodyScale, ganttChartBodyWidth: width, handleEventsClick: handleEventsClick, shouldEventsBeGrouped: shouldEventsBeGrouped })),
        showAnnotation && annotations != null ? (React.createElement(GanttChartLayer, { name: "GanttChartAnnotationLayer", isAnnotation: true, ignoreClick: true },
            React.createElement(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width } }, annotations))) : null,
        showVerticalLineOnHover && verticalLinePosition != null && !hideHoverVerticalLine ? (React.createElement(GanttChartHoverVerticalLine, { verticalLinePosition: verticalLinePosition, headerText: hoverHeaderText })) : null,
        showStaticVerticalLine && (React.createElement(GanttChartStaticVerticalLine, { time: getStartTime(contractDuration.dateStart, staticVerticalLinePosition), totalDuration: totalDuration, GanttStart: 0, onHover: (hovered) => setHideHoverVerticalLine(hovered) }))));
};
export { GanttChartBody };
