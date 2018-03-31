/* eslint-env jest */
const combos = require('./index');

test('empty arguments return empty string', () => {
  expect(combos()).toBe('');
});

test('one option-argument returns the original argument', () => {
  expect(combos('foo')).toBe('foo');
});

test('generates correctly for one option(1)', () => {
  const strings = combos(`My dog is ${combos('brown')}`);
  expect(strings).toBe('My dog is brown');
});

test('generates correctly for one option(2)', () => {
  const strings = combos(`My dog is ${combos('brown', 'furry')}`);
  expect(strings).toEqual(['My dog is brown', 'My dog is furry']);
});

test('generates correctly for two options(2)', () => {
  const strings = combos(`${combos('Al', 'Bob')} is ${combos('cool', 'calm')}`);
  expect(strings).toEqual(['Al is cool', 'Bob is cool', 'Al is calm', 'Bob is calm']);
});
