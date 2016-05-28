var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var size = require('gulp-size');

var jsSrc = './src/assets/javascript/**/*.js',
    jsDst = './dist/assets/javascript/';

module.exports = function () {
  return gulp.src(jsSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(size({title: 'JS'}))
    .pipe(gulp.dest(jsDst));
};
