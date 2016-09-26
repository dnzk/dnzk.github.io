var exec = require('child_process').exec;
var gulp = require('gulp');
var serve = require('gulp-serve');
var sass = require('gulp-sass');

gulp.task('serve', serve('dist'));

gulp.task('dev', [
  'clean:dist',
  'copy:html',
  'compile:style',
  'watch:html',
  'watch:style',
  'serve'
]); 

gulp.task('watch:html', function () {
  gulp.watch('src/*.html', ['copy:html']);
});

gulp.task('copy:html', function () {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:style', function () {
  gulp.watch('src/*.scss', ['compile:style']);
});

gulp.task('compile:style', function () {
  gulp.src('src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function () {
  exec('rm -rf dist/*');
});
