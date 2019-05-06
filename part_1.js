import { log, minToMaxFiller, rowColumnKey } from './common';

//////////////////////////////////////////////////////////////////////
const userArray = '26 87 97 87 53 6 29 95 45 71 28 93 52 71 75 49 82 18 26 95'.split(' ').map(x => parseInt(x));
const userValue = 873;

//////////////////////////////////////////////////////////////////////

export function buildRealizationTable(givenArray) {

    const maxValue = givenArray.reduce((prev, curr) => prev + curr, 0);
    const columnValues = minToMaxFiller(-maxValue, maxValue);
    const rowValues = [0, ...givenArray];

    const result = {};

    rowValues.forEach((rowValue, rowIndex, rowArray) => {

        columnValues.forEach((columnValue) => {
            if (rowIndex === 0) {
                result[rowColumnKey(rowIndex, rowValue, columnValue)] = columnValue === 0 ? 1 : 0;
            } else {
                const subValue = columnValue - rowValue;
                const addValue = columnValue + rowValue;
                const prevRowIndex = rowIndex - 1;
                const prevRowValue = rowArray[prevRowIndex];

                const valueFound = result[rowColumnKey(prevRowIndex, prevRowValue, subValue)] || result[rowColumnKey(prevRowIndex, prevRowValue, addValue)];

                result[rowColumnKey(rowIndex, rowValue, columnValue)] = valueFound ? 1 : 0;
            }
        });
    });

    log(result);

    return {
        tableResult: result,
        rowValues
    }
}


function realizable(A = [], T = 0) {
    const givenArray = A;
    const givenValue = T;

    const lenOfGivenArr = givenArray.length;

    // Handle base case for 0 elements
    if (lenOfGivenArr === 0 && givenValue === 0) {
        return true;
    }

    const { tableResult, rowValues } = buildRealizationTable(givenArray);

    const lastRowIndex = rowValues.length - 1;
    const lastRowValue = rowValues[lastRowIndex];

    return !!tableResult[rowColumnKey(lastRowIndex, lastRowValue, givenValue)];
}

console.log(
    realizable(userArray, userValue)
);
