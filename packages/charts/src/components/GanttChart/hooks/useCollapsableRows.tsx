import { useEffect, useState } from 'react';
import type { IGanttChartRow, OpenRowIndex, OpenSubRowIndexes } from '../types/GanttChartTypes.js';
import { countAllRows } from '../util/utils.js';

export const useCollapsableRows = (dataset: IGanttChartRow[]) => {
  const [openRowIndexes, setOpenRowIndexes] = useState<OpenRowIndex>([]);
  const [openSubRowIndexes, setOpenSubRowIndexes] = useState<OpenSubRowIndexes>({});
  const [numberOfRows, setNumberOfRows] = useState<number>(() =>
    countAllRows(dataset, openRowIndexes, openSubRowIndexes)
  );

  useEffect(() => {
    setNumberOfRows(() => countAllRows(dataset, openRowIndexes, openSubRowIndexes));
  }, [dataset, numberOfRows, openRowIndexes, openSubRowIndexes]);

  useEffect(() => {
    setOpenRowIndexes([]);
    setOpenSubRowIndexes({});
  }, [dataset]);

  const closeSubItems = (parentIndex: number): void => {
    const subItems = dataset[parentIndex].subRows.length;
    for (let index = 0; index < subItems; index++) {
      setOpenSubRowIndexes((prevState) => ({
        ...prevState,
        [`${parentIndex}-${index}`]: false
      }));
    }
  };

  const handleClick = (index: number): void => {
    if (openRowIndexes.includes(index)) {
      closeSubItems(index);
      setOpenRowIndexes(openRowIndexes.filter((i) => i !== index));
    } else {
      setOpenRowIndexes([...openRowIndexes, index]);
    }
  };

  const handleSubClick = (parentIndex: number, index: number): void => {
    setOpenSubRowIndexes((prevState) => ({
      ...prevState,
      [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
    }));
  };

  return { openRowIndexes, openSubRowIndexes, numberOfRows, handleClick, handleSubClick };
};
