/**
 * Assert module with functions back-ported from current Node.js releases.
 *
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 * @module assert-shim
 */

'use strict';

const assert = require('assert');

const assertImpl = require('./assert-impl.js');

// Copy properties to shim to avoid modifying assert
const assertShim = function ok(...args) {
  return assert(...args);
};
Object.assign(assertShim, assert);

// Copy properties to strict shim to avoid modifying assert.strict
assertShim.strict = function strict(...args) {
  return assert.strict(...args);
};
Object.assign(assertShim.strict, assert.strict);
assertShim.strict.strict = assertShim.strict;

// By default, export the original assert module.
// If any properties need to be shimmed, assertShim is exported.
module.exports = assert;

// TODO [engine:node@>=12.16]: Remove this polyfill
if (!assert.match) {
  module.exports = assertShim;

  assertShim.match = assertImpl.match;
  assertShim.doesNotMatch = assertImpl.doesNotMatch;
  assertShim.strict.match = assertImpl.match;
  assertShim.strict.doesNotMatch = assertImpl.doesNotMatch;
}
