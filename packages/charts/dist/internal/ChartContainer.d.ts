import { type CommonProps } from '@ui5/webcomponents-react';
import type { ComponentType, ReactElement } from 'react';
import React from 'react';
export interface ContainerProps extends CommonProps {
  children: ReactElement;
  Placeholder?: ComponentType;
  dataset: unknown[];
  loading?: boolean;
  resizeDebounce: number;
}
declare const ChartContainer: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
export { ChartContainer };
