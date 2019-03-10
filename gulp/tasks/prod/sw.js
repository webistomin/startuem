const gulp = require('gulp');
const swPrecache = require('sw-precache');
const rootDir = 'build';

gulp.task('sw', function(callback) {
  swPrecache.write('./build/service-worker.js', {
    staticFileGlobs: [rootDir  + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir
  }, callback);
});
