const rewire = require('rewire');
const buildUserProfile = rewire('./app.js').__get__('buildUserProfile');

test('Function buildUserProfile must exist', () => {
  expect(buildUserProfile).not.toBe(undefined);
});

test('Function buildUserProfile must return a UserProfile for an adult', () => {
  expect(buildUserProfile('Leo', 20)).toEqual({
    name: 'Leo',
    age: 20,
    isAdult: true,
  });
});

test('Function buildUserProfile must return isAdult false for age under 18', () => {
  expect(buildUserProfile('Mia', 15)).toEqual({
    name: 'Mia',
    age: 15,
    isAdult: false,
  });
});

test('Function buildUserProfile must return isAdult true for age exactly 18', () => {
  expect(buildUserProfile('Sam', 18)).toEqual({
    name: 'Sam',
    age: 18,
    isAdult: true,
  });
});
