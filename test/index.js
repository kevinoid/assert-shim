/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assert = require('assert');

const assertShim = require('..');

const { AssertionError } = assert;
const nodeVersion = process.version.slice(1).split('.').map(Number);

function describeAssert(assertTest) {
  it('is a function', () => {
    assert.strictEqual(typeof assertTest, 'function');
  });

  it('behaves like .ok', () => {
    assertTest(true);
    assert.throws(
      () => assertTest(false),
      AssertionError,
    );
  });

  it('.strict is a function', () => {
    assert.strictEqual(typeof assertTest.strict, 'function');
  });

  it('.strict behaves like .ok', () => {
    assertTest.strict(true);
    assert.throws(
      () => assertTest.strict(false),
      AssertionError,
    );
  });

  it('.strict === .strict.strict', () => {
    assert.strictEqual(assertTest.strict, assertTest.strict.strict);
  });

  it('.strict.ok === .ok', () => {
    assert.strictEqual(assertTest.strict.ok, assertTest.ok);
  });

  it('has .doesNotMatch function', () => {
    assertTest.doesNotMatch('Hello World', /^Goodbye/);
  });

  it('has .match function', () => {
    assertTest.match('Hello World', /^hello/i);
  });

  it('.strict.doesNotMatch === .doesNotMatch', () => {
    assert.strictEqual(assertTest.strict.doesNotMatch, assertTest.doesNotMatch);
  });

  it('.strict.match === .match', () => {
    assert.strictEqual(assertTest.strict.match, assertTest.match);
  });
}

// Run tests against the assert module on Node.js >= 15 to ensure correctness.
if (nodeVersion[0] >= 15) {
  describe('assert', () => describeAssert(assert));
}

describe('assertShim', () => describeAssert(assertShim));
