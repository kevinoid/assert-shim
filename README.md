Node assert Shim
================

[![Build Status](https://img.shields.io/github/workflow/status/kevinoid/assert-shim/Node.js%20CI/main.svg?style=flat&label=build)](https://github.com/kevinoid/assert-shim/actions?query=branch%3Amain)
[![Coverage](https://img.shields.io/codecov/c/github/kevinoid/assert-shim.svg?style=flat)](https://codecov.io/github/kevinoid/assert-shim?branch=main)
[![Dependency Status](https://img.shields.io/david/kevinoid/assert-shim.svg?style=flat)](https://david-dm.org/kevinoid/assert-shim)
[![Supported Node Version](https://img.shields.io/node/v/@kevinoid/assert-shim.svg?style=flat)](https://www.npmjs.com/package/@kevinoid/assert-shim)
[![Version on NPM](https://img.shields.io/npm/v/@kevinoid/assert-shim.svg?style=flat)](https://www.npmjs.com/package/@kevinoid/assert-shim)

An implementation of the [Node.js v15.6.0 assert
module](https://nodejs.org/dist/v15.6.0/docs/api/assert.html) for Node.js 10
and later.

**Warning:** This module is a work-in-progress, on an as-needed basis, which
is why I'm publishing it in the `@kevinoid` namespace.  If/When reasonable API
coverage is achieved, I'll plan to publish without a namespace and promote it
more broadly.  See [Implemented APIs](#implemented-apis) for progress.


## Introductory Example

```js
const assert = require('@kevinoid/assert-shim');
assert.match('Hello World', /hello/i);
```

This code will work on any Node.js version supported by this module.


## Features

* Does not modify `assert` module.
* Forward-compatible, drop-in replacement for `assert` module.
  All properties of `assert` are exported from `assert-shim` to make switching
  between the two easy.
* `assert` module functions are used when available.  (i.e.
  `require('@kevinoid/assert-shim').match === require('assert').match` on
  Node.js versions which provide
  [`assert.match`](https://nodejs.org/api/assert.html#assert_assert_match_string_regexp_message) (v13.6/v12.16 or
  later).


## Installation

[This package](https://www.npmjs.com/package/@kevinoid/assert-shim) can be
installed using [npm](https://www.npmjs.com/), either globally or locally, by
running:

```sh
npm install @kevinoid/assert-shim
```

## API Docs

This module provides the same API as [assert from Node.js
v15](https://nodejs.org/dist/v15.6.0/docs/api/assert.html#assert_assert_match_string_regexp_message).


## Implemented APIs

- [`match`](https://nodejs.org/api/assert.html#assert_assert_match_string_regexp_message)/[`doesNotMatch`](https://nodejs.org/api/assert.html#assert_assert_doesnotmatch_string_regexp_message)


## Contributing

Contributions are appreciated.  Contributors agree to abide by the [Contributor
Covenant Code of
Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).
If this is your first time contributing to a Free and Open Source Software
project, consider reading [How to Contribute to Open
Source](https://opensource.guide/how-to-contribute/)
in the Open Source Guides.

If the desired change is large, complex, backwards-incompatible, can have
significantly differing implementations, or may not be in scope for this
project, opening an issue before writing the code can avoid frustration and
save a lot of time and effort.


## License

This project is available under the terms of the [MIT License](LICENSE.txt)
(The [same license as
Node.js](https://raw.githubusercontent.com/nodejs/node/master/LICENSE)).  See
the [summary at TLDRLegal](https://tldrlegal.com/license/mit-license).
