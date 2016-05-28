// include gulp
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Individual tasks
gulp.task('clean', require('./gulp-tasks/clean'));
gulp.task('img', require('./gulp-tasks/img'));
gulp.task('html', require('./gulp-tasks/html'));
gulp.task('javascript', require('./gulp-tasks/javascript'));
gulp.task('moving', require('./gulp-tasks/moving'));
gulp.task('sass', require('./gulp-tasks/sass'));
gulp.task('svg', require('./gulp-tasks/svg'));
gulp.task('watch', require('./gulp-tasks/watch'));

// Globs
gulp.task('build', ['html', 'sass', 'javascript', 'moving', 'svg', 'img']);
gulp.task('cln', ['clean']);
gulp.task('devl', ['html', 'sass', 'javascript', 'moving', 'svg', 'watch', 'img']);

// Default task
gulp.task('default', ['devl']);