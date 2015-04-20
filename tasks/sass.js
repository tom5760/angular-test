/**
 * Compile SASS/SCSS to CSS, and run autoprefixer.
 */

'use strict';

//// IMPORT MODULES

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var util = require('util');

var browserSync = require('./browserSync');

//// CONFIG

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//// TASKS

function onError(err) {
  var message = util.format('(SASS) %s[%d, %d]: %s',
      path.relative(__dirname, err.file), err.line, err.column, err.message);

  console.error(message);
  browserSync.notify(message, 5000);

  if (!browserSync.active) {
    throw new gutil.PluginError('gulp-sass', err);
  }
}

gulp.task('sass', function () {
  return gulp.src('app/app.scss')
    .pipe(sourcemaps.init())

    .pipe(sass({ onError: onError }))
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))

    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(size({ title: 'styles' }))

    .pipe(browserSync.stream({ match: '**/*.css' }));
});
