const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
global.tasker = require('gulp-tasker');

tasker.loadTasks({
  path: '/gulp/tasks',
  recurse: true,
});

gulp.task('dev', (callback) => {
  runSequence(
    'clean:build',
    ['sass', 'print:css', 'pug', 'copy:img', 'copy:fonts'],
    'copy:js:libs',
    'copy:js:custom',
    'svg:sprite',
    'img:resize',
    'img:webp',
    'server',
    'typograf',
    callback,
  );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:build',
    ['sass:build', 'print:css', 'pug', 'img:build', 'copy:fonts'],
    'js:build:libs',
    'js:build:custom',
    'svg:sprite',
    'img:resize',
    'img:webp',
    'postcss',
    'generate-favicon',
    'inject-favicon-markups',
    'typograf',
    'posthtml',
    callback,
  );
});
