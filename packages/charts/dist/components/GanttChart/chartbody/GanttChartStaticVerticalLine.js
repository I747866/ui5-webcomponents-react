import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine = ({ GanttStart, totalDuration, time }) => {
    return (React.createElement("div", { style: {
            position: 'absolute',
            left: `${((time + 1 - GanttStart) / totalDuration) * 100}%`,
            top: -5,
            width: 1,
            height: '105%',
            pointerEvents: 'none',
            borderLeft: `1px dashed ${ThemingParameters.sapLegendColor2}`
        } },
        React.createElement("div", { style: {
                top: '-1px',
                position: 'absolute',
                left: '-2.3px',
                width: `4px`,
                height: `4px`,
                backgroundColor: ThemingParameters.sapLegendColor2,
                transform: 'rotate(45deg)',
                pointerEvents: 'none'
            } })));
};
export { GanttChartStaticVerticalLine };
