import React, { useEffect, useState } from 'react';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { countTaskDuration, getStartTime, groupOverlappingEvents } from '../util/utils.js';
import { GanttChartEvent } from './GanttChartEvent.js';
import { GanttTask } from './GanttTask.js';
/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
export const GanttChartRow = ({ rowData, rowHeight, rowIndex, totalDuration, GanttStart, showTooltip, hideTooltip, handleTaskClick, contractDuration, chartBodyScale, ganttChartBodyWidth, handleEventsClick, shouldEventsBeGrouped, ...rest }) => {
    const [rowDataEvents, setRowDataEvents] = useState([]);
    const [groupedRowDataEvents, setGroupedRowDataEvents] = useState([]);
    const EVENT_ICON_SIZE = 16;
    useEffect(() => {
        const events = [];
        rowData.tasks?.forEach((task) => {
            if (task.events) {
                task.events.forEach((event) => {
                    events.push(event);
                });
            }
        });
        setRowDataEvents(events);
    }, [rowData]);
    useEffect(() => {
        setGroupedRowDataEvents(shouldEventsBeGrouped
            ? groupOverlappingEvents(rowDataEvents, contractDuration.dateStart, getStartTime(contractDuration?.dateStart, rowData?.tasks[0]?.dateStart), totalDuration, ganttChartBodyWidth, EVENT_ICON_SIZE)
            : []);
    }, [
        rowDataEvents,
        contractDuration,
        rowData,
        totalDuration,
        chartBodyScale,
        ganttChartBodyWidth,
        shouldEventsBeGrouped
    ]);
    return (React.createElement("svg", { x: "0", y: `${rowIndex * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}`, width: "100%", overflow: 'visible', height: `${rowHeight}`, style: { pointerEvents: 'none' }, "data-component-name": "GanttChartRow", ...rest },
        rowData.tasks?.map((task, index) => {
            return (React.createElement(GanttTask, { key: task.id + index + task.dateStart + task.dateEnd, id: task.id, startTime: getStartTime(contractDuration?.dateStart, task.dateStart), duration: countTaskDuration(task.dateStart, task.dateEnd), totalDuration: totalDuration, GanttStart: GanttStart, showTooltip: showTooltip, hideTooltip: hideTooltip, handleTaskClick: handleTaskClick, task: task, parentId: rowData.id }));
        }),
        React.createElement("g", null, groupedRowDataEvents.map((group) => (React.createElement(GanttChartEvent, { key: group.key, events: group.events, iconSize: EVENT_ICON_SIZE, position: `${(group.startTime / totalDuration) * 100}%`, handleEventsClick: handleEventsClick, groupIcon: group?.groupIcon }))))));
};
GanttChartRow.displayName = 'GanttChartRow';
