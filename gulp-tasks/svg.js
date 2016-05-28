var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var svgSprite = require('gulp-svg-sprite');
var size = require('gulp-size');

var svgSrc = './src/assets/svg/*.svg',
    svgDst = './dist/assets/svg/';

var svgOptions = {
    progressive: true,
    svgoPlugins: [
        {cleanupIDs: false}
    ]
  };

var options = {
  svg: {
    doctypeDeclaration: false,
    xmlDeclaration: false
  },
  mode: {
    symbol: {
      dest: '',
      sprite: 'sprite.svg'
    }
  }
};

module.exports = function () {
  return gulp.src(svgSrc)
    .pipe(svgSprite(options))
    .pipe(imagemin(svgOptions))
    .pipe(size({title: 'SVG'}))
    .pipe(gulp.dest(svgDst));
};
