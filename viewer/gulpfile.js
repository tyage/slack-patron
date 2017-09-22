var gulp = require('gulp');
var concat = require('gulp-concat');
const plumber = require('gulp-plumber')
var less = require('gulp-less');
var gutil = require('gulp-util');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var config = {
  src: 'public/src',
  dist: 'public/dist'
};

gulp.task('js', function() {
  return gulp.src('')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .on('error', (e) => console.error(e))
    .pipe(gulp.dest(''));
});

gulp.task('css', function() {
  var normalizeCSS = './node_modules/normalize.css/normalize.css';

  return gulp.src([config.src + '/css/app.less', normalizeCSS])
    .pipe(plumber())
    .pipe(concat('app.css'))
    .pipe(less())
    .on('error', (e) => console.error(e))
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('watch', function() {
  gulp.watch(config.src + '/js/**', ['js']);
  gulp.watch(config.src + '/css/**', ['css']);
});

gulp.task('default', ['js', 'css'], function() {
});
