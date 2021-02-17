/**
 * Assert module with functions back-ported from current Node.js releases.
 *
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

'use strict';

const assertShim = require('.');

module.exports = assertShim.strict;
