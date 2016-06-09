/**
 * A loop with timeouts.
 * (via Thibault Jan Beyer @ThibaultBeyer http://thibaultjanbeyer.com)
 *
 * @param  {object}   options
 *         cd: Integer,            The number of times it should run => ..3, ..2, ..1, ..0
 *         dur: Integer,             How long should it timeout? In ms
 *         cu: Integer               Every run this number is increased by 1 => 0, ..1, ..2 , ..3
 * 
 * @param  {Function} callback            This is what should happen each run
 *         cd, dur, cu   get’s the current state of options
 * 
 * @param  {//}       scope               can be blank
 *
 * 
 * example:
 * 
 * myLoop({
 *   cd: 9, // number of iterations
 *   dur: 150, // in ms
 *   cu: 0 // starts to count up at 0 
 * },
 *   (cd, dur, cu) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + cd + '.jpg');
 * });
 */
function myLoop(options, callback, scope) { // pass number of iterations and dur in ms and counter
    callback.call(scope, options.cd, options.dur, options.cu); // passes back stuff we need to callback into
    options.cu++;
    if (--options.cd >= 0) {
      setTimeout(function () {
        myLoop(options, callback, scope); // decrement cd and call myLoop again if cd >= 0
      }, options.dur);
    }
}
