const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('copy:img', function() {
  return gulp.src('src/img/**/*.{jpg, jpeg, png, webp, gif}')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Images',
          message: err.message
        }
      })
    }))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})]))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream());
});
