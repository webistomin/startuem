"use strict";
const gulp = require('gulp');
const runSequence = require('run-sequence');

global.tasker = require('gulp-tasker');
tasker.loadTasks({
  path: '/gulp/tasks',
  recurse: true
});

gulp.task('default', function(){
  runSequence(
    'clean:build',
    ['sass', 'pug', 'copy:js', 'copy:img'],
    'server',
  );
});
