/**
 * Clean output directories
 */

'use strict';

//// IMPORT MODULES

var del = require('del');
var gulp = require('gulp');

gulp.task('clean', function (done) {
  del([
      '.tmp',
      'dist'
    ], done);
});
