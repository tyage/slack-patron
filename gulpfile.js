var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babel', function() {
  return gulp.src('public/js/es6/*.js')
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('default', ['babel'], function() {
});
