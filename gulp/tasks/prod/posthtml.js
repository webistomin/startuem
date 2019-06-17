const gulp = require('gulp');
const postHTML = require('gulp-posthtml');
const postHTMLBeautify = require('posthtml-beautify');
const postHTMLAlt = require('posthtml-alt-always');
const postHTMLAttrSorter = require('posthtml-attrs-sorter');

const config = () => ({
  plugins: [
    postHTMLBeautify({
      rules: {
        indent: 2,
        blankLines: false,
      },
    }),
    postHTMLAlt(),
    postHTMLAttrSorter(),
  ],
});

gulp.task('posthtml', () => gulp.src('./build/*.html')
  .pipe(postHTML(config))
  .pipe(gulp.dest('./build')));
