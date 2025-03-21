// GanttChart
export const DEFAULT_WIDTH = 'auto';
export const DEFAULT_NUMBER_OF_ROWS = 10;
export const ROW_CONTRACT_DURATION_HEIGHT = 45;
export const COLUMN_COMPONENT_TITLE = 'Component';
export const COLUMN_COMPONENT_WIDTH = 250;
export const COLUMN_STATUS_TITLE = 'Status';
export const COLUMN_STATUS_WIDTH = 90;
export const COLUMN_HEADER_HEIGHT = 70;
export const CONTROLS_ROW_HEIGHT = 30;
export const DEFAULT_ROW_HEIGHT = 48;
export const INVALID_DISCRETE_LABELS_MESSAGE =
  'The "discreteLabels" prop length must be equal to the "totalDuration" prop value if supplied. \
  Please adjust the discreteLabel array or change the totalDuration.';
export const ILLEGAL_CONNECTION_MESSAGE =
  'Tasks or Milestones with connections must have a unique ID. \
  Please a unique "id" property to any Task or Milestone item with a connection';
export const MOUSE_CURSOR_AUTO = 'auto';
export const MOUSE_CURSOR_GRAB = 'grab';
export const MOUSE_CURSOR_GRABBING = 'grabbing';
// GanttChartBody
export const SCALE_FACTOR = 1.05;
export const THROTTLE_INTERVAL = 300;
export const NORMAL_OPACITY = 1.0;
export const HOVER_OPACITY = 0.7;
export const ARROWHEAD_WIDTH = 8; // base of the arrow head triangle. Where the line joins the head
export const ARROWHEAD_HEIGHT = 5; // Distance from the pointy tip to where the arrow line joins the head
export const ARROW_CLEARANCE = ARROWHEAD_HEIGHT + 3;
export const MAX_BODY_WIDTH = 65500;
// GanttChartColumnLabels
export const FONT_SIZE = 12;
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const LABEL_Y_TOP_HALF = '0%';
export const LABEL_Y_MID_HALF = '50%';
export const LABEL_Y_BOTTOM_HALF = '100%';
export const LABEL_Y_OFFSET = -12;
// Constants for segment width thresholds
export const SEGMENT_WIDTH_FULL_LABEL = 20;
export const SEGMENT_WIDTH_THRESHOLD = 1.2;
