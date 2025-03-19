import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React, { useState } from 'react';
import { format } from 'date-fns'

interface GanttChartStaticVerticalLine {
  time: number;
  GanttStart: number;
  totalDuration: number;
}

/**
 * Component that renders a vertical line in the Gantt chart. This line is static and does not move.
 */
const GanttChartStaticVerticalLine: React.FC<GanttChartStaticVerticalLine> = ({ GanttStart, totalDuration, time }) => {
  const [isHovered, setIsHovered] = useState(false);

  const lineStype = isHovered ? 'solid' : 'dashed';
  const cursor = isHovered ? 'pointer' : 'inherit';
  const left = ((time + 1 - GanttStart) / totalDuration) * 100;
  const rectSize = 5;
  const rectOffset = rectSize / 2;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: -5,
        width: 1,
        height: '105%',
        borderLeft: `1px ${lineStype} ${ThemingParameters.sapLegendColor2}`,
        cursor,
      }}
    >
      {
        isHovered ? (
          <div
            style={{
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
            }}
          >
            {format(new Date(), 'dd-MM-yyyy')}
          </div>
        ) : (
          <div
            title="Today"
            style={{
              top: `-1px`,
              position: 'absolute',
              left: `-${rectOffset}px`,
              width: `${rectSize}px`,
              height: `${rectSize}px`,
              backgroundColor: ThemingParameters.sapLegendColor2,
              transform: 'rotate(45deg)'
            }}
          />
        )
      }
    </div>
  );
};

export { GanttChartStaticVerticalLine };
