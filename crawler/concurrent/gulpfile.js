var gulp = require('gulp'),
  	browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
        	baseDir: "./public"
        }
    });
    gulp.watch('public/css/*.css', function () {
      console.log('watch');
      browserSync.reload();
    });
    gulp.watch("public/*.html").on('change', browserSync.reload);
});
gulp.task('dev', ['serve']);