'use strict';

// Load tasks from "tasks" directory.
try {
  require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}

//  "scripts": {
//    "install": "node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update",
//    "test": "grunt test"
//  },

//// Copy All Files At The Root Level (app)
//gulp.task('copy', ['copy:deps', 'copy:fonts'], function () {
//  return gulp.src([
//    'app/favicon.ico',
//    'app/manifest.json',
//    'app/robots.txt'
//  ], {
//    dot: true
//  })
//    .pipe(gulp.dest('dist'))
//    .pipe($.size({ title: 'copy' }));
//});
//
//// Copy needed dependency files
//gulp.task('copy:deps', function () {
//  return gulp.src([
//    'bower_components/fontawesome/fonts/**',
//    'bower_components/roboto-fontface/fonts/**'
//  ], {
//    dot: true,
//    base: '.'
//  })
//    .pipe(gulp.dest('dist'))
//    .pipe($.size({ title: 'copy:deps' }));
//});
//
//// Copy Web Fonts To Dist
//gulp.task('copy:fonts', function () {
//  return gulp.src(['app/fonts/**'])
//    .pipe(gulp.dest('dist/fonts'))
//    .pipe($.size({ title: 'fonts' }));
//});
//
//// Concatenate templates and inject into Angular $templateCache
//gulp.task('templates', function () {
//  return gulp.src('app/components/**/*.html')
//    .pipe($.minifyHtml())
//    .pipe($.angularTemplatecache('templates.js', {
//      module: appConfig.appModule,
//      root: 'components/'
//    }))
//    .pipe(gulp.dest('.tmp'));
//});
//
//// Scan Your HTML For Assets & Optimize Them
//gulp.task('html', ['templates'], function () {
//  var assets = $.useref.assets({ searchPath: '{.tmp,app,bower_components}' });
//
//  var jsFilter = $.filter('**/*.js');
//
//  return gulp.src('app/index.html')
//    .pipe($.inject(gulp.src('.tmp/templates.js', { read: false }), {
//      starttag: '<!-- inject:templates -->',
//      ignorePath: '.tmp',
//      addRootSlash: false
//    }))
//    .pipe(assets)
//
//    // Concatenate And Minify JavaScript
//    .pipe(jsFilter)
//    .pipe($.ngAnnotate())
//    .pipe($.uglify({ preserveComments: 'some' }))
//    .pipe(jsFilter.restore())
//
//    // Concatenate And Minify Styles
//    .pipe($.if('*.css', $.csso()))
//
//    .pipe(assets.restore())
//    .pipe($.useref())
//
//    // Minify Any HTML
//    .pipe($.if('*.html', $.minifyHtml()))
//
//    // Output Files
//    .pipe(gulp.dest('dist'))
//    .pipe($.size({ title: 'html' }));
//});
//
//// Generate config.js for Angular from config files
//gulp.task('config', function () {
//  var deferred = q.defer();
//  var configFile = (argv.config || 'dev') + '.json';
//
//  git.short(function (rev) {
//    deferred.resolve(gulp.src(path.join('config', configFile))
//      .pipe(browserSync.reload({ stream: true, once: true }))
//      .pipe($.ngConstant({
//        name: appConfig.configModule,
//        constants: {
//          BUILD: {
//            COMMIT: rev,
//            CONFIG: configFile,
//            VERSION: appConfig.version
//          }
//        }
//      }))
//      .pipe($.rename('config.js'))
//      .pipe(gulp.dest('.tmp')));
//  });
//
//  return deferred.promise;
//});
//
//// Clean Output Directory
//gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], { dot: true }));
//
//// Watch Files For Changes & Reload
//gulp.task('serve', ['config', 'styles'], function () {
//  browserSync({
//    ghostMode: false,
//    server: {
//      baseDir: ['.tmp', 'app'],
//      routes: {
//        '/bower_components': 'bower_components',
//        // For sourcemaps
//        '/source': 'app'
//      },
//      middleware: [proxyRequestMiddleware]
//    }
//  }, setupBrowserSyncWebsocket);
//
//  gulp.watch(['app/**/*.html'], browserSync.reload);
//  gulp.watch(['app/**/*.{scss,css}'], ['styles']);
//  gulp.watch(['app/**/*.js'], ['jshint']);
//  gulp.watch(['app/images/**/*'], browserSync.reload);
//  gulp.watch(['config/*.json'], ['config', browserSync.reload]);
//});
//
//// Build and serve the output from the dist build
//gulp.task('serve:dist', ['default'], function () {
//  browserSync({
//    ghostMode: false,
//    server: {
//      baseDir: 'dist',
//      middleware: [proxyRequestMiddleware]
//    }
//  }, setupBrowserSyncWebsocket);
//});
//
//// Build Production Files, the Default Task
//gulp.task('default', ['clean'], function (cb) {
//  runSequence(['config', 'jshint', 'styles'], ['html', 'images', 'fonts', 'copy'], cb);
//});
