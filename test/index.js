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
    t.isFunction(global.require);
    t.isFunction(global.requirejs);
  });
});
