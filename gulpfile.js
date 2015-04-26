var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babel', function() {
  return gulp.src('public/src/js/*.js')
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/js/'));
});

gulp.task('default', ['babel'], function() {
});
