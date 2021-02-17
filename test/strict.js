/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assert = require('assert');

const assertShim = require('..');
const assertStrict = require('../strict');

describe('assert-shim/strict', () => {
  it('is the same as require("assert-shim").strict', () => {
    assert.strictEqual(assertStrict, assertShim.strict);
  });
});
