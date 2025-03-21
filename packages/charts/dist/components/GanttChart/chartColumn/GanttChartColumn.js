import React from 'react';
import { GanttChartRowLabels } from '../headers/GanttChartRowLabels.js';
import { GanttChartRowTitle } from '../headers/GanttChartRowTitle.js';
import { COLUMN_HEADER_HEIGHT } from '../util/constants.js';
import { solidOutline } from '../util/styles.js';
export const GanttChartColumn = (props) => {
  const {
    height,
    width,
    columnTitle,
    rowHeight,
    dataset,
    dataType,
    handleClick,
    handleSubClick,
    openRowIndexes,
    openSubRowIndexes,
    numberOfRows,
    showStatus
  } = props;
  return React.createElement(
    'div',
    {
      style: {
        width,
        height: height,
        textAlign: dataType === 'status' ? 'center' : 'left',
        borderRight: dataType === 'status' || !showStatus ? solidOutline : ''
      }
    },
    React.createElement(GanttChartRowTitle, {
      width: width,
      height: COLUMN_HEADER_HEIGHT,
      title: columnTitle,
      showStatus: showStatus
    }),
    React.createElement(GanttChartRowLabels, {
      width: width,
      height: height - COLUMN_HEADER_HEIGHT,
      rowHeight: rowHeight,
      dataset: dataset,
      dataType: dataType,
      handleClick: handleClick ?? null,
      handleSubClick: handleSubClick ?? null,
      openRowIndexes: openRowIndexes,
      openSubRowIndexes: openSubRowIndexes,
      numOfRows: numberOfRows
    })
  );
};
