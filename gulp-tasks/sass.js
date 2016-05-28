var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var size = require('gulp-size');

var scssSrc = './src/assets/stylesheet/bundle.scss',
    scssDst = './dist/assets/stylesheet/';

var sassOptions = {
  errLogToConsole: true
};

module.exports = function () {
  console.log('~~~~~~~~~~~ I luv your sass, Master :-) ~~~~~~~~~');
  return gulp.src(scssSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(scsslint())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('bundle.css'))
    .pipe(csso())
    .pipe(size({title: 'SASS'}))
    .pipe(gulp.dest(scssDst));
};
