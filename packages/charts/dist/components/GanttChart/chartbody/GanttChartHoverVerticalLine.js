import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
/**
 * Component that renders a vertical line in the Gantt chart. This line is meant to be used as a hover line.
 */
const GanttChartHoverVerticalLine = ({ verticalLinePosition, headerText }) => {
    const headerHeight = 28;
    return (React.createElement("div", { style: {
            position: 'absolute',
            left: verticalLinePosition,
            top: 0,
            height: '100%',
            pointerEvents: 'none'
        } },
        React.createElement("div", { style: {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                padding: '4px 8px',
                marginTop: '20px',
                backgroundColor: 'white',
                border: `1px solid ${ThemingParameters.sapSelectedColor}`,
                color: ThemingParameters.sapSelectedColor,
                fontSize: '14px',
                fontWeight: 'normal',
                borderRadius: 0,
                whiteSpace: 'nowrap'
            } }, headerText),
        React.createElement("div", { style: {
                position: 'absolute',
                top: `${headerHeight + 17}px`,
                width: 1,
                height: `calc(100% - ${headerHeight}px)`,
                backgroundColor: ThemingParameters.sapSelectedColor
            } })));
};
export { GanttChartHoverVerticalLine };
