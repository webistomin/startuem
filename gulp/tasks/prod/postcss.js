const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postCSSAutoprefixer = require('autoprefixer');
const postCSSInitial = require('postcss-initial');
const postCSSScroll = require('postcss-momentum-scrolling');
const postCSSFlexBugs = require('postcss-flexbugs-fixes');
const postCSSObjectFit = require('postcss-object-fit-images');

const plugins = [
  postCSSFlexBugs(),
  postCSSInitial({
    reset: 'all',
    replace: true
  }),
  postCSSScroll([
    'scroll'
  ]),
  postCSSObjectFit(),
  postCSSAutoprefixer({
    browsers: ['last 2 versions', 'ie >= 11'],
    cascade: false
  })
];

gulp.task('postcss', function() {
  return gulp.src('build/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./build/css'))
});
