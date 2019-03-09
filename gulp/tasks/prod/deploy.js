const gulp = require('gulp');
const ghPages = require('gulp-gh-pages-will');

gulp.task('deploy', () => {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
