const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');

gulp.task('img:build', function() {

  return gulp.src('src/img/**/*.+(jpg|jpeg|gif|png|webp|svg)')
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {

        return {
          title: 'Images',
          message: err.message,
        };

      }),
    }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo()]))
    .pipe(gulp.dest('./build/img'));

});
