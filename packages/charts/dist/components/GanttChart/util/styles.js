import { ThemingParameters } from '@ui5/webcomponents-react-base';
import { createUseStyles } from 'react-jss';
export const solidOutline = `0.5px solid ${ThemingParameters.sapGroup_ContentBorderColor}`;
export const dottedLine = `0.7px dotted ${ThemingParameters.sapGroup_ContentBorderColor}`;
const styles = {
  main: {
    backgroundColor: ThemingParameters.sapBaseColor,
    display: 'grid',
    width: 'auto',
    gap: 0
  },
  bodyContainer: { overflow: 'hidden' },
  columnTitle: {
    position: 'absolute',
    marginBlockEnd: '-0.5px',
    textAlign: 'center',
    fontSize: '13px',
    color: ThemingParameters.sapTitleColor
  },
  annotation: { position: 'absolute' },
  rowLabels: {
    borderTop: solidOutline,
    color: ThemingParameters.sapTitleColor
  },
  rowLabelsItem: {
    width: '100%',
    fontSize: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  columnLabel: {
    borderBottom: solidOutline
  },
  columnLabelItems: {
    fontSize: '10px',
    display: 'grid',
    textAlign: 'center',
    '& span': {
      borderRight: dottedLine
    }
  },
  rowTitleTop: { height: '50%' },
  rowTitleBottom: {
    height: '50%',
    paddingInline: '10px',
    fontSize: '14px',
    fontWeight: 400,
    color: ThemingParameters.sapTextColor
  },
  chartBody: {
    position: 'relative'
  },
  tooltipContainer: {
    width: '100%',
    height: '100%',
    fontSize: '10px',
    position: 'absolute',
    pointerEvents: 'none'
  },
  tooltip: {
    minWidth: 80,
    display: 'inline-grid',
    gap: 2,
    padding: 10,
    outline: `2px solid ${ThemingParameters.sapList_BorderColor}`,
    borderRadius: 8,
    color: ThemingParameters.sapTextColor,
    backgroundColor: ThemingParameters.sapBackgroundColor,
    position: 'absolute'
  },
  tooltipLabel: { textAlign: 'center' },
  tooltipColorBar: {
    width: '100%',
    height: '4px'
  },
  layer: {
    width: '100%',
    height: '100%'
  },
  collapseContent: {
    display: 'none'
  },
  collapseContentActive: {
    display: 'block'
  },
  collapseIcon: {
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    userSelect: 'none'
  },
  legendIcon: {
    color: 'var(--sapButton_TextColor)'
  },
  slider: {
    width: '250px',
    padding: '0 20px',
    '&::part(handle):focus': {
      outline: 'none',
      outlineOffset: 'initial',
      border: 'var(--_ui5-v1-23-1_slider_handle_border)',
      background: 'var(--_ui5-v1-23-1_slider_handle_background)'
    },
    '&::part(handle):focus:hover': {
      background: 'var(--_ui5-v1-23-1_slider_handle_hover_background)'
    },
    '&::part(icon-slider) ': {
      display: 'var(--_ui5-v1-23-1_slider_handle_icon_display)'
    },
    '&::part(root-container)': {
      height: '5px',
      padding: 0
    }
  }
};
export const useStyles = createUseStyles(styles, { name: 'GanttChart' });
