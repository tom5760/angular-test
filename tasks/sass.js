'use strict';

/**
 * Compile SASS/SCSS to CSS, and run autoprefixer.
 *
 * To use, add something like this to your gulpfile.js
 *
 *    require('./tasks/sass.js');
 */

//// IMPORT MODULES

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');

//// TASKS

exports.create = function (browserConfig) {
  gulp.task('styles', function () {
    return gulp.src('app/app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe(autoprefixer({ browsers: browserConfig }))
      .pipe(gulp.dest('.tmp/styles'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.tmp/styles'))
      .pipe(size({ title: 'styles' }))
      .pipe(filter('**/*.css'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
