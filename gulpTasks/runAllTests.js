'use strict';

const { src,task } = require('gulp');
const jasmine = require('gulp-jasmine');

task('test', function() {
  return src('./test/javascripts/**/*.js').pipe(jasmine({verbose:true}))
});
