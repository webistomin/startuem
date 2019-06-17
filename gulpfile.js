const gulp = require('gulp');
const runSequence = require('run-sequence');
global.tasker = require('gulp-tasker');

tasker.loadTasks({
  path: '/gulp/tasks',
  recurse: true,
});

gulp.task('dev', () => {

  runSequence(
    'clean:build',
    ['sass', 'print:css', 'pug', 'copy:js', 'copy:img', 'copy:fonts'],
    'svg:sprite',
    'img:resize',
    'img:webp',
    'server',
    'typograf',
  );

});

gulp.task('build', () => {

  runSequence(
    'clean:build',
    ['sass:build', 'print:css', 'pug', 'js:build', 'img:build', 'copy:fonts'],
    'svg:sprite',
    'img:resize',
    'img:webp',
    'postcss',
    'posthtml',
    // 'generate-favicon',
    // 'inject-favicon-markups',
    'typograf',
  );

});
