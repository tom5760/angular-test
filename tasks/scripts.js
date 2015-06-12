/**
 * Compile TypeScript code
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');

var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

var browserSync = require('./browserSync');

//// TASKS

var project = ts.createProject({
  target: 'ES5',
  emitDecoratorMetadata: true,

  noEmitOnError: true,
  typescript: require('typescript')
});

function reporter(err) {
  console.error(err.message);
  browserSync.notify(err.message, 5000);
}

gulp.task('scripts', ['tslint:dev'], function () {
  return gulp.src([
      'app/**/*Module.ts',
      'app/**/*.ts'
    ])
    .pipe(sourcemaps.init())

    .pipe(ts(project, undefined, { error: reporter }))
    .pipe(wrap('(function () {\n\'use strict\';\n<%= contents %>}());'))
    .pipe(concat('scripts.js'))
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    .pipe(ngAnnotate({ single_quotes: true }))
    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    .pipe(uglify())

    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp'))

    .pipe(size({ title: 'scripts' }))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});
