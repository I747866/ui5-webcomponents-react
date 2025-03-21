import React from 'react';
import { formatContractDuration } from '../util/utils.js';
export const GanttContractDuration = (props) => {
  const { contractDuration } = props;
  const formattedContractDuration = formatContractDuration(contractDuration);
  if (!formattedContractDuration) {
    return null;
  }
  return React.createElement(
    'svg',
    {
      x: '0',
      y: '0',
      width: '100%',
      height: 48,
      style: { pointerEvents: 'none', userSelect: 'none', fontSize: 14 },
      'data-component-name': 'GanttContractDuration'
    },
    React.createElement('rect', {
      'data-component-name': 'GanttContractDuration',
      id: 'GanttContractDuration',
      x: 1,
      y: 16,
      rx: 8,
      ry: 8,
      width: `100%`,
      height: 24,
      style: { fill: 'var(--sapActiveColor)' }
    }),
    React.createElement(
      'text',
      { x: 8, dx: 0, y: 33, dy: 0, color: 'black', fill: 'var(--sapTextColor)' },
      'Contract Duration: ',
      formattedContractDuration
    )
  );
};
GanttContractDuration.displayName = 'GanttContractDuration';
