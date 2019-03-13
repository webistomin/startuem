const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('js:lint', () => (
  gulp.src(['src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));
