import React from 'react';
interface GanttChartStaticVerticalLine {
    time: number;
    GanttStart: number;
    totalDuration: number;
    onHover: (hovered: boolean) => void;
}
/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
declare const GanttChartStaticVerticalLine: React.FC<GanttChartStaticVerticalLine>;
export { GanttChartStaticVerticalLine };
