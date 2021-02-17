/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assert = require('assert');
const { inspect } = require('util');

const assertImpl = require('../assert-impl.js');

const { AssertionError } = assert;
const nodeVersion = process.version.slice(1).split('.').map(Number);

function describeMatch({ match }) {
  it('does not throw if first arg matches second arg', () => {
    match('hi', /^hi$/);
    match('hello', /ll/);
    match('Hello', /^he/i);
  });

  it('throws if first arg does not match second arg', () => {
    const str = 'hello';
    const pattern = /hi/;
    assert.throws(
      () => match(str, pattern),
      (err) => {
        assert(err instanceof AssertionError);
        assert.strictEqual(err.actual, str);
        assert.strictEqual(err.expected, pattern);
        assert.strictEqual(err.operator, 'match');
        assert.strictEqual(
          err.message,
          `The input did not match the regular expression ${inspect(pattern)
          }. Input:\n\n${inspect(str)}\n`,
        );
        return true;
      },
    );
  });

  for (const arg of [undefined, null, 1, {}, /test/]) {
    it(`throws AssertionError if first arg is ${inspect(arg)}`, () => {
      assert.throws(
        () => match(arg, /test/),
        (err) => {
          assert(err instanceof AssertionError);
          assert.strictEqual(
            err.message,
            'The "string" argument must be of type string. Received type ' +
              `${typeof arg} (${inspect(arg)})`,
          );
          assert.strictEqual(err.code, 'ERR_ASSERTION');
          return true;
        },
      );
    });
  }

  for (const arg of [undefined, null, 1, {}, 'test']) {
    it(`throws AssertionError if second arg is ${inspect(arg)}`, () => {
      assert.throws(
        () => match('test', arg),
        (err) => {
          assert(err instanceof TypeError);
          // Note: Not worth duplicating all of INVALID_ARG_TYPE formatting
          // https://github.com/nodejs/node/blob/v15.6.0/lib/internal/errors.js#L1100-L1118
          assert(
            /^The "regexp" argument must be an instance of RegExp\. Received /
              .test(err.message),
          );
          assert.strictEqual(err.code, 'ERR_INVALID_ARG_TYPE');
          return true;
        },
      );
    });
  }
}

function describeDoesNotMatch({ doesNotMatch }) {
  it('does not throw if first arg does not match second arg', () => {
    doesNotMatch('hi', /ho/);
    doesNotMatch('hello', /LL/);
    doesNotMatch('Hello', /^el/);
  });

  it('throws if first arg matches the second arg', () => {
    const str = 'hello';
    const pattern = /ll/;
    assert.throws(
      () => doesNotMatch(str, pattern),
      (err) => {
        assert(err instanceof AssertionError);
        assert.strictEqual(err.actual, str);
        assert.strictEqual(err.expected, pattern);
        assert.strictEqual(err.operator, 'doesNotMatch');
        assert.strictEqual(
          err.message,
          `The input was expected to not match the regular expression ${
            inspect(pattern)}. Input:\n\n${inspect(str)}\n`,
        );
        return true;
      },
    );
  });

  for (const arg of [undefined, null, 1, {}, /test/]) {
    it(`throws AssertionError if first arg is ${inspect(arg)}`, () => {
      assert.throws(
        () => doesNotMatch(arg, /test/),
        (err) => {
          assert(err instanceof AssertionError);
          assert.strictEqual(
            err.message,
            'The "string" argument must be of type string. Received type ' +
              `${typeof arg} (${inspect(arg)})`,
          );
          assert.strictEqual(err.code, 'ERR_ASSERTION');
          return true;
        },
      );
    });
  }

  for (const arg of [undefined, null, 1, {}, 'test']) {
    it(`throws AssertionError if second arg is ${inspect(arg)}`, () => {
      assert.throws(
        () => doesNotMatch('test', arg),
        (err) => {
          assert(err instanceof TypeError);
          // Note: Not worth duplicating all of INVALID_ARG_TYPE formatting
          // https://github.com/nodejs/node/blob/v15.6.0/lib/internal/errors.js#L1100-L1118
          assert(
            /^The "regexp" argument must be an instance of RegExp\. Received /
              .test(err.message),
          );
          assert.strictEqual(err.code, 'ERR_INVALID_ARG_TYPE');
          return true;
        },
      );
    });
  }
}

// Run tests against the assert module on Node.js >= 15 to ensure correctness.
if (nodeVersion[0] >= 15) {
  describe('assert.match', () => describeMatch(assert));
  describe('assert.doesNotMatch', () => describeDoesNotMatch(assert));
}

describe('assertShim.match', () => describeMatch(assertImpl));
describe('assertShim.doesNotMatch', () => describeDoesNotMatch(assertImpl));
