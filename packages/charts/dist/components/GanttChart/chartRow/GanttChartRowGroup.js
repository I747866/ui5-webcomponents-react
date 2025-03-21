import React, { useEffect, useState } from 'react';
import { flattenDataset } from '../util/utils.js';
import { GanttChartRow } from './GanttChartRow.js';
import { GanttContractDuration } from './GanttContractDuration.js';
export const GanttChartRowGroup = (props) => {
  const {
    dataset,
    rowHeight,
    totalDuration,
    contractDuration,
    GanttStart,
    showTooltip,
    handleTaskClick,
    hideTooltip,
    openRowIndexes,
    openSubRowIndexes,
    chartBodyScale,
    ganttChartBodyWidth,
    handleEventsClick,
    shouldEventsBeGrouped
  } = props;
  const [flattenedDataset, setFlattenedDataset] = useState([]);
  useEffect(() => {
    setFlattenedDataset(flattenDataset(dataset, openRowIndexes, openSubRowIndexes));
  }, [dataset, openRowIndexes, openSubRowIndexes]);
  return React.createElement(
    'svg',
    { width: '100%', height: '100%', overflow: 'visible' },
    React.createElement(GanttContractDuration, { contractDuration: contractDuration }),
    flattenedDataset.map((data, index) => {
      return React.createElement(GanttChartRow, {
        key: index,
        rowData: data,
        rowHeight: rowHeight,
        rowIndex: index,
        totalDuration: totalDuration,
        GanttStart: GanttStart,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        handleTaskClick: handleTaskClick,
        contractDuration: contractDuration,
        chartBodyScale: chartBodyScale,
        ganttChartBodyWidth: ganttChartBodyWidth,
        handleEventsClick: handleEventsClick,
        shouldEventsBeGrouped: shouldEventsBeGrouped
      });
    })
  );
};
GanttChartRowGroup.displayName = 'GanttChartRowGroup';
