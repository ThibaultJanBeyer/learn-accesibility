var gulp = require('gulp');

function log (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); // eslint-disable-line
}

module.exports = function () {
  const watchers = [
    gulp.watch('./src/**/*.html', ['html']).on('change', log),
    gulp.watch('./src/data.json', ['html']).on('change', log),
    gulp.watch('./src/assets/svg/**/*.svg', ['svg']).on('change', log),
    gulp.watch('./src/assets/img/**/*.+(jpg|jpeg|gif|png)', ['img']).on('change', log),
    gulp.watch('./src/assets/stylesheet/**/*.scss', ['sass']).on('change', log),
    gulp.watch('./src/assets/javascript/**/*.js', ['javascript']).on('change', log)
  ];
  // When running this task via an npm script (i.e. `watch:sass` in package.json),
  // Ctrl+C no longer properly kills the watcher. This is a workaround to pass
  // through the interrupt signal (SIGINT) manually.
  //
  // Ultimately, watcher.end() calls the end method in glob-watcher:
  // https://github.com/gulpjs/glob-watcher/blob/v0.0.7/index.js#L27-L29
  process.once('SIGINT', function () {
    watchers.map(function (watcher) {
      watcher.end();
    });
  });
};
