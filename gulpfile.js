'use strict';

//// IMPORT MODULES

var gulp = require('gulp');

// This module will automatically include any packages with the name "gulp-*"
// defined in package.json.
var $ = require('gulp-load-plugins')();

var argv = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var git = require('git-rev');
var path = require('path');
var q = require('q');
var runSequence = require('run-sequence');

//// CONFIGURATION

var appConfig = {
  version: '2.0.0',
  appModule: 'test.app',
  configModule: 'test.config',
  package: 'test.app',
  name: 'TestApp'
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//// TASKS

// Choose SASS/SCSS or LESS
require('./tasks/sass.js').create(AUTOPREFIXER_BROWSERS);
//require('./tasks/less.js').create(AUTOPREFIXER_BROWSERS);

// Lint all JavaScript
gulp.task('jshint', ['jshint:app', 'jshint:tests']);

// Lint application JavaScript
gulp.task('jshint:app', function () {
  return gulp.src([
      'gulpfile.js',
      'app/**/*.js',
      '!app/**/*.spec.js',
      '!app/vendor/**/*.js'
    ])
    .pipe(browserSync.reload({ stream: true, once: true }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JavaScript unit tests
gulp.task('jshint:tests', function () {
  return gulp.src([
      'src/**/*.spec.js',
      'test/**/*.js'
    ])
    .pipe(browserSync.reload({ stream: true, once: true }))
    .pipe($.jshint(require('./test/jshint.json')))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({ title: 'images' }));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', ['copy:deps', 'copy:fonts'], function () {
  return gulp.src([
    'app/favicon.ico',
    'app/manifest.json',
    'app/robots.txt'
  ], {
    dot: true
  })
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'copy' }));
});

// Copy needed dependency files
gulp.task('copy:deps', function () {
  return gulp.src([
    'bower_components/fontawesome/fonts/**',
    'bower_components/roboto-fontface/fonts/**'
  ], {
    dot: true,
    base: '.'
  })
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'copy:deps' }));
});

// Copy Web Fonts To Dist
gulp.task('copy:fonts', function () {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({ title: 'fonts' }));
});

// Concatenate templates and inject into Angular $templateCache
gulp.task('templates', function () {
  return gulp.src('app/components/**/*.html')
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache('templates.js', {
      module: appConfig.appModule,
      root: 'components/'
    }))
    .pipe(gulp.dest('.tmp'));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', ['templates'], function () {
  var assets = $.useref.assets({ searchPath: '{.tmp,app,bower_components}' });

  var jsFilter = $.filter('**/*.js');

  return gulp.src('app/index.html')
    .pipe($.inject(gulp.src('.tmp/templates.js', { read: false }), {
      starttag: '<!-- inject:templates -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets)

    // Concatenate And Minify JavaScript
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(jsFilter.restore())

    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))

    .pipe(assets.restore())
    .pipe($.useref())

    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml()))

    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({ title: 'html' }));
});

// Generate config.js for Angular from config files
gulp.task('config', function () {
  var deferred = q.defer();
  var configFile = (argv.config || 'dev') + '.json';

  git.short(function (rev) {
    deferred.resolve(gulp.src(path.join('config', configFile))
      .pipe(browserSync.reload({ stream: true, once: true }))
      .pipe($.ngConstant({
        name: appConfig.configModule,
        constants: {
          BUILD: {
            COMMIT: rev,
            CONFIG: configFile,
            VERSION: appConfig.version
          }
        }
      }))
      .pipe($.rename('config.js'))
      .pipe(gulp.dest('.tmp')));
  });

  return deferred.promise;
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], { dot: true }));

// Watch Files For Changes & Reload
gulp.task('serve', ['config', 'styles'], function () {
  browserSync({
    ghostMode: false,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        // For sourcemaps
        '/source': 'app'
      },
      middleware: [proxyRequestMiddleware]
    }
  }, setupBrowserSyncWebsocket);

  gulp.watch(['app/**/*.html'], browserSync.reload);
  gulp.watch(['app/**/*.{scss,css}'], ['styles']);
  gulp.watch(['app/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], browserSync.reload);
  gulp.watch(['config/*.json'], ['config', browserSync.reload]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    ghostMode: false,
    server: {
      baseDir: 'dist',
      middleware: [proxyRequestMiddleware]
    }
  }, setupBrowserSyncWebsocket);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['config', 'jshint', 'styles'], ['html', 'images', 'fonts', 'copy'], cb);
});
