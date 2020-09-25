'use strict';

var gulp = require('gulp'),
del = require('del');

//Wipes node modules
gulp.task('clean:node_modules', function () {
  return del(['node_modules'], {force: true});
});