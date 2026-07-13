const rewire = require('rewire');
const binarySearchSortedArray = rewire('./app.js').__get__('binarySearchSortedArray');

test('Function binarySearchSortedArray must exist', () => {
  expect(binarySearchSortedArray).not.toBe(undefined);
});

test('Function binarySearchSortedArray must return the index when the target is found', () => {
  expect(binarySearchSortedArray([1, 3, 5, 7, 9], 7)).toBe(3);
});

test('Function binarySearchSortedArray must return -1 when the target is not found', () => {
  expect(binarySearchSortedArray([1, 3, 5, 7, 9], 2)).toBe(-1);
});

test('Function binarySearchSortedArray must return 0 when the target is the first element', () => {
  expect(binarySearchSortedArray([1, 3, 5, 7, 9], 1)).toBe(0);
});

test('Function binarySearchSortedArray must return the last index when the target is the last element', () => {
  expect(binarySearchSortedArray([1, 3, 5, 7, 9], 9)).toBe(4);
});
