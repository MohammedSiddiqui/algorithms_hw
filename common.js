const SHOULD_DEBUG = false;

export function log() {
    if (SHOULD_DEBUG) {
        console.log(...arguments);
    }
}

export function rowColumnKey(rowIndex, row, column) {
    return `${rowIndex}:${row}:${column}`;
}

export function minToMaxFiller(minValue, maxValue) {
    let result = [];
    let absMinValue = Math.abs(minValue);

    if (minValue < 0) {
        for (let iter = absMinValue; iter > 0; iter--) {
            result.push(-iter);
        }

        for (let iter = 0; iter <= maxValue; iter++) {
            result.push(iter);
        }
    } else {
        for (let iter = minValue; iter <= maxValue; iter++) {
            result.push(iter);
        }
    }

    return result;
}
