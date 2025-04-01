import { ThemingParameters } from '@ui5/webcomponents-react-base';
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
    const formattedDate = new Date().toLocaleDateString(navigator.language);
    return (React.createElement("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: {
            position: 'absolute',
            left: `${left}%`,
            top: -5,
            width: 1,
            height: '105%',
            borderLeft: `1px ${lineStype} ${ThemingParameters.sapLegendColor2}`,
            cursor
        } },
        isHovered && (React.createElement("div", { style: {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(10%) translateY(180%)',
                width: 'auto',
                padding: '3px 6px',
                marginTop: '-20px',
                backgroundColor: '#e4e1e4',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '2px',
                color: '#454445',
                boxShadow: '0px 2px 4px 0px rgba(85, 107, 130, 0.16), 0px 0px 2px 0px rgba(85, 107, 130, 0.16)',
                fontSize: '12px',
                fontWeight: 'normal',
                whiteSpace: 'nowrap'
            } }, formattedDate)),
        React.createElement("div", { title: "Today", style: {
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
