import { useState } from 'react';
import {
  COLUMN_COMPONENT_WIDTH,
  COLUMN_HEADER_HEIGHT,
  COLUMN_STATUS_WIDTH,
  ROW_CONTRACT_DURATION_HEIGHT
} from '../util/constants.js';
export const useDimensions = (showStatus, rowHeight, numberOfRows) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    chartWidth: 0,
    chartHeight: 0,
    currentChartWidth: 0
  });
  const [chartBodyScale, setChartBodyScale] = useState(1);
  const unscaledBodyWidth = showStatus
    ? dimensions.width - COLUMN_COMPONENT_WIDTH - COLUMN_STATUS_WIDTH
    : dimensions.width - COLUMN_COMPONENT_WIDTH;
  const bodyWidth = unscaledBodyWidth * chartBodyScale;
  const height = rowHeight * numberOfRows + COLUMN_HEADER_HEIGHT + ROW_CONTRACT_DURATION_HEIGHT;
  const gridTemplateColumns = showStatus
    ? `${COLUMN_COMPONENT_WIDTH}px ${COLUMN_STATUS_WIDTH}px auto`
    : `${COLUMN_COMPONENT_WIDTH}px auto`;
  return { dimensions, height, bodyWidth, gridTemplateColumns, setDimensions, chartBodyScale, setChartBodyScale };
};
