'use strict';

// this module

/**
@param {(String|String[])} name
@returns {Promise}
*/
function promisedRequire (name) {
  if (Array.isArray(name)) {
    return Promise.all(name.map((n) => {
      return promisedRequire(n);
    }));
  }
  return new Promise(function (resolve, reject) {
    global.requirejs([name], (result) => {
      resolve(result);
    }, (err) => {
      var failedId = err.requireModules && err.requireModules[0];
      if (failedId === name) {
        global.requirejs.undef(name);
        reject(err);
      }
    });
  });
}

module.exports = promisedRequire;
