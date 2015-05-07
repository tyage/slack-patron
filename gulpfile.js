var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var config = {
  jsSrc: 'public/src/js/*.js',
  jsDist: 'public/dist/js',
  cssSrc: 'public/src/css/*.less',
  cssDist: 'public/dist/css'
};

gulp.task('js', function() {
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .on('error', function(e) {
      gutil.log(gutil.colors.red(e));
      this.emit('end');
    })
    .pipe(gulp.dest(''));
});

gulp.task('css', function() {
  return gulp.src(config.cssSrc)
    .pipe(concat('app.css'))
    .pipe(less())
    .on('error', function(e) {
      gutil.log(gutil.colors.red(e));
      this.emit('end');
    })
    .pipe(gulp.dest(config.cssDist));
});

gulp.task('watch', function() {
  gulp.watch(config.jsSrc, ['js']);
  gulp.watch(config.cssSrc, ['css']);
});

gulp.task('default', ['js', 'css'], function() {
});
