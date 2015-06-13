/**
 * Compile TypeScript code
 */

'use strict';

//// IMPORT MODULES

var angularTemplateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var mainBowerFiles = require('main-bower-files');
var merge2 = require('merge2');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

var browserSync = require('./browserSync');
var config = require('./config');

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

gulp.task('scripts', function (done) {
  runSequence(['tslint:dev', 'scripts:app', 'scripts:vendor'], done);
});

gulp.task('scripts:app', function () {
  var templates = gulp.src('app/components/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }))
    .pipe(angularTemplateCache({
      module: config.appModule
    }));

  var scripts = gulp.src([
      'app/**/*Module.ts',
      'app/**/*.ts'
    ])
    .pipe(gif(!config._skipSourcemaps, sourcemaps.init()))
    .pipe(ts(project, undefined, { error: reporter }))
    .pipe(wrap('(function () {\n\'use strict\';\n<%= contents %>}());'));

  return merge2(scripts, templates)
    .pipe(concat('app.js'))
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    .pipe(ngAnnotate({ single_quotes: true }))
    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    .pipe(uglify())
    .pipe(gif(!config._skipSourcemaps, sourcemaps.write()))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(size({ title: 'scripts:app' }))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('scripts:vendor', function () {
  return gulp.src(mainBowerFiles('**/*.js'))
    .pipe(gif(!config._skipSourcemaps, sourcemaps.init()))
    .pipe(concat('vendor.js'))
    //.pipe(uglify({ preserveComments: 'some' }))
    .pipe(gif(!config._skipSourcemaps, sourcemaps.write()))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(size({ title: 'scripts:vendor' }))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});
