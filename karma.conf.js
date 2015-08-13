'use strict';

// this module

module.exports = function (karma) {
  karma.set({
    browsers: ['PhantomJS', 'Firefox'],
    frameworks: ['browserify', 'tap'],
    files: ['test/**/*.js'],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    singleRun: true
  });
};
