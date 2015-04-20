/**
 * Style check JavaScript files.
 */

'use strict';

//// IMPORT MODULES

var gulp = require('gulp');
var jscs = require('gulp-jscs');

//// CONFIG

// See http://jscs.info/rules.html for more options.
var CONFIG = {
  disallowMixedSpacesAndTabs: true,
  disallowMultipleLineStrings: true,
  disallowQuotedKeysInObjects: true,
  disallowSpaceAfterObjectKeys: true,
  disallowSpaceAfterPrefixUnaryOperators: true,
  disallowSpaceBeforePostfixUnaryOperators: true,
  disallowSpacesInCallExpression: true,
  disallowTrailingComma: true,
  disallowTrailingWhitespace: true,
  requireCamelCaseOrUpperCaseIdentifiers: true,
  requireCapitalizedConstructors: true,
  requireCurlyBraces: true,
  requireDotNotation: true,
  requireParenthesesAroundIIFE: true,
  requireSemicolons: true,
  requireSpaceAfterBinaryOperators: true,
  requireSpaceAfterKeywords: true,
  requireSpaceBeforeBinaryOperators: true,
  requireSpaceBeforeBlockStatements: true,
  requireSpaceBeforeKeywords: ['else', 'while', 'catch'],
  requireSpaceBeforeObjectValues: true,
  requireSpaceBetweenArguments: true,
  requireSpacesInAnonymousFunctionExpression: {
    beforeOpeningRoundBrace: true,
    beforeOpeningCurlyBrace: true
  },
  requireSpacesInConditionalExpression: true,
  requireSpacesInForStatement: true,
  requireSpacesInFunctionDeclaration: {
    beforeOpeningCurlyBrace: true
  },
  validateIndentation: 2,
  validateLineBreaks: 'LF',
  validateParameterSeparator: ', ',
  validateQuoteMarks: {
    mark: '\'',
    escape: true
  }
};

//// TASKS

gulp.task('jscs', function () {
  return gulp.src([
      'gulpfile.js',
      'tasks/**/*.js'
    ])
    .pipe(jscs(CONFIG));
});
