const rewire = require('rewire');
const transposeMatrix = rewire('./app.js').__get__('transposeMatrix');

test('Function transposeMatrix must exist', () => {
  expect(transposeMatrix).not.toBe(undefined);
});

test('Function transposeMatrix must return the transpose of the matrix', () => {
  expect(transposeMatrix([[1, 2, 3], [4, 5, 6]])).toEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});

test('Function transposeMatrix must work with a square matrix', () => {
  expect(
    transposeMatrix([
      [1, 2],
      [3, 4],
    ])
  ).toEqual([
    [1, 3],
    [2, 4],
  ]);
});

test('Function transposeMatrix must return an empty array for an empty matrix', () => {
  expect(transposeMatrix([])).toEqual([]);
});
