import { useEffect, useState } from 'react';
import { countAllRows } from '../util/utils.js';
export const useCollapsableRows = (dataset) => {
    const [openRowIndexes, setOpenRowIndexes] = useState([]);
    const [openSubRowIndexes, setOpenSubRowIndexes] = useState({});
    const [numberOfRows, setNumberOfRows] = useState(() => countAllRows(dataset, openRowIndexes, openSubRowIndexes));
    useEffect(() => {
        setNumberOfRows(() => countAllRows(dataset, openRowIndexes, openSubRowIndexes));
    }, [dataset, numberOfRows, openRowIndexes, openSubRowIndexes]);
    useEffect(() => {
        setOpenRowIndexes([]);
        setOpenSubRowIndexes({});
    }, [dataset]);
    const closeSubItems = (parentIndex) => {
        const subItems = dataset[parentIndex].subRows.length;
        for (let index = 0; index < subItems; index++) {
            setOpenSubRowIndexes((prevState) => ({
                ...prevState,
                [`${parentIndex}-${index}`]: false
            }));
        }
    };
    const handleClick = (index) => {
        if (openRowIndexes.includes(index)) {
            closeSubItems(index);
            setOpenRowIndexes(openRowIndexes.filter((i) => i !== index));
        }
        else {
            setOpenRowIndexes([...openRowIndexes, index]);
        }
    };
    const handleSubClick = (parentIndex, index) => {
        setOpenSubRowIndexes((prevState) => ({
            ...prevState,
            [`${parentIndex}-${index}`]: !prevState[`${parentIndex}-${index}`]
        }));
    };
    return { openRowIndexes, openSubRowIndexes, numberOfRows, handleClick, handleSubClick };
};
