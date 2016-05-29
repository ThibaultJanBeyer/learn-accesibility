/**
 * A loop with timeouts. (via Thibault Jan Beyer @ThibaultBeyer)
 *
 * @param  {object}   options
 *         countdown: Integer,            The number of times it should run => ..3, ..2, ..1, ..0
 *         duration: Integer,             How long should it timeout? In ms
 *         countup: Integer               Every run this number is increased by 1 => 0, ..1, ..2 , ..3
 * 
 * @param  {Function} callback            This is what should happen each run
 *         countdown, duration, countup   get’s the current state of options
 * 
 * @param  {//}       scope               can be blank
 *
 * 
 * example:
 * 
 * myLoop({
 *   countdown: 9, // number of iterations
 *   duration: 150, // in ms
 *   countup: 0 // starts to count up at 0 
 * },
 *   (countdown, duration, countup) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + countdown + '.jpg');
 * });
 */
function myLoop(options, callback, scope) { // pass number of iterations and duration in ms and counter
  setTimeout(function () {
    callback.call(scope, options.countdown, options.duration, options.countup); // passes back stuff we need to callback into
    options.countup++;
    if (--options.countdown >= 0) myLoop(options, callback, scope); // decrement countdown and call myLoop again if countdown >= 0
  }, options.duration);
}
