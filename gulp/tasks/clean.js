const gulp = require('gulp');
const del = require('del');

gulp.task('clean:build', function() {
  return del('./build');
});
