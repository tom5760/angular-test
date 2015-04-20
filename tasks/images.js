/**
 * Copy and optimize images for distribution.
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');

//// TASKS

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe(size({ title: 'images' }));
});
