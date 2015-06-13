/**
 * Lint JavaScript files.
 */

'use strict';

//// IMPORT MODULES

var gif = require('gulp-if');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mapStream = require('map-stream');
var stylish = require('jshint-stylish');
var util = require('util');

var browserSync = require('./browserSync');

//// CONFIG

var CONFIG = {
  // Gulp plugin options
  lookup: false,

  // JSHint options
  bitwise: true,
  curly: true,
  eqeqeq: true,
  forin: true,
  freeze: true,
  latedef: true,
  noarg: true,
  node: true,
  nonew: true,
  strict: true,
  undef: true,
  unused: true
};

//// TASKS

function reporter(file, cb) {
  if (!file.jshint.success) {
    var message = util.format('(JSHINT) %s: %d errors', file.path, file.jshint.results.length);
    browserSync.notify(message, 5000);
  }
  cb(null, file);
}

gulp.task('jshint', function () {
  return gulp.src([
      'gulpfile.js',
      'tasks/**/*.js'
    ])
    .pipe(jshint(CONFIG))
    .pipe(jshint.reporter(stylish))
    .pipe(mapStream(reporter))
    .pipe(gif(!browserSync.active, jshint.reporter('fail')));
});
