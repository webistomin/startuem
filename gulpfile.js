"use strict";

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const del = require('del');
const runSequence = require('run-sequence');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const chalk = require('chalk');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const merge = require('gulp-merge');
const zip = require('gulp-zip');
const mod = (__dirname.includes(process.cwd()) ? process.cwd() : __dirname) + '/node_modules/';
const BABEL_POLYFILL = './node_modules/babel-polyfill/browser.js';
const concat = require('gulp-concat');
const psi = require('psi');
const ghPages = require('gulp-gh-pages-will');


gulp.task('clean:build', function() {
  return del('./build');
});

gulp.task('server',  function() {
  browserSync.init({
    server: {baseDir: './build/'}
  });

  gulp.watch('src/views/**/*.*', ['pug']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['copy:js']);
  gulp.watch('src/img/**/*.*', ['copy:img']);
});

gulp.task('copy:js', function() {
  return merge(
    gulp.src(BABEL_POLYFILL),
    gulp.src('src/js/lib/*.js'),
    gulp.src('src/js/*.js')
      .pipe(babel({
          presets: [[mod + 'babel-preset-env']],
        }
      ))
    )
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream())
});

gulp.task('copy:img', function() {
  return gulp.src('src/img/**/*.{jpg, jpeg, png, webp, gif}')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Images',
          message: err.message
        }
      })
    }))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})]))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/main.sass')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 11'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(sourcemaps.write())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cleanCSS({level: 2}))
    .pipe(rename({
      basename: 'style',
      suffix: ".min",
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('./src/views/pages/**/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Pug',
          message: err.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('default', function(){
  runSequence(
    'clean:build',
    ['sass', 'pug', 'copy:js', 'copy:img'],
    'server',
  );
});

gulp.task('zip', () =>
  gulp.src('build/**/*.*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./'))
);

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
