import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { dummyDataSet, ferrovieTier } from './examples/Dataset.js';
import { GanttChart } from './GanttChart.js';

const meta = {
  title: 'GanttChart',
  component: GanttChart,
  argTypes: {
    dataset: {
      control: { disable: true }
    }
  }
} satisfies Meta<typeof GanttChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataset: ferrovieTier,
    contractDuration: { dateStart: '2022-10-01T00:00:00.000Z', dateEnd: '2027-09-30T00:00:00.000Z' },
    showStatus: false,
    staticVerticalLinePosition: new Date().toISOString(),
    showStaticVerticalLine: true,
    showVerticalLineOnHover: true
  }
};

// export const WithCollapsableRows: Story = {
//   args: {
//     dataset: dummyCollapsableDataSet,
//     contractDuration: { dateStart: '2024-01-01T00:00:00.000Z', dateEnd: '2027-12-31T00:00:00.000Z' },
//     rowHeight: 48
//   },
//   render(props) {
//     return <GanttChart {...props} />;
//   }
// };
//
// export const WithAnnotations: Story = {
//   args: {
//     dataset: schedulingEDFData,
//     contractDuration: { dateStart: '2024-01-01T00:00:00.000Z', dateEnd: '2027-12-31T00:00:00.000Z' },
//     showAnnotation: true,
//     rowHeight: 35
//   },
//   render(props) {
//     return (
//       <GanttChart
//         {...props}
//         annotations={
//           <>
//             <GanttChartAnnotation
//               rowIndex={0}
//               rowHeight={35}
//               figure={<TimingFigure arrival={0} period={4} deadline={4} totalDuration={15} />}
//             />
//             <GanttChartAnnotation
//               rowIndex={1}
//               rowHeight={35}
//               figure={<TimingFigure arrival={4} period={5} deadline={5} totalDuration={15} />}
//             />
//             <GanttChartAnnotation
//               rowIndex={2}
//               rowHeight={35}
//               figure={<TimingFigure arrival={0} period={7} deadline={6} totalDuration={15} />}
//             />
//           </>
//         }
//       />
//     );
//   }
// };
//
// export const WithAnnotationsOnly: Story = {
//   args: {
//     dataset: inventionDataset,
//     contractDuration: { dateStart: '2024-01-01T00:00:00.000Z', dateEnd: '2027-12-31T00:00:00.000Z' },
//     showAnnotation: true,
//     rowHeight: 80
//   },
//   render(props) {
//     return (
//       <GanttChart
//         {...props}
//         annotations={
//           <>
//             <GanttChartAnnotation
//               rowIndex={0}
//               figure={
//                 <>
//                   <Invention
//                     name={'internet'}
//                     rowHeight={80}
//                     time={50}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_9}
//                   />
//                   <Invention
//                     name={'penicillin'}
//                     rowHeight={80}
//                     time={82}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_2}
//                   />
//                   <Invention
//                     name={'airplane'}
//                     rowHeight={80}
//                     time={118}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_1}
//                   />
//                   <Invention
//                     name={'lightbulb'}
//                     rowHeight={80}
//                     time={143}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_3}
//                   />
//                   <Invention
//                     name={'telephone'}
//                     rowHeight={80}
//                     time={146}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_4}
//                   />
//                   <Invention
//                     name={'steamengine'}
//                     rowHeight={80}
//                     time={258}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_5}
//                   />
//                   <Invention
//                     name={'printingpress'}
//                     rowHeight={80}
//                     time={582}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_6}
//                   />
//                   <Invention
//                     name={'compass'}
//                     rowHeight={80}
//                     time={1100}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_7}
//                   />
//                   <Invention
//                     name={'wheel'}
//                     rowHeight={80}
//                     time={5500}
//                     totalDuration={6000}
//                     color={ThemingParameters.sapChart_OrderedColor_8}
//                   />
//                 </>
//               }
//             />
//           </>
//         }
//       />
//     );
//   }
// };
//
// export const WithMoreCustomization: Story = {
//   args: {
//     dataset: dummyDataSet,
//     contractDuration: { dateStart: '2024-01-01T00:00:00.000Z', dateEnd: '2027-12-31T00:00:00.000Z' },
//     showAnnotation: true
//   }
// };

export const LoadingPlaceholder: Story = {
  args: {
    dataset: dummyDataSet,
    contractDuration: { dateStart: '', dateEnd: '' },
    showAnnotation: true
  },
  render(props) {
    return <GanttChart {...props} />;
  }
};
