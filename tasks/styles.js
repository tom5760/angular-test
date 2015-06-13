/**
 * Compile SASS/SCSS to CSS, and run autoprefixer.
 */

'use strict';

//// IMPORT MODULES

var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('./browserSync');
var config = require('./config');

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
  console.error('SASS:', err.messageFormatted);
  browserSync.notify(err.message, 5000);

  /* jshint -W040 */
  // Let watch restart cleanly
  this.emit('end');
  /* jshint +W040 */
}

gulp.task('styles', function (done) {
  runSequence(['styles:app', 'styles:vendor'], done);
});

gulp.task('styles:app', function () {
  return gulp.src('app/app.scss')
    .pipe(gif(!config._skipSourcemaps, sourcemaps.init()))

    .pipe(sass().on('error', onError))
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(minifyCss())

    .pipe(gif(!config._skipSourcemaps, sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(size({ title: 'styles:app' }))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('styles:vendor', function () {
  return gulp.src(mainBowerFiles('**/*.css', {
      overrides: {
        'roboto-fontface': {
          ignore: true
        }
      }
    }))
    .pipe(gif(!config._skipSourcemaps, sourcemaps.init()))
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({
      keepSpecialComments: '*'
    }))
    .pipe(gif(!config._skipSourcemaps, sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(size({ title: 'styles:vendor' }))
    .pipe(browserSync.stream({ match: '**/*.css' }));

});
