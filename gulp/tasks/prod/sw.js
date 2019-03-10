const gulp = require('gulp');
const swPrecache = require('sw-precache');
const uglify = require('gulp-uglify-es').default;
const rootDir = 'build';

gulp.task('sw', function() {
  swPrecache.write('./build/service-worker.js', {
    staticFileGlobs: [rootDir  + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir
  });
  gulp.src('src/js/service-worker-register.js')
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
});
