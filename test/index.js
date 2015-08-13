'use strict';

// foreign modules

let test = require('tape');
require('tape-chai');

// local modules

let load = require('@jokeyrhyme/load');
let promisedRequire = require('..');

// this modules

const REQUIRE_JS = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js';
const PROMISE_JS = 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.34/bluebird.min.js';

test('exports a function', (t) => {
  t.isFunction(promisedRequire);
  t.end();
});

test('Promise implemented', (t) => {
  if (global.Promise) {
    t.isDefined(global.Promise);
    t.end();
    return;
  }
  t.plan(2);
  load(PROMISE_JS, function (err) {
    t.error(err);
    t.isDefined(global.Promise);
  });
});

test('Require.js loaded', (t) => {
  t.plan(3);
  load(REQUIRE_JS, function (err) {
    t.error(err);
    t.isFunction(global.requirejs);
    t.isFunction(global.requirejs.config);
    global.requirejs.config({
      paths: {
        bacon: 'https://cdnjs.cloudflare.com/ajax/libs/bacon.js/0.7.71/Bacon.min',
        inaccessible: 'https://localhost/inaccessible',
        moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min'
      }
    });
  });
});

test('promisedRequire("bacon")', (t) => {
  global.requirejs.undef('bacon');
  promisedRequire('bacon')
  .then((Bacon) => {
    t.pass('should resolve');
    t.isObject(Bacon, 'global.Bacon is an Object');
    t.end();
  })
  .catch((err) => {
    t.fail('should not reject');
    t.error(err);
    t.end();
  });
});

test('promisedRequire("inaccessible")', (t) => {
  global.requirejs.undef('inaccessible');
  promisedRequire('inaccessible')
  .then(() => {
    t.fail('should not resolve');
    t.end();
  })
  .catch((err) => {
    t.pass('should reject');
    t.instanceOf(err, Error);
    t.end();
  });
});

test('promisedRequire(["bacon", "moment"])', (t) => {
  global.requirejs.undef('bacon');
  global.requirejs.undef('moment');
  promisedRequire(['bacon', 'moment'])
  .then(([Bacon, Moment]) => {
    t.pass('should resolve');
    t.isObject(Bacon, 'global.Bacon is an Object');
    t.isFunction(Moment, 'global.Moment is a Function');
    t.end();
  })
  .catch((err) => {
    t.fail('should not reject');
    t.error(err);
    t.end();
  });
});

test('promisedRequire(["moment", "inaccessible"])', (t) => {
  global.requirejs.undef('moment');
  global.requirejs.undef('inaccessible');
  promisedRequire(['moment', 'inaccessible'])
  .then(() => {
    t.fail('should not resolve');
    t.end();
  })
  .catch((err) => {
    t.pass('should reject');
    t.instanceOf(err, Error);
    t.end();
  });
});

test('promisedRequire("inaccessible", 3) creates 4 script elements', (t) => {
  var oldFn = document.createElement;
  var calls = 0;
  document.createElement = function () {
    calls += 1;
    return oldFn.apply(document, arguments);
  };

  promisedRequire('inaccessible', 3)
  .then(() => {
    t.fail('should not resolve');
    t.end();
  })
  .catch((err) => {
    t.pass('should reject');
    t.instanceOf(err, Error);
    t.equal(calls, 4);
    document.createElement = oldFn;
    t.end();
  });
});
