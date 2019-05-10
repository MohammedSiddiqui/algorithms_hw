const { rowColumnKey } = require('./common');
const { buildRealizationTable } = require('./part_1');

module.exports = {
    showAll
};

function solutionBuilder(rowValues, selectedValue, tableResult, maxSolutionLength, finalResult = [], startingSol = '') {

    const solution = rowValues.reduceRight((accumulatedResult, rowValue, rowIndex, array) => {
        const prevRowIndex = rowIndex - 1;
        const prevRowValue = array[prevRowIndex];

        const subValue = selectedValue - rowValue;
        const addValue = selectedValue + rowValue;

        if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, subValue)] && tableResult[rowColumnKey(prevRowIndex, prevRowValue, addValue)]) {

            solutionBuilder(rowValues.slice(0, rowIndex), subValue, tableResult, maxSolutionLength, finalResult, accumulatedResult.concat(`+${rowValue}`));
            solutionBuilder(rowValues.slice(0, rowIndex), addValue, tableResult, maxSolutionLength, finalResult, accumulatedResult.concat(-rowValue));

            return '';
        }
        else if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, subValue)]) {
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

    }, startingSol);

    // Only allow valid solutions
    if (solution && solution.length === maxSolutionLength) {
        finalResult.push(solution);
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

    const maxSolutionLength = givenArray.reduce((prev, curr) => prev + curr.toString().length, 0) + givenArray.length;

    return solutionBuilder(rowValues, givenValue, tableResult, maxSolutionLength);
}
