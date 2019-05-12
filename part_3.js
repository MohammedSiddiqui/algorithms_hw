const { rowColumnKey } = require('./common');
const { buildRealizationTable } = require('./part_1');

module.exports = {
    showAll
};

function solutionBuilder(rowValues, selectedValue, tableResult, finalResult = [], startingSol = '') {

    const rowIndex = rowValues.length - 1;
    const rowValue = rowValues[rowIndex];
    let accumulatedResult = startingSol;

    const prevRowIndex = rowIndex - 1;
    const prevRowValue = rowValues[prevRowIndex];

    const subValue = selectedValue - rowValue;
    const addValue = selectedValue + rowValue;

    // Final row has been concluded and processed
    if (prevRowIndex === -1) {
        finalResult.push(accumulatedResult);
        return finalResult;
    }
    if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, subValue)]) {
        solutionBuilder(rowValues.slice(0, rowIndex), subValue, tableResult, finalResult, accumulatedResult.concat(`+${rowValue}`));
    }
    if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, addValue)]) {
        solutionBuilder(rowValues.slice(0, rowIndex), addValue, tableResult, finalResult, accumulatedResult.concat(-rowValue));
    }

    return finalResult;
}

function showAll(A = [], T = 0) {
    const givenArray = A;
    const givenValue = T;

    const lenOfGivenArr = givenArray.length;

    // Handle base case for 0 elements
    if (lenOfGivenArr === 0 && givenValue === 0) {
        return ['0'];
    }

    const { tableResult, rowValues } = buildRealizationTable(givenArray);

    return solutionBuilder(rowValues, givenValue, tableResult);
}
