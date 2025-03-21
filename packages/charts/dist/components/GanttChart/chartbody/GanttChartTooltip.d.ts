import React from 'react';
export interface GanttTooltipHandle {
  onHoverItem: (
    mouseX: number,
    mouseY: number,
    label: string,
    startTime: number,
    duration: number,
    color: string,
    isMilestone: boolean
  ) => void;
  onLeaveItem: () => void;
}
export declare const GanttChartTooltip: React.ForwardRefExoticComponent<React.RefAttributes<GanttTooltipHandle>>;
