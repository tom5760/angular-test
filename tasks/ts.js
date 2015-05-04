/**
 * Compile TypeScript code
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');

var browserSync = require('./browserSync');
var concat = require('gulp-concat');
var path = require('path');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

//// TASKS

var project = ts.createProject({
  target: 'ES5',
  module: 'commonjs',
  emitDecoratorMetadata: true,

  noEmitOnError: true,
  typescript: require('typescript')
});

function reporter(err) {
  console.error(err.message);
  browserSync.notify(err.message, 5000);
}

gulp.task('ts', function () {
  return gulp.src('app/**/*.ts')
    .pipe(sourcemaps.init())

    .pipe(ts(project, undefined, { error: reporter }))

    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))

    .pipe(size({ title: 'typescript' }))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});
