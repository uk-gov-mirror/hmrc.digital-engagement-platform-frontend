'use strict';

var gulp = require('gulp'),
Server = require('karma').Server;

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
});

// ~testQuick only for js files
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf.js'
  }, done).start();
});