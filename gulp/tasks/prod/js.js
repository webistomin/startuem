const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const webpackStream = require('webpack-stream');

gulp.task('js:build:libs', () => gulp.src('src/js/lib/*.js')
  .pipe(webpackStream({
    output: {
      filename: '[name].js',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    },
  }))
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('./build/js'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('build/js')));

gulp.task('js:build:custom', () => gulp.src(['src/js/*.js', '!src/js/service-worker-register.js'])
  .pipe(webpackStream({
    output: {
      filename: '[name].js',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    },
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./build/js'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('build/js')));
