var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var size = require('gulp-size');
var fs = require('fs');

var htmlSrc = './src/pages/**/*.+(html|nunjucks)',
    htmlDst = './dist';
    
var getJsonData = function() {
  //return require('./src/data.json');
  return JSON.parse(fs.readFileSync('./src/data.json'));
};

var htmlminOptions = {
  collapseWhitespace: true,
  removeComments: true
};

module.exports = function () {
  console.log('~~~~~~~~~~~ Flawless :-) ~~~~~~~~~');
  return gulp.src(htmlSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(data(getJsonData))
    .pipe(nunjucksRender({ path: ['./src/templates'] }))
    .pipe(htmlhint())
    .pipe(htmlmin(htmlminOptions))
    .pipe(size({title: 'HTML'}))
    .pipe(gulp.dest(htmlDst));
};
