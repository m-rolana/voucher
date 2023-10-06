import _ from 'lodash';

// TODO: make smth better
function createCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 6;

    const indexes = _getRandomNumbers(length, 0, characters.length - 1);
    return _getValuesStringByIndexes(characters, indexes);
}

function _getRandomNumbers(amount: number, min: number = 0, max: number = 9) {
    const arr = new Array(amount).fill('*');
    return arr.map(() => _.random(min, max));
}

function _getValuesStringByIndexes(source: string, indexes: Array<number>) {
    const valuesArray = indexes.map(i => source[i]);
    return valuesArray.join('');
}

export {
    createCode,
};