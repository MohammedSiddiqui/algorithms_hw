const { rowColumnKey } = require('./common');
const { buildRealizationTable } = require('./part_1');

module.exports = {
    showOne,
};

function singleSolutionBuilder(rowValues, selectedValue, tableResult) {
    return rowValues.reduceRight((accumulatedResult, rowValue, rowIndex, array) => {
        const prevRowIndex = rowIndex - 1;
        const prevRowValue = array[prevRowIndex];

        const subValue = selectedValue - rowValue;
        const addValue = selectedValue + rowValue;

        if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, subValue)]) {
            selectedValue = subValue;
            return accumulatedResult.concat(`+${rowValue}`);
        } else if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, addValue)]) {
            selectedValue = addValue;
            return accumulatedResult.concat(-rowValue);
        }
        else {
            // To handle and just return in case of last element being zero.
            return accumulatedResult;
        }

    }, '');
}

function showOne(A = [], T = 0) {
    const givenArray = A;
    const givenValue = T;

    const lenOfGivenArr = givenArray.length;

    // Handle base case for 0 elements
    if (lenOfGivenArr === 0 && givenValue === 0) {
        return 0;
    }

    const { tableResult, rowValues } = buildRealizationTable(givenArray);

    return singleSolutionBuilder(rowValues, givenValue, tableResult);
}
