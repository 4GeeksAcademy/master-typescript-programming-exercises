const rewire = require('rewire');
const fs = require('fs');
const path = require('path');

const printUserBadge = rewire('./app.js').__get__('printUserBadge');

test('Function printUserBadge must exist', () => {
  expect(printUserBadge).not.toBe(undefined);
});

test('Function printUserBadge must not return a value', () => {
  expect(printUserBadge('Ana', 2)).toBeUndefined();
});

test('Function printUserBadge must run without errors', () => {
  expect(() => printUserBadge('Ana', 2)).not.toThrow();
});

test('Function printUserBadge must run with different values', () => {
  expect(() => printUserBadge('Carlos', 5)).not.toThrow();
});

test('Function must use console.log to print the badge', () => {
  const file = fs.readFileSync(path.resolve(__dirname, './app.js'), 'utf8');
  expect(file.includes('console.log')).toBeTruthy();
});
