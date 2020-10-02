'use strict';

var gulp = require('gulp');
const del = require('del');
const { task,src } = require('gulp');
const jasmine = require('gulp-jasmine');

task('clean:node_modules', function () {
  return del(['node_modules'], {force: true});
});

task('test', function() {
  return src('./test/javascripts/**/*.js').pipe(jasmine({verbose:true}))
});
