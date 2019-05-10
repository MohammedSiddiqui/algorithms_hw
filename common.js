const SHOULD_DEBUG = false;

function log() {
    if (SHOULD_DEBUG) {
        console.log(...arguments);
    }
}

function newLine() {
    console.log('\n');
}

function rowColumnKey(rowIndex, row, column) {
    return `${rowIndex}:${row}:${column}`;
}

function minToMaxFiller(minValue, maxValue) {
    let result = [];
    let absMinValue = Math.abs(minValue);

    for (let iter = absMinValue; iter > 0; iter--) {
        result.push(-iter);
    }

    for (let iter = 0; iter <= maxValue; iter++) {
        result.push(iter);
    }

    return result;
}

module.exports = {
    log,
    rowColumnKey,
    minToMaxFiller,
    newLine,
};
