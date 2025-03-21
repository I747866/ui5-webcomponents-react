import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
export interface RowLabelItemProps {
  padding: string;
  collapseIcon?: ReactNode | null;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  rowHeight: number;
  style?: CSSProperties;
}
export declare const RowLabelItem: React.FC<RowLabelItemProps>;
