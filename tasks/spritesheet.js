'use strict';

/**
 * Combine images into sprite sheet.
 *
 * To use, require in your gulpfile.js.
 */

// Generate sprite sheet
//gulp.task('spritesheet', function () {
//  var stream = gulp.src('app/images/icons/**/*.png')
//
//    // Only continue with this task if any icon has been modified after the
//    // last time the spritesheet has been generated.
//    .pipe($.newer('.tmp/images/sprites.png'))
//
//    .pipe(browserSync.reload({ stream: true, once: true }))
//    .pipe($.spritesmith({
//      imgName: 'sprites.png',
//      imgPath: '../images/sprites.png',
//      cssName: 'sprites.scss',
//      cssTemplate: 'app/styles/scss.template.mustache',
//      padding: 4
//    }));
//
//  // Output for image file.
//  stream.img
//    .pipe(gulp.dest('.tmp/images'));
//
//  // Output for style file.
//  stream.css
//    .pipe(gulp.dest('.tmp/styles'));
//
//  return stream;
//});
