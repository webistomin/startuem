const gulp = require('gulp');
const psi = require('psi');
const site = 'http://versan-e859e.firebaseapp.com';

gulp.task('mobile', () => {
  return psi.output(site, {
    nokey: true,
    strategy: 'mobile',
  })
});

gulp.task('desktop', () => {
  return psi.output(site, {
    nokey: true,
    strategy: 'desktop',
  })
});
