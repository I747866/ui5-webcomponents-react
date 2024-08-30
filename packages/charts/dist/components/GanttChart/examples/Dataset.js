import { GanttChartConnection } from '../types/GanttChartTypes.js';
export const dummyDataSet = [
  {
    label: 'Row 0',
    color: 'blue',
    tasks: [
      {
        id: 'TR-00',
        label: 'Item 1',
        start: 5,
        duration: 10,
        connections: [
          {
            itemId: 'TR-20',
            type: GanttChartConnection.Finish_To_Start
          }
        ]
      },
      {
        id: 'TR-01',
        label: 'Item 2',
        start: 25,
        duration: 115,
        color: 'brown',
        connections: [
          {
            itemId: 'TR-10',
            type: GanttChartConnection.Start_To_Start
          }
        ]
      }
    ],
    milestones: []
  },
  {
    label: 'Row 1',
    color: 'red',
    tasks: [
      {
        id: 'TR-10',
        label: 'Item 3',
        start: 35,
        duration: 25,
        color: 'orange',
        connections: [
          {
            itemId: 'TR-20',
            type: GanttChartConnection.Finish_To_Finish
          }
        ]
      },
      {
        id: 'TR-11',
        label: 'Item 4',
        start: 95,
        duration: 5,
        connections: [
          {
            itemId: 'MS-20'
          },
          {
            itemId: 'TR-21',
            type: GanttChartConnection.Start_To_Start
          }
        ]
      }
    ],
    milestones: []
  },
  {
    label: 'Row 2',
    color: 'purple',
    tasks: [
      {
        id: 'TR-20',
        label: 'Item 5',
        start: 35,
        duration: 15
      },
      {
        id: 'TR-21',
        start: 75,
        duration: 25
      }
    ],
    milestones: [
      {
        id: 'MS-20',
        start: 115,
        label: 'Milestone 11',
        connections: [
          {
            itemId: 'TR-01',
            type: GanttChartConnection.Finish_To_Finish
          }
        ]
      }
    ]
  }
];
export const dummyDiscreteDataSet = [
  {
    label: 'Discovery',
    color: 'blue',
    status: 'Live',
    tasks: [
      {
        id: 'TR-00X',
        start: 2,
        duration: 5,
        connections: [
          {
            itemId: 'TR-20X'
          }
        ]
      }
    ]
  },
  {
    label: 'Branding Exploration',
    color: 'red',
    status: 'Live',
    tasks: [
      {
        id: 'TR-10X',
        start: 11,
        duration: 5,
        connections: [
          {
            itemId: 'MS-30X'
          }
        ]
      }
    ]
  },
  {
    label: 'Content Review',
    status: 'Live',
    tasks: [
      {
        id: 'TR-20X',
        start: 6,
        duration: 5,
        connections: [
          {
            itemId: 'TR-10X'
          }
        ]
      }
    ]
  },
  {
    label: '',
    status: 'Deleted',
    milestones: [
      {
        id: 'MS-30X',
        label: 'Phase 1',
        start: 16,
        connections: [
          {
            itemId: 'TR-40X'
          },
          {
            itemId: 'TR-50X'
          }
        ]
      }
    ]
  },
  {
    label: 'Website Design',
    status: 'Planned',
    tasks: [
      {
        id: 'TR-40X',
        start: 21,
        duration: 9,
        connections: [
          {
            itemId: 'MS-60X'
          }
        ]
      }
    ]
  },
  {
    label: 'Database Setup',
    status: 'Live',
    tasks: [
      {
        id: 'TR-50X',
        start: 24,
        duration: 4,
        connections: [
          {
            itemId: 'MS-60X'
          }
        ]
      }
    ]
  },
  {
    label: '',
    milestones: [
      {
        id: 'MS-60X',
        label: 'Completed',
        start: 35,
        color: 'red'
      }
    ]
  }
];
export const schedulingEDFData = [
  {
    label: 'T1 (4, 1)',
    tasks: [
      {
        start: 0,
        duration: 1
      },
      {
        start: 4,
        duration: 1
      },
      {
        start: 8,
        duration: 1
      },
      {
        start: 12,
        duration: 1
      }
    ]
  },
  {
    label: 'T2 (4, 2)',
    tasks: [
      {
        start: 5,
        duration: 2
      },
      {
        start: 10,
        duration: 2
      }
    ]
  },
  {
    label: 'T3 (7, 2)',
    tasks: [
      {
        start: 1,
        duration: 2
      },
      {
        start: 7,
        duration: 1
      },
      {
        start: 9,
        duration: 1
      }
    ]
  }
];
export const inventionDataset = [
  {
    label: 'Inventions'
  }
];
export const illegalConnDataset = [
  {
    label: 'row1',
    tasks: [
      {
        start: 0,
        duration: 5,
        connections: [
          {
            itemId: 'id2'
          }
        ]
      }
    ]
  },
  {
    label: 'row2',
    tasks: [
      {
        id: 'id2',
        start: 5,
        duration: 5
      }
    ]
  }
];
export const illegalConnDataset2 = [
  {
    label: 'row1',
    milestones: [
      {
        start: 2,
        connections: [
          {
            itemId: 'id2'
          }
        ]
      }
    ]
  },
  {
    label: 'row2',
    tasks: [
      {
        id: 'id2',
        start: 5,
        duration: 5
      }
    ]
  }
];
export const dummyCollapsableDataSet = [
  {
    label: 'Row 0',
    color: 'blue',
    tasks: [
      {
        id: 'TR-00',
        label: 'Item 1',
        start: 5,
        duration: 25
      },
      {
        id: 'TR-01',
        label: 'Item 2',
        start: 40,
        duration: 80,
        color: 'red'
      }
    ],
    milestones: [],
    status: 'Live',
    details: [
      {
        label: 'DB Node Master DB|DB01',
        status: 'Live',
        tasks: [
          {
            id: 'TR-00',
            label: 'Item 1',
            start: 10,
            duration: 20
          },
          {
            id: 'TR-01',
            label: 'Item 2',
            start: 25,
            duration: 115
          }
        ],
        subDetails: [
          {
            label: 'Sub DB Server',
            status: 'Running',
            tasks: [
              {
                id: 'TR-01',
                label: 'Item 2',
                start: 0,
                duration: 50
              }
            ]
          },
          {
            label: 'Sub DB Backup',
            status: 'Completed',
            tasks: [
              {
                id: 'TR-01',
                label: 'Item 2',
                start: 50,
                duration: 50
              }
            ]
          }
        ]
      },
      {
        label: 'DB Server',
        status: 'Planned',
        tasks: [
          {
            id: 'TR-00',
            label: 'Item 1',
            start: 3,
            duration: 12
          },
          {
            id: 'TR-01',
            label: 'Item 2',
            start: 25,
            duration: 115,
            color: 'brown'
          }
        ],
        subDetails: [
          {
            label: 'Sub DB Server',
            status: 'Stopped',
            tasks: [
              {
                id: 'TR-10',
                label: 'Item 3',
                start: 35,
                duration: 25,
                color: 'green'
              }
            ]
          },
          {
            label: 'Sub DB Maintenance',
            status: 'Scheduled',
            tasks: [
              {
                id: 'TR-10',
                label: 'Item 3',
                start: 70,
                duration: 25,
                color: 'pink'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Row 1',
    color: 'red',
    status: 'Live',
    tasks: [
      {
        id: 'TR-10',
        label: 'Item 3',
        start: 18,
        duration: 30,
        color: 'yellow'
      },
      {
        id: 'TR-11',
        label: 'Item 4',
        start: 95,
        duration: 5
      }
    ]
  },
  {
    label: 'Row 2',
    color: 'purple',
    status: 'Live',
    tasks: [
      {
        id: 'TR-20',
        label: 'Item 5',
        start: 35,
        duration: 15
      },
      {
        id: 'TR-21',
        start: 75,
        duration: 25
      }
    ]
  }
];
