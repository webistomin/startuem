const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const resizer = require('gulp-images-resizer');
const rename = require('gulp-rename');

gulp.task('resize:img', function() {

  return gulp.src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {

        return {
          title: 'Retina images',
          message: err.message,
        };

      }),
    }))
    .pipe(resizer({
      width: '200%',
    }))
    .pipe(rename({
      suffix: '@2x',
    }))
    .pipe(gulp.dest('build/img'));

});
