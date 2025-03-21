import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { useState } from 'react';
/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine = ({ GanttStart, totalDuration, time }) => {
    const [isHovered, setIsHovered] = useState(false);
    const lineStype = isHovered ? 'solid' : 'dashed';
    const left = ((time + 1 - GanttStart) / totalDuration) * 100;
    const rectSize = 5;
    const rectOffset = Math.sqrt(rectSize ** 2) / 2;
    return (React.createElement("div", { style: {
            position: 'absolute',
            left: `${left}%`,
            top: -5,
            width: 1,
            height: '105%',
            borderLeft: `1px ${lineStype} ${ThemingParameters.sapLegendColor2}`
        } },
        React.createElement("div", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), title: "Today", style: {
                top: `-1px`,
                position: 'absolute',
                left: `-${rectOffset}px`,
                width: `${rectSize}px`,
                height: `${rectSize}px`,
                backgroundColor: ThemingParameters.sapLegendColor2,
                transform: 'rotate(45deg)'
            } })));
};
export { GanttChartStaticVerticalLine };
