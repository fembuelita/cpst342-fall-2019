const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
  return gulp.src('assets/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('clean', () => {
  return del([
    'build'
  ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));