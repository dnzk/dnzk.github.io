var exec = require('child_process').exec;
var gulp = require('gulp');
var serve = require('gulp-serve');
var sass = require('gulp-sass');

gulp.task('serve', serve('dist'));

gulp.task('dev', [
  'clean:dist',
  'build:template',
  'watch:all',
  'serve'
]); 

gulp.task('build:template', ['copy:html', 'compile:style']);

gulp.task('watch:all', ['watch:html', 'watch:style']);

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
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function () {
  exec('rm -rf dist/*');
});
