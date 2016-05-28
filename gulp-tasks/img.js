var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');

var imgSrc = './src/assets/img/**/*',
    imgDst = './dist/assets/img';

module.exports = function () {
    return gulp.src(imgSrc)
      .pipe(imagemin())
      .pipe(size({title: 'IMG'}))
      .pipe(gulp.dest(imgDst));
};
