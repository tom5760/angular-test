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
var wrap = require('gulp-wrap');

//// TASKS

// Appends a TypeScript directive to set the AMD module name.
function prependModuleName(data) {
  var file = path.relative(data.file.base, data.file.history[0]);
  var name = path.dirname(file) + path.sep + path.basename(file, '.ts');

  if (name.indexOf('./') === 0) {
    name = name.substr(2);
  }

  return '/// <amd-module name="' + name + '" />\n<%= contents %>';
}

function reporter(err) {
  console.error(err.message);
  browserSync.notify(err.message, 5000);
}

gulp.task('ts', function () {
  return gulp.src('app/**/*.ts')
    .pipe(wrap(prependModuleName))
    .pipe(sourcemaps.init())
    .pipe(ts({
      target: 'ES5',
      module: 'amd',
      noEmitOnError: true,
      typescript: require('typescript')
    }, undefined, { error: reporter }))

    .pipe(concat('scripts.js'))

    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('.tmp/scripts'))

    .pipe(size({ title: 'typescript' }))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});
