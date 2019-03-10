const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('server',  function() {
  browserSync.init({
    server: {baseDir: './build/'}
  });

  gulp.watch('src/views/**/*.*', ['pug']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['copy:js']);
  gulp.watch('src/img/**/*.*', ['copy:img']);
});
