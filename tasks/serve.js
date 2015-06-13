/**
 * Run development server, watch for changes.
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');
var runSequence = require('run-sequence');
var modrewrite = require('connect-modrewrite');

var browserSync = require('./browserSync');

//// TASKS

gulp.task('serve', function (done) {
  runSequence('clean', ['scripts', 'styles', 'fonts'], 'serve:start', done);
});

gulp.task('serve:start', function () {
  browserSync.init({
    ghostMode: false,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: modrewrite([
        // For angular html5mode
        '!\\.\\w+$ /index.html [L]'
      ]),
      routes: {
        '/bower_components': 'bower_components',
        // For sourcemaps
        '/source': 'app'
      }
    }
  });

  gulp.watch('app/images/**/*', browserSync.reload);
  gulp.watch('app/**/*.scss', ['styles:app']);
  gulp.watch('app/**/*.html', ['scripts:app']);
  gulp.watch('app/**/*.ts', ['tslint:dev', 'scripts:app']);

  gulp.watch('bower.json', ['scripts:vendor', 'styles:vendor']);
  gulp.watch(['gulpfile.js', 'tasks/**/*.js'], ['jscs', 'jshint']);
});

gulp.task('serve:dist', ['build'], function () {
  browserSync.init({
    ghostMode: false,
    server: {
      baseDir: ['dist'],
      middleware: modrewrite([
        // For angular html5mode
        '!\\.\\w+$ /index.html [L]'
      ])
    },
    snippetOptions: {
      rule: {
        match: /qqqqqqqqq/
      }
    }
  });
});

