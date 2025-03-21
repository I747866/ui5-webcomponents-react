import { ThemingParameters, useIsomorphicLayoutEffect } from '@ui5/webcomponents-react-base';
import React, { useState } from 'react';
import { TimelineChartConnection } from '../types/TimelineChartTypes.js';
import { ARROWHEAD_HEIGHT, ARROWHEAD_WIDTH, ARROW_CLEARANCE } from '../util/constants.js';
/**
 * This holds all the arrows that show the connections between different tasks.
 */
const TimelineChartConnections = ({ dataSet, width, rowHeight, bodyRect }) => {
  const [connectionDataState, setConnectionDataState] = useState([]);
  useIsomorphicLayoutEffect(() => {
    const connectionDataArray = [];
    for (let index = 0; index < dataSet.length; index++) {
      const row = dataSet[index];
      if (row.tasks) generateConnectionData(row.tasks, bodyRect, connectionDataArray);
      if (row.milestones) generateConnectionData(row.milestones, bodyRect, connectionDataArray);
    }
    setConnectionDataState(connectionDataArray);
  }, [width]);
  return React.createElement(
    'svg',
    { width: '100%', height: '100%' },
    connectionDataState.map((data, index) => {
      return React.createElement(ConnectionArrow, {
        startX: data.startX,
        endX: data.endX,
        startY: data.startY,
        endY: data.endY,
        key: index,
        rowHeight: rowHeight,
        depType: data.connection
      });
    })
  );
};
/**
 * This component represents the physical arrow that indicates
 * the type of connection between two tasks or items on the
 * chart.
 */
