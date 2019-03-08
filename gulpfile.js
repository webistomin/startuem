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
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const merge = require('gulp-merge');
const mod = (__dirname.includes(process.cwd()) ? process.cwd() : __dirname) + '/node_modules/';
const BABEL_POLYFILL = './node_modules/babel-polyfill/browser.js';
const concat = require('gulp-concat');



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
    .pipe(rename({
      prefix: "bonjour-",
      suffix: "-hola",
    }))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('copy:img', function() {
  return gulp.src('src/img/**/*.{jpg, jpeg, png, webp, gif}')
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
      browsers: ['last 6 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gcmq())
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(chalk.blue(`${details.stats.originalSize}KB – original CSS`));
      console.log(chalk.blue(`${details.stats.minifiedSize}KB – minified CSS`));
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
    ['sass', 'pug', 'copy:js', 'copy:img',],
    'server',
  )
});

