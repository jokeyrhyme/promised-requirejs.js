'use strict';

// this module

/**
- @param {(String|String[])} name - module(s) that you wish to load
- @param {Number} [retries=0] - number of extra attempts in case of error
*/
function promisedRequire (name, retries=0) {
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
        global.console.log(failedId);
        global.requirejs.undef(name);
        let query = `script[data-requirecontext][data-requiremodule="${name}"]`;
        let script = document.querySelector(query);
        if (script) {
          script.parentNode.removeChild(script);
        }
        if (retries < 1) {
          reject(err);
        } else {
          retries -= 1;
          promisedRequire(name, retries).then(resolve, reject);
        }
      }
    });
  });
}

module.exports = promisedRequire;
