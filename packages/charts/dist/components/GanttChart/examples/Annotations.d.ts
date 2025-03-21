import type { CSSProperties } from 'react';
import React from 'react';
interface TimingFigureProps {
  arrival: number;
  period: number;
  deadline?: number;
  totalDuration: number;
}
export declare const TimingFigure: ({
  arrival,
  period,
  deadline,
  totalDuration
}: TimingFigureProps) => React.JSX.Element;
interface InventionProps {
  name: string;
  time: number;
  totalDuration: number;
  rowHeight: number;
  color: CSSProperties['color'];
}
export declare const Invention: ({ name, rowHeight, time, totalDuration, color }: InventionProps) => React.JSX.Element;
export {};
