import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';

interface GanttChartHoverVerticalLine {
  verticalLinePosition: number;
  headerText: string;
}

/**
 * Component that renders a vertical line in the Gantt chart. This line is meant to be used as a hover line.
 */
const GanttChartHoverVerticalLine: React.FC<GanttChartHoverVerticalLine> = ({ verticalLinePosition, headerText }) => {
  const headerHeight = 28;

  return (
    <div style={{ position: 'absolute', left: verticalLinePosition, top: 0, height: '100%', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          padding: '4px 8px',
          marginTop: '10px',
          backgroundColor: 'white',
          border: `2px solid ${ThemingParameters.sapSelectedColor}`,
          color: ThemingParameters.sapSelectedColor,
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '4px',
          whiteSpace: 'nowrap'
        }}
      >
        {headerText}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${headerHeight + 10}px`,
          width: '2px',
          height: `calc(100% - ${headerHeight + 10}px)`,
          backgroundColor: ThemingParameters.sapSelectedColor,
        }}
      />
    </div>
  );
};

export { GanttChartHoverVerticalLine };
