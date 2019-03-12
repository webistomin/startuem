const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');

gulp.task('sass:lint', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sassLint({
      configFile: '.sasslintrc',
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
