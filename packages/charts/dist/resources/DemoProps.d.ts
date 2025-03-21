export declare const singleData: {
  name: string;
  data: number;
  users: number;
}[];
export declare const complexDataSet: {
  name: string;
  users: number;
  sessions: number;
  volume: number;
}[];
export declare const simpleDataSet: {
  name: string;
  users: number;
}[];
export declare const simpleDataSetWithSmallValues: {
  name: string;
  users: number;
}[];
export declare const secondaryDimensionDataSet: {
  name: string;
  users: number;
  dimension: string;
}[];
export declare const scatterComplexDataSet: (
  | {
      label: string;
      data: {
        users: number;
        sessions: number;
        volume: number;
      }[];
      opacity?: undefined;
    }
  | {
      label: string;
      opacity: number;
      data: {
        users: number;
        sessions: number;
        volume: number;
      }[];
    }
)[];
export declare const scatterColorDataSet: {
  label: string;
  color: string;
  data: {
    users: number;
    sessions: number;
    volume: number;
  }[];
}[];
export declare const bigDataSet: any[];
export declare const complexBulletDataset: {
  name: string;
  users: number;
  sessions: number;
  volume: number;
}[];
