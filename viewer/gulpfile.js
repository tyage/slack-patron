const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber')
const less = require('gulp-less');
const gutil = require('gulp-util');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('js', () => (
  gulp.src('')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .on('error', (e) => console.error(e))
    .pipe(gulp.dest(''))
));

gulp.task('css', () => {
  const normalizeCSS = './node_modules/normalize.css/normalize.css';

  return gulp.src(['./public/css/app.less', normalizeCSS])
    .pipe(plumber())
    .pipe(concat('app.css'))
    .pipe(less())
    .on('error', (e) => console.error(e))
    .pipe(gulp.dest('public/build'));
});

gulp.task('watch', () => {
  gulp.watch('/public/js/**', ['js']);
  gulp.watch('/public/css/**', ['css']);
});

gulp.task('default', ['js', 'css'], () => {
});
