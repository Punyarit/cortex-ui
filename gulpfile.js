const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('build/**/*.js').pipe(uglify()).pipe(gulp.dest('cx'));
});
