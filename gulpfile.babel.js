"use strict";
const gulp = require('gulp');
const runSequence = require('run-sequence');
global.tasker = require('gulp-tasker');
tasker.loadTasks({
  path: '/gulp/tasks',
  recurse: true
});

gulp.task('dev', function(){
  runSequence(
    'clean:build',
    ['sass', 'print:css', 'pug', 'copy:js', 'copy:img'],
    'server',
  );
});

gulp.task('build', function(){
  runSequence(
    'clean:build',
    ['sass:build', 'print:css', 'pug', 'js:build', 'img:build'],
    'sw'
  );
});
