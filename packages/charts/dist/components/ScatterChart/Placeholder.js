import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import ContentLoader from 'react-content-loader';
export const ScatterChartPlaceholder = (props) => {
  return (
    // @ts-expect-error: TypeScript is going crazy
    React.createElement(
      ContentLoader,
      {
        viewBox: '0 0 165 145',
        preserveAspectRatio: 'xMidYMid meet',
        width: '100%',
        height: '100%',
        speed: 2,
        backgroundColor: ThemingParameters.sapContent_ImagePlaceholderBackground,
        foregroundColor: ThemingParameters.sapContent_ImagePlaceholderForegroundColor,
        backgroundOpacity: ThemingParameters.sapContent_DisabledOpacity,
        ...props
      },
      React.createElement('rect', { x: '10', y: '135', width: '135', height: '1' }),
      React.createElement('circle', { cx: '20', cy: '90', r: '2' }),
      React.createElement('circle', { cx: '40', cy: '58', r: '3' }),
      React.createElement('circle', { cx: '60', cy: '108', r: '14' }),
      React.createElement('circle', { cx: '85', cy: '87', r: '8' }),
      React.createElement('circle', { cx: '105', cy: '50', r: '6' }),
      React.createElement('circle', { cx: '125', cy: '115', r: '4' }),
      React.createElement('circle', { cx: '78', cy: '58', r: '10' }),
      React.createElement('circle', { cx: '28', cy: '115', r: '4' })
    )
  );
};
