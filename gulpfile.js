'use strict';

var gulp = require('gulp');
const del = require('del');
const { task,src } = require('gulp');
var jest = require('gulp-jest').default;
 
gulp.task('jest', function () {
  return gulp.src('./test/javascripts/**/*.spec.js').pipe(jest({
    "testRegex": "((\\.|/*.)(spec))\\.js?$",
    "automock": false
  }));
});

task('clean:node_modules', function () {
  return del(['node_modules'], {force: true});
});

