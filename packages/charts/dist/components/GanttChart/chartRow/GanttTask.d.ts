import React from 'react';
import type { IGanttChartTask } from '../types/GanttChartTypes.js';
interface GanttTaskProps {
  /**
   * The unique id of the task. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;
  /**
   * The starting time of the task on the Gantt. Can
   * also be seen as the x-offset of the task. It is a
   * percentage of the total rendered duration of the
   * Gantt.
   */
  startTime: number;
  /**
   * Duration of the task.
   */
  duration: number;
  /**
   * The total duration of the Gantt. This helps in knowing
   * where to position the milestone.
   */
  totalDuration: number;
  GanttStart: number;
  showTooltip: (
    mouseX: number,
    mouseY: number,
    name: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;
  /**
   * Callback function to handle the click event on the task.
   */
  handleTaskClick: (parentId: string, task: IGanttChartTask, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  task: IGanttChartTask;
  parentId: string;
}
export declare const GanttTask: {
  ({
    id,
    startTime,
    duration,
    totalDuration,
    GanttStart,
    showTooltip,
    hideTooltip,
    handleTaskClick,
    task,
    parentId
  }: GanttTaskProps): React.JSX.Element;
  displayName: string;
};
export {};
