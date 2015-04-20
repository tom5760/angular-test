/**
 * Run development server, watch for changes.
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');
var runSequence = require('run-sequence');

var browserSync = require('./browserSync');

//// TASKS

gulp.task('serve', ['clean'], function () {
  runSequence(['tslint:dev', 'ts', 'sass'], function () {
    browserSync.init({
      ghostMode: false,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components',
          // For sourcemaps
          '/source': 'app'
        }
      }
    });

    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/images/**/*', browserSync.reload);
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch('app/**/*.ts', function () { runSequence('ts'); });

    gulp.watch(['gulpfile.js', 'tasks/**/*.js'], ['jscs', 'jshint']);
  });
});
