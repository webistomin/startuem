const gulp = require('gulp');
const merge = require('gulp-merge');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const BABEL_POLYFILL = './node_modules/babel-polyfill/browser.js';

gulp.task('js:build', function() {
  return merge(
    gulp.src(BABEL_POLYFILL),
    gulp.src('src/js/lib/*.js'),
    gulp.src(['!src/js/service-worker-register.js', 'src/js/*.js'])
      .pipe(babel())
  )
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest("build/js"))
});
