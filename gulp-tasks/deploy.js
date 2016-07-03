var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

module.exports = function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
};
