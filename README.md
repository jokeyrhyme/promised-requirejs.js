# promised-requirejs

a Promise interface for loading AMD modules via Require.js

[![npm module](https://img.shields.io/npm/v/@jokeyrhyme/promised-requirejs.svg)](https://www.npmjs.com/package/@jokeyrhyme/promised-requirejs)
[![travis-ci](https://img.shields.io/travis/jokeyrhyme/promised-requirejs.js.svg)](https://travis-ci.org/jokeyrhyme/promised-requirejs.js)

## API

[dist/index.js](dist/index.js) exports a CommonJS module, an AMD module, or a
global `promisedRequire` variable.


### `promisedRequire(name, retries=0)`

- @param {(`String`|`String[]`)} name - module(s) that you wish to load
- @param {`Number`} [retries=0] - number of extra attempts in case of error
- @returns {`Promise`}

The Promise resolve-handler has the value of the module as its first argument.

If requesting an Array of modules, then the Promise resolve-handler has an Array
of the modules' values as its first argument.

#### Examples

Require.js:

```js
require([
  'bacon', 'moment'
], function (Bacon, Moment) {
  /* TODO: ... */
}, function (err) {
  /* TODO: ... */  
});
```

promisedRequire (ES5):

```js
promisedRequire(['bacon', 'moment'])
.then(function (results) {
  var Bacon = results[0];
  var Moment = results[1];
  /* TODO: ... */
})
.catch(function (err) {
  /* TODO: ... */  
});
```

promisedRequire (ES2015):

```js
promisedRequire(['bacon', 'moment'])
.then(([ Bacon, Moment ]) => {
  /* TODO: ... */
})
.catch(function (err) {
  /* TODO: ... */  
});
```
