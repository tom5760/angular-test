'use strict';

/**
 * Defines tasks to package your app as a Chrome app for Android and iOS.
 *
 * https://github.com/MobileChromeApps/mobile-chrome-apps
 */

//gulp.task('copy:cca', function () {
//  return gulp.src('cca/*')
//    .pipe(gulp.dest('dist'))
//    .pipe($.size({ title: 'copy:cca' }));
//});
//
//// Runs cca setup commands
//gulp.task('cca:setup', $.shell.task([
//  'cca create dist-cca ' + appConfig.package + ' ' + appConfig.name + ' --link-to="dist"',
//  'cd dist-cca && cca prepare android',
//  'cd dist-cca && cca build android'
//]));
//
//// Build Android app
//gulp.task('cca', ['default'], function (cb) {
//  runSequence('copy:cca', 'cca:setup', cb);
//});
