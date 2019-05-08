const { rowColumnKey } = require('./common');
const { buildRealizationTable } = require('./part_1');

//////////////////////////////////////////////////////////////////////
const userArray = '26 87 97 87 53 6 29 95 45 71 28 93 52 71 75 49 82 18 26 95'.split(' ').map(x => parseInt(x));
const userValue = 873;
//////////////////////////////////////////////////////////////////////

function showOne(A = [], T = 0) {
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

    const isRealizable = !!tableResult[rowColumnKey(lastRowIndex, lastRowValue, givenValue)];

    if (!isRealizable) {
        return 'Not Realizable !';
    }
    let selectedValue = givenValue;

    return rowValues.reverse().reduce((accumulatedResult, rowValue, rowIndex, array) => {
        const reversedIndex = lastRowIndex - rowIndex;
        const prevRowIndex = reversedIndex - 1;
        const prevRowValue = array[rowIndex + 1];

        const subValue = selectedValue - rowValue;
        const addValue = selectedValue + rowValue;

        if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, subValue)]) {
            selectedValue = subValue;
            return accumulatedResult.concat(`+${rowValue}`);
        }
        else if (tableResult[rowColumnKey(prevRowIndex, prevRowValue, addValue)]) {
            selectedValue = addValue;
            return accumulatedResult.concat(-rowValue);
        }
        else {
            // To handle and just return in case of last element being zero.
            return accumulatedResult;
        }

    }, '');
}

console.log(
    showOne(userArray, userValue)
);
