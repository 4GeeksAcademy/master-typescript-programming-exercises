const rewire = require('rewire');
const printUserBadge = rewire('./app.js').__get__('printUserBadge');

test('Function printUserBadge must exist', () => {
  expect(printUserBadge).not.toBe(undefined);
});

test('Function printUserBadge must not return a value', () => {
  expect(printUserBadge('Ana', 2)).toBeUndefined();
});

test('Function printUserBadge must print the formatted badge', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  printUserBadge('Ana', 2);
  expect(logSpy).toHaveBeenCalledWith('[Level 2] Ana');

  logSpy.mockRestore();
});

test('Function printUserBadge must print the formatted badge with different values', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  printUserBadge('Carlos', 5);
  expect(logSpy).toHaveBeenCalledWith('[Level 5] Carlos');

  logSpy.mockRestore();
});
