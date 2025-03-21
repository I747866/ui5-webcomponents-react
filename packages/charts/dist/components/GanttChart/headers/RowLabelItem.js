import { ThemingParameters } from '@ui5/webcomponents-react-base';
import React from 'react';
import { useStyles } from '../util/styles.js';
export const RowLabelItem = (props) => {
  const { padding, children, collapseIcon, onClick, isActive, rowHeight } = props;
  const classes = useStyles();
  const itemStyle = {
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`
  };
  return React.createElement(
    'div',
    {
      className: `${classes.rowLabelsItem} ${isActive ? classes.collapseContentActive : classes.collapseContent}`,
      style: itemStyle
    },
    React.createElement(
      'span',
      { style: { paddingInlineStart: padding, fontSize: 14, color: ThemingParameters.sapList_TextColor } },
      collapseIcon && React.createElement('span', { className: classes.collapseIcon, onClick: onClick }, collapseIcon),
      children
    )
  );
};
