import React from 'react';
import type { DateRange, IGanttChartRow } from '../types/GanttChartTypes.js';
import { ROW_CONTRACT_DURATION_HEIGHT } from '../util/constants.js';
import { countTaskDuration, getTaskStartTime } from '../util/utils.js';
import { GanttTask } from './GanttTask.js';

interface GanttChartRowProps {
  rowData: IGanttChartRow;
  rowHeight: number;
  rowIndex: number;
  totalDuration: number;
  GanttStart: number;
  showTooltip: (...x: unknown[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  contractDuration: DateRange;
}

/**
 * This represents each row of the GanttChart. It is used to display
 * the task items and milestones.
 */
export const GanttChartRow = ({
  rowData,
  rowHeight,
  rowIndex,
  totalDuration,
  GanttStart,
  showTooltip,
  hideTooltip,
  handleTaskClick,
  contractDuration,
  ...rest
}: GanttChartRowProps) => {
  return (
    <svg
      x="0"
      y={`${rowIndex * rowHeight + ROW_CONTRACT_DURATION_HEIGHT}`}
      width="100%"
      height={`${rowHeight}`}
      style={{ pointerEvents: 'none' }}
      data-component-name="GanttChartRow"
      {...rest}
    >
      {rowData.tasks?.map((task, index) => {
        return (
          <GanttTask
            key={index + 1}
            id={task.id}
            label={task.status ?? 'Elo'}
            startTime={getTaskStartTime(contractDuration?.dateStart, task.dateStart)}
            duration={countTaskDuration(task.dateStart, task.dateEnd)}
            totalDuration={totalDuration}
            color={task.color}
            GanttStart={GanttStart}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
            handleTaskClick={handleTaskClick}
            events={task.events}
            contractStartDate={contractDuration.dateStart}
          />
        );
      })}
    </svg>
  );
};

GanttChartRow.displayName = 'GanttChartRow';