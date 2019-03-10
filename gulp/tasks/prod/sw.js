const gulp = require('gulp');
const swPrecache = require('sw-precache');

gulp.task('sw', function(callback) {
  swPrecache.write('./build/service-worker.js', {
    staticFileGlobs: ['./build' + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
  }, callback);
});
