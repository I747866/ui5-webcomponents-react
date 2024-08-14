import type { CSSProperties } from 'react';
import React from 'react';
import { useStyles } from '../util/styles.js';

interface GanttChartRowLabelsProps {
  width: number;
  height: number;
  rowHeight: number;
  rowLabels: string[];
}

export const GanttChartRowLabels = ({ width, height, rowHeight, rowLabels }: GanttChartRowLabelsProps) => {
  const classes = useStyles();
  const style: CSSProperties = {
    width: width,
    height: `${rowLabels.length * rowHeight}px`
  };

  const itemStyle: CSSProperties = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };

  return (
    <div style={{ height: height }}>
      <div className={classes.rowLabels} style={style}>
        {rowLabels.map((label, index) => {
          return (
            <div key={index} className={classes.rowLabelsItem} style={itemStyle}>
              <span style={{ paddingInline: '10px' }} title={`Item ${label}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
