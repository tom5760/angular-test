/**
 * Build site for deployment
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var merge2 = require('merge2');
var rename = require('gulp-rename');
var RevAll = require('gulp-rev-all');
var runSequence = require('run-sequence');

var config = require('./config');

//// TASKS

gulp.task('build', function (done) {
  config._skipSourcemaps = true;
  runSequence('clean', ['scripts', 'styles', 'fonts'], 'build:rev', done);
});

gulp.task('build:rev', function () {
  var revAll = new RevAll({
    dontRenameFile: ['.html', '.ico', '.webapp'],
    dontUpdateReference: ['.html', '.ico', '.webapp'],
    dontSearchFile: ['vendor.js', 'vendor.css']
  });

  var app = gulp.src([
      'app/*',
      '!app/app.ts',
      '!app/app.scss'
    ], { base: '.' })
    .pipe(rename({ dirname: '' }));

  var tmp = gulp.src('.tmp/**/*', { base: '.' })
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace(/\.tmp\/?/, '');
    }));

  var images = gulp.src('app/images/**/*', { base: '.' })
    .pipe(rename({ dirname: 'images' }))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }));

  return merge2([app, tmp, images])
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'));
});
