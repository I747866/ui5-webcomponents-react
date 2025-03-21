import type { CSSProperties } from 'react';
import React from 'react';
interface GanttMilestoneProps {
  /**
   * The unique id of the milestone. This is used to get the position
   * in the DOM and draw any connection arrows pointing to or away
   * from it.
   */
  id?: string;
  /**
   * The milestone label. If not set, the label is just 'Milestone'.
   */
  label?: string;
  /**
   * The position of a milestone on the Gantt. Can
   * also be seen as the x-offset of the milestone. It is a
   * percentage of the total rendered duration of the
   * Gantt.
   */
  time: number;
  /**
   * The total duration of the Gantt. This helps in knowing
   * where to position the milestone.
   */
  totalDuration: number;
  color?: CSSProperties['color'];
  GanttStart: number;
  showTooltip: (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;
  hideTooltip: () => void;
}
export declare const GanttMilestone: {
  ({
    id,
    label,
    time,
    totalDuration,
    color,
    GanttStart,
    showTooltip,
    hideTooltip
  }: GanttMilestoneProps): React.JSX.Element;
  displayName: string;
};
export {};
