'use strict';

// this module

/**
@param {(String|String[])} name
@returns {Promise}
*/
function promisedRequire (name) {
  if (Array.isArray(name)) {
    return Promise.all(name.map(function (n) {
      return promisedRequire(n);
    }));
  }
  return new Promise(function (resolve) {
    global.require([name], function (result) {
      resolve(result);
    });
  });
}

module.exports = promisedRequire;
