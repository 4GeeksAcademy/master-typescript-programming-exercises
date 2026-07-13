const rewire = require('rewire');
const getMatrixValue = rewire('./app.js').__get__('getMatrixValue');

test('Function getMatrixValue must exist', () => {
  expect(getMatrixValue).not.toBe(undefined);
});

test('Function getMatrixValue must return the value at the given row and column', () => {
  expect(getMatrixValue([[1, 2], [3, 4]], 1, 0)).toBe(3);
});

test('Function getMatrixValue must return the value at position [0, 1]', () => {
  expect(getMatrixValue([[1, 2], [3, 4]], 0, 1)).toBe(2);
});

test('Function getMatrixValue must return undefined when the row does not exist', () => {
  expect(getMatrixValue([[1, 2], [3, 4]], 4, 0)).toBeUndefined();
});

test('Function getMatrixValue must return undefined when the column does not exist', () => {
  expect(getMatrixValue([[1, 2], [3, 4]], 0, 5)).toBeUndefined();
});