const ConnectionArrow = ({ depType, rowHeight, startX, startY, endX, endY }) => {
  const halfRowHeight = 0.5 * rowHeight;
  const finishX = endX;
  const finishY = endY;
  const arrowColor = ThemingParameters.sapTextColor;
  if (startX === finishX && startY === finishY) {
    // render nothing if the points overlap
    return null;
  }
  if (depType === TimelineChartConnection.Finish_To_Start) {
    return generateF2SArrow(startX, startY, finishX, finishY, arrowColor, halfRowHeight);
  }
  if (depType === TimelineChartConnection.Start_To_Finish) {
    return generateS2FArrow(startX, startY, finishX, finishY, arrowColor, halfRowHeight);
  }
  if (depType === TimelineChartConnection.Start_To_Start) {
    return generateS2SArrow(startX, startY, finishX, finishY, arrowColor);
  }
  if (depType === TimelineChartConnection.Finish_To_Finish) {
    return generateF2FArrow(startX, startY, finishX, finishY, arrowColor);
  }
};
// Generates the finish-to-start arrow
const generateF2SArrow = (startX, startY, finishX, finishY, color, halfRowHeight) => {
  return React.createElement(
    React.Fragment,
    null,
    generateStartingPoint(startX, startY, color),
    startX >= finishX || finishX - startX < 2 * ARROW_CLEARANCE
      ? React.createElement('path', {
          d: `M ${startX} ${startY}
            h ${ARROW_CLEARANCE}
            v ${finishY > startY ? halfRowHeight : -halfRowHeight}
            H ${finishX - ARROW_CLEARANCE}
            V ${finishY}
            H ${finishX}`,
          stroke: color,
          fill: 'transparent'
        })
      : React.createElement('path', {
          d: `M ${startX} ${startY}
            h ${ARROW_CLEARANCE}
            V ${finishY}
            H ${finishX}`,
          stroke: color,
          fill: 'transparent'
        }),
    generateStartFacingHead(finishX, finishY, color)
  );
};
// Generate start-to-finish arrow
const generateS2FArrow = (startX, startY, finishX, finishY, color, halfRowHeight) => {
  return React.createElement(
    React.Fragment,
    null,
    generateStartingPoint(startX, startY, color),
    startX <= finishX || startX - finishX < 2 * ARROW_CLEARANCE
      ? React.createElement('path', {
          d: `M ${startX} ${startY}
            h ${-ARROW_CLEARANCE}
            v ${finishY > startY ? halfRowHeight : -halfRowHeight}
            H ${finishX + ARROW_CLEARANCE}
            V ${finishY}
            H ${finishX}`,
          stroke: color,
          fill: 'transparent'
        })
      : React.createElement('path', {
          d: `M ${startX} ${startY}
            h ${-ARROW_CLEARANCE}
            V ${finishY}
            H ${finishX}`,
          stroke: color,
          fill: 'transparent'
        }),
    generateEndFacingHead(finishX, finishY, color)
  );
};
// Generate start-to-start arrow
const generateS2SArrow = (startX, startY, finishX, finishY, color) => {
  return React.createElement(
    React.Fragment,
    null,
    generateStartingPoint(startX, startY, color),
    React.createElement('path', {
      d: `M ${startX} ${startY}
          h ${startX <= finishX ? -ARROW_CLEARANCE : finishX - startX - ARROW_CLEARANCE}
          V ${finishY}
          H ${finishX}`,
      stroke: color,
      fill: 'transparent'
    }),
    generateStartFacingHead(finishX, finishY, color)
  );
};
// Generate finish-to-finish arrow
const generateF2FArrow = (startX, startY, finishX, finishY, color) => {
  return React.createElement(
    React.Fragment,
    null,
    generateStartingPoint(startX, startY, color),
    React.createElement('path', {
      d: `M ${startX} ${startY}
          h ${startX >= finishX ? ARROW_CLEARANCE : finishX - startX + ARROW_CLEARANCE}
          V ${finishY}
          H ${finishX}`,
      stroke: color,
      fill: 'transparent'
    }),
    generateEndFacingHead(finishX, finishY, color)
  );
};
// Create the starting point indicator
const generateStartingPoint = (x, y, color) => {
  return React.createElement('circle', { cx: `${x}`, cy: `${y}`, r: '1', fill: color });
};
// Create an arrowhead pointing to a task start.
const generateStartFacingHead = (finishX, finishY, color) => {
  return React.createElement('polygon', {
    points: `${finishX}, ${finishY} 
        ${finishX - ARROWHEAD_HEIGHT}, ${finishY - ARROWHEAD_WIDTH / 2} 
        ${finishX - ARROWHEAD_HEIGHT}, ${finishY + ARROWHEAD_WIDTH / 2}`,
    fill: color
  });
};
// Create an arrowhead pointing to a task end.
const generateEndFacingHead = (finishX, finishY, color) => {
  return React.createElement('polygon', {
    points: `${finishX}, ${finishY} 
        ${finishX + ARROWHEAD_HEIGHT}, ${finishY - ARROWHEAD_WIDTH / 2} 
        ${finishX + ARROWHEAD_HEIGHT}, ${finishY + ARROWHEAD_WIDTH / 2}`,
    fill: color
  });
};
const generateConnectionData = (activities, bodyRect, connectionDataArray) => {
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    if (activity.connections == null) continue;
    const startItem = document.getElementById(activity.id);
    if (startItem == null) continue;
    // Get the start points based on the type of connection
    const { x, y, right, height } = startItem.getBoundingClientRect();
    const startY = y + height / 2 - bodyRect.y; // Always same no matter the connection type.
    let startX;
    activity.connections.forEach((item) => {
      if (item.type == null) {
        item.type = TimelineChartConnection.Finish_To_Start;
      }
      const endItem = document.getElementById(item.itemId);
      if (endItem == null) return;
      if (
        item.type === TimelineChartConnection.Finish_To_Finish ||
        item.type === TimelineChartConnection.Finish_To_Start
      ) {
        startX = right - bodyRect.x;
      } else {
        startX = x - bodyRect.x;
      }
      // Get the end points based on the type of connection
      const { x: otherX, y: otherY, right: otherR } = endItem.getBoundingClientRect();
      const endY = otherY + height / 2 - bodyRect.y; // Always same no matter the connection type.
      let endX;
      if (
        item.type === TimelineChartConnection.Start_To_Start ||
        item.type === TimelineChartConnection.Finish_To_Start
      ) {
        endX = otherX - bodyRect.x;
      } else {
        endX = otherR - bodyRect.x;
      }
      connectionDataArray.push({
        startX,
        startY,
        endX,
        endY,
        connection: item.type
      });
    });
  }
};
export { TimelineChartConnections };
