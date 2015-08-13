# promised-requirejs

a Promise interface for loading AMD modules via Require.js

## API

[dist/index.js](dist/index.js) exports a CommonJS module, an AMD module, or a
global `promisedRequire` variable.


### `promisedRequire()`

@param {(String|String[])} name - module(s) that you wish to load
@returns {Promise}

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
