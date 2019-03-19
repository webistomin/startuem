const gulp = require('gulp');
const responsive = require('gulp-responsive');

gulp.task('resize:img', function() {

  return gulp.src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(responsive(
      {
        '*.jpg': {
          width: '200%',
          rename: { suffix: '@2x' },
          skipOnEnlargement: true,
          withoutEnlargement: false,
        },
      },
    ))
    .pipe(gulp.dest('build/img'));

});
