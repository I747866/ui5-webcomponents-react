import { ThemingParameters } from '@ui5/webcomponents-react-base';
import { format } from 'date-fns';
import React, { useState } from 'react';
/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine = ({ GanttStart, totalDuration, time, onHover }) => {
    const [isHovered, setIsHovered] = useState(false);
    const lineStype = isHovered ? 'solid' : 'dashed';
    const cursor = isHovered ? 'pointer' : 'inherit';
    const left = ((time + 1 - GanttStart) / totalDuration) * 100;
    const rectSize = 5;
    const rectOffset = rectSize / 2 + 0.5;
    const setHover = (hovered) => {
        setIsHovered(hovered);
        if (onHover)
            onHover(hovered);
    };
    return (React.createElement("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: {
            position: 'absolute',
            left: `${left}%`,
            top: -5,
            width: 1,
            height: '105%',
            borderLeft: `1px ${lineStype} ${ThemingParameters.sapLegendColor2}`,
            cursor
        } }, isHovered ? (React.createElement("div", { style: {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            padding: '4px 8px',
            marginTop: '-20px',
            backgroundColor: 'white',
            border: `1px solid ${ThemingParameters.sapLegendColor2}`,
            color: ThemingParameters.sapLegendColor2,
            fontSize: '14px',
            fontWeight: 'normal',
            borderRadius: 0,
            whiteSpace: 'nowrap'
        } }, format(new Date(), 'dd-MM-yyyy'))) : (React.createElement("div", { title: "Today", style: {
            top: `-1px`,
            position: 'absolute',
            left: `-${rectOffset}px`,
            width: `${rectSize}px`,
            height: `${rectSize}px`,
            backgroundColor: ThemingParameters.sapLegendColor2,
            transform: 'rotate(45deg)'
        } }))));
};
export { GanttChartStaticVerticalLine };
