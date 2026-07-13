const rewire = require('rewire');
const getDisplayName = rewire('./app.js').__get__('getDisplayName');

test('Function getDisplayName must exist', () => {
  expect(getDisplayName).not.toBe(undefined);
});

test('Function getDisplayName must return the nickname when it is provided', () => {
  expect(getDisplayName({ firstName: 'Ana', nickname: 'Annie' })).toBe('Annie');
});

test('Function getDisplayName must return firstName when nickname is missing', () => {
  expect(getDisplayName({ firstName: 'Ana' })).toBe('Ana');
});

test('Function getDisplayName must return firstName when nickname is undefined', () => {
  expect(getDisplayName({ firstName: 'Ana', nickname: undefined })).toBe('Ana');
});
