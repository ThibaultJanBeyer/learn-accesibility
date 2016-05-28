var gulp = require('gulp');


var mSrc = './src/assets/pdf/*',
    mDst = './dist/assets/pdf/';

module.exports = function () {
   return gulp.src(mSrc)
   .pipe(gulp.dest(mDst));
};
