const rewire = require('rewire');
const comparePassByValueAndReference = rewire('./app.js').__get__(
  'comparePassByValueAndReference'
);

test('Function comparePassByValueAndReference must exist', () => {
  expect(comparePassByValueAndReference).not.toBe(undefined);
});

test('For objects, copy must not be the same reference as original', () => {
  const item = { count: 1 };
  const output = comparePassByValueAndReference(item);

  expect(output.original).toBe(item);
  expect(output.copy).toEqual({ count: 1 });
  expect(output.copy).not.toBe(item);
  expect(output.sameReference).toBe(false);
});

test('For objects, mutating copy must not change the original', () => {
  const item = { count: 1 };
  const output = comparePassByValueAndReference(item);

  output.copy.count = 99;
  expect(item.count).toBe(1);
});

test('For numbers, original and copy must have the same value', () => {
  const output = comparePassByValueAndReference(5);

  expect(output.original).toBe(5);
  expect(output.copy).toBe(5);
  expect(output.sameReference).toBe(true);
});

test('For strings, original and copy must have the same value', () => {
  const output = comparePassByValueAndReference('hello');

  expect(output.original).toBe('hello');
  expect(output.copy).toBe('hello');
  expect(output.sameReference).toBe(true);
});
