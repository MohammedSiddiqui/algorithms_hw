const { newLine } = require('./common');

const { realizable } = require('./part_1');
const { showOne } = require('./part_2');
const { showAll } = require('./part_3');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userArray = '26 87 97 87 53 6 29 95 45 71 28 93 52 71 75 49 82 18 26 95'.split(' ').map(x => parseInt(x));
const userValue = 873;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {

    const isRealizable = realizable(userArray, userValue);
    const part1Result = `The value ${userValue} is ${isRealizable ? '' : 'not '}realizable`;

    let part2Result = '';
    if (isRealizable) {
        part2Result = `Solution: ${showOne(userArray, userValue)} = ${userValue}`;
    }
    else {
        part2Result = `The value ${userValue} is not realizable`;
    }

    let partialPart3Result = '';
    let showAllResult = [];

    if (isRealizable) {
        showAllResult = showAll(userArray, userValue);
        partialPart3Result = `Number of solutions = ${showAllResult.length}`;
    }
    else {
        partialPart3Result = `Number of solutions = 0`;
    }

    console.log('Part 1: Realizability check');
    console.log(part1Result);

    newLine();

    console.log('Part 2: One solution');
    console.log(part2Result);

    newLine();

    console.log('Part 3: All solutions');
    console.log(partialPart3Result);

    newLine();

    showAllResult.forEach((solution, index) => {
        console.log(`Sol ${index + 1} : ${solution} = ${userValue}`);
    });
}

main();
