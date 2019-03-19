const gulp = require('gulp');
const runSequence = require('run-sequence');
const psi = require('psi');

const site = 'http://versan-e859e.firebaseapp.com';

gulp.task('psi:mobile', () => psi.output(site, {
  nokey: true,
  strategy: 'mobile',
}));

gulp.task('psi:desktop', () => psi.output(site, {
  nokey: true,
  strategy: 'desktop',
}));

gulp.task('psi:test', () => {

  runSequence('psi:mobile', 'psi:desktop');

});
