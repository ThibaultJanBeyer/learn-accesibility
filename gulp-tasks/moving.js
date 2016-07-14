var gulp = require('gulp');


var mSrc = './src/assets/misc/*',
    mDst = './dist/';

module.exports = function () {
   return gulp.src(mSrc)
   .pipe(gulp.dest(mDst));
};
