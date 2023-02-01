const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('compress', function () {
  return gulp
    .src('build/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('cx'));
});
