var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('babel', function() {
  return gulp.src('public/src/js/*.js')
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/js/'));
});

gulp.task('less', function() {
  return gulp.src('public/src/css/*.less')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('default', ['babel', 'less'], function() {
});
