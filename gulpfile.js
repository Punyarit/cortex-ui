const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('cx/**/*.js').pipe(uglify()).pipe(gulp.dest('cx'));
});
