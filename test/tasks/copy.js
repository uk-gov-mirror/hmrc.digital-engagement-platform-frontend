'use strict';

// Dependencies
var gulp = require('gulp'),
	copy = require('gulp-copy');

// Copy govuk_template_mustache assets
gulp.task('copy:govuk_template_mustache', function () {
    return gulp.src(['./node_modules/govuk_template_mustache/assets/**/*'])
        .pipe(gulp.dest('../../public'));
});

// Copy jQuery
gulp.task('copy:jquery', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('../../public/javascripts/vendor'));
});

// Copy binds box
gulp.task('copy:binds', function () {
    return gulp.src(['./node_modules/govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js'])
        .pipe(gulp.dest('../../public/javascripts/src'));
});

// Copy selection box
gulp.task('copy:selection', function () {
    return gulp.src(['./node_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js'])
        .pipe(gulp.dest('../../public/javascripts/src'));
});

// Copy images
gulp.task('copy:icons', function () {
    return gulp.src([
        './node_modules/govuk_frontend_toolkit/images/*.png',
        './node_modules/govuk_frontend_toolkit/images/crests/org_crest_*.png'
    ])
        .pipe(gulp.dest('../../public/images'));
});

// Copy assets
gulp.task('copy:assets', function () {
    return gulp.src([
        './node_modules/govuk-frontend/govuk/assets/**/*'
    ])
        .pipe(gulp.dest('../../public/govuk/'));
});


// Copy public html
gulp.task('copy:publicHtml', function () {
    return gulp.src(['./public-folder/*.*'])
        .pipe(gulp.dest('../../public/html'));
});


// Run copy task
gulp.task('copy', [ 'copy:govuk_template_mustache', 'copy:jquery', 'copy:selection', 'copy:binds', 'copy:icons', 'copy:assets', 'copy:publicHtml']);
