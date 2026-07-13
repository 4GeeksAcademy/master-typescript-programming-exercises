const rewire = require('rewire');
const renameBookImmutable = rewire('./app.js').__get__('renameBookImmutable');

test('Function renameBookImmutable must exist', () => {
  expect(renameBookImmutable).not.toBe(undefined);
});

test('Function renameBookImmutable must return a book with the new title', () => {
  const original = { title: 'Old', author: 'A' };
  const renamed = renameBookImmutable(original, 'New');
  expect(renamed).toEqual({ title: 'New', author: 'A' });
});

test('Function renameBookImmutable must not mutate the original book', () => {
  const original = { title: 'Old', author: 'A' };
  renameBookImmutable(original, 'New');
  expect(original.title).toBe('Old');
});

test('Function renameBookImmutable must return a different object reference', () => {
  const original = { title: 'Old', author: 'A' };
  const renamed = renameBookImmutable(original, 'New');
  expect(renamed).not.toBe(original);
});
