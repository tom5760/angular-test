/**
 * Copy fonts to consistent locations.
 */

'use strict';

var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var rename = require('gulp-rename');
var size = require('gulp-size');

var browserSync = require('./browserSync');

gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles('**/*.{eot,svg,ttf,woff,woff2}'), { base: '.' })
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(size({ title: 'fonts' }))
    .pipe(browserSync.stream());
});
