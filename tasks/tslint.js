/**
 * Lint TypeScript code
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');

//var browserSync = require('./browserSync');
//var tslint = require('gulp-tslint');
//var util = require('util');

//// CONFIG

var RULES = {
  'class-name': true,
  'comment-format': [
    true,
    'check-space'
  ],
  curly: true,
  eofline: true,
  indent: [true, 4],
  'label-position': true,
  'label-undefined': true,
  'member-ordering': [
    true,
    'public-before-private',
    'static-before-instance',
    'variables-before-functions'
  ],
  'no-arg': true,
  'no-bitwise': true,
  'no-construct': true,
  'no-duplicate-key': true,
  'no-duplicate-variable': true,
  'no-empty': true,
  'no-eval': true,
  'no-string-literal': true,
  'no-trailing-comma': true,
  'no-trailing-whitespace': true,
  'no-unreachable': true,
  'no-unused-expression': true,
  'no-unused-variable': true,
  'no-use-before-declare': true,
  'one-line': [
    true,
    'check-open-brace',
    'check-catch',
    'check-else',
    'check-whitespace'
  ],
  quotemark: [true, 'single'],
  radix: true,
  semicolon: true,
  'triple-equals': [true, 'allow-null-check'],
  'use-strict': [true,
    'check-module',
    'check-function'
  ],
  'variable-name': false,
  whitespace: [
    true,
    'check-branch',
    'check-decl',
    'check-operator',
    'check-separator',
    'check-type'
  ]
};

var RULES_PROD = require('util')._extend({}, {
  'no-debugger': true,
  'no-console': true
}, RULES);

//// TASKS

//function reporter(failures) {
//    failures.forEach(function(failure) {
//      var message = util.format('(tslint %s) %s[%d, %d]: %s',
//        failure.ruleName, failure.name, failure.startPosition.line,
//        failure.startPosition.character, failure.failure);
//
//      console.error(message);
//      browserSync.notify(message, 5000);
//    });
//}

// tslint disabled for now, waiting for TypeScript 1.5 support in upcoming
// release.
//function lint(rules) {
//  return function () {
//    return gulp.src('app/**/*.ts')
//      .pipe(tslint({
//        configuration: {
//          rules: rules
//        }
//      }))
//      .pipe(tslint.report(reporter));
//  };
//}
function lint() {}

gulp.task('tslint:dev', lint(RULES));
gulp.task('tslint:prod', lint(RULES_PROD));
