import type { CSSProperties } from 'react';
import React from 'react';
interface GanttTaskProps {
  /**
   * The unique id of the task. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;
  /**
   * The task item label. If not set, the label of the row is used.
   */
  label?: string;
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
  color: CSSProperties['color'];
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
  handleTaskClick: (task: Record<string, any>, event: React.MouseEvent) => void;
  hideTooltip: () => void;
}
export declare const GanttTask: {
  ({
    id,
    label,
    startTime,
    duration,
    totalDuration,
    color,
    GanttStart,
    showTooltip,
    hideTooltip,
    handleTaskClick
  }: GanttTaskProps): React.JSX.Element;
  displayName: string;
};
export {};
