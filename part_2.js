import { rowColumnKey } from './common';
import { buildRealizationTable } from './part_1';

function showOne(A = [], T = 0) {
    const givenArray = A;
    const givenValue = T;

    const lenOfGivenArr = givenArray.length;

    // Handle base case for 0 elements
    if (lenOfGivenArr === 0 && givenValue === 0) {
        return true;
    }

    const { result: tableResult, rowValues } = buildRealizationTable(givenArray);

    const lastRowIndex = rowValues.length - 1;
    const lastRowValue = rowValues[lastRowIndex];

    const isRealizable = !!tableResult[rowColumnKey(lastRowIndex, lastRowValue, givenValue)];

    if (!isRealizable) {
        return 'Not Realizable !';
    }

    let resultPath = '';

    rowValues.reverse().forEach((rowValue, rowIndex, array) => {
        const reversedIndex = Math.abs(rowIndex - (array.length - 1));

        const subValue = tableResult[rowColumnKey(reversedIndex, rowValue)];

    })

    return resultPath;
}
