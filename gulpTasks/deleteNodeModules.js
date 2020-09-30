'use strict';

const del = require('del');
const { task } = require('gulp');

task('clean:node_modules', function () {
  return del(['node_modules'], {force: true});
});

