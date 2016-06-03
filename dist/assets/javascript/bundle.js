'use strict';

//.
var BODY = document.getElementsByTagName('body')[0];
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  // stores the values of the elements we need
  var text = document.getElementsByClassName('welcome__text');
  var flyOut = document.getElementsByClassName('fly--out');
  var wText = [];

  for (var i = 0; i < text.length; i++) {
    wText[i] = getChar(document.getElementsByClassName('writer__text--' + (i + 1)));
  }

  [].concat(_toConsumableArray(text)).forEach(function (el, i) {
    if (i !== 0) {
      el.classList.add('sr-only');
    }
  });
  /* we pass:
   * – the array to loop
   * – integer where to start
   * – integer when to end
   * – what happens when ended
   * – a boolean if the writer should delete the text 
   * to the writer
   */
  writeEach(wText[0], 0, wText[0].length - 1, function () {
    myLoop({ cd: flyOut.length - 1, dur: 1500, cu: 0 }, function (cd, dur, cu) {
      flyOut[cu].classList.add('fly--in');
    });
  }, false);

  var buttonNext = document.getElementsByClassName('button--next');
  //when the nex button is clicked
  [].concat(_toConsumableArray(buttonNext)).forEach(function (el, i) {
    el.removeAttribute('disabled');
    el.addEventListener('click', function () {
      el.setAttribute('disabled', 'true');
      //run the next function with the appropriate button number
      next(i);
    });
  });

  function next(i) {

    if (i === 0) {
      //same as above but with delete option on true to delete the text
      writeEach(wText[i], wText[i].length - 1, 0, function () {
        //when everything is deleted
        setTimeout(function () {
          //hide the image and the text
          myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
            flyOut[cu].classList.remove('fly--in');
          });
          setTimeout(function () {
            //and remove that first contentblock after some time
            text[i].classList.add('sr-only');
            //go to next animation
            next(i + 1);
          }, 1500);
        }, 500);
      }, true);
    } else if (i >= 1 && i <= 8) {
      //add the next content block
      text[i].classList.remove('sr-only');
      //show the icon
      myLoop({ cd: flyOut.length - 1, dur: 100, cu: 0 }, function (cd, dur, cu) {
        flyOut[cu].classList.add('fly--in');
      });

      // writing text
      writeEach(wText[i], 0, wText[i].length - 1, function () {
        setTimeout(function () {

          // deleting text
          writeEach(wText[i], wText[i].length - 1, 0, function () {
            //when everything is deleted
            setTimeout(function () {
              //hide the image and the text
              myLoop({ cd: flyOut.length - 1, dur: 150, cu: 0 }, function (cd, dur, cu) {
                flyOut[cu].classList.remove('fly--in');
              });
              setTimeout(function () {
                //and remove that first contentblock after some time
                text[i].classList.add('sr-only');
                //go to next animation
                next(i + 1);
              }, 1500);
            }, 500);
          }, true);
        }, 5000);
      }, false);
    }
  }
})();
"use strict";

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
function myLoop(options, callback, scope) {
  // pass number of iterations and dur in ms and counter
  callback.call(scope, options.cd, options.dur, options.cu); // passes back stuff we need to callback into
  options.cu++;
  if (--options.cd >= 0) {
    setTimeout(function () {
      myLoop(options, callback, scope); // decrement cd and call myLoop again if cd >= 0
    }, options.dur);
  }
}
'use strict';

/**
 *
 * The writer will take text, hide it and then create a fake text-writing animation
 * (via Thibault Jan Beyer @ThibaultBeyer http://thibaultjanbeyer.com)
 *
 * @param  [array] to be looped
 * 
 * @param  pos: Integer,            the starting index position in the array (usually starts at 0)
 * 
 * @param  end: Integer,            how many times should it loop
 * 
 * @param  {Function} callback      This is what should happen when the run is over
 * 
 * @param  del: true/false          choose if it should write text or delete text
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
// write each function that writes each element in an array one by one
function writeEach(arr, pos, end, callback, del) {
  if (!del) {
    //it loops through each character of the current element position in array
    myLoop({ cd: arr[pos].char.length - 1, dur: 100, cu: 0 }, function (cd, dur, cu) {
      //writes each char
      arr[pos].el.innerHTML += arr[pos].char[cu];
      //run the loop again but with the next position in array
      if (cd === 0 && pos < end) {
        writeEach(arr, ++pos, end, callback);
      }
    });
  } else {
    myLoop({ cd: arr[pos].text.length - 1, dur: 50, cu: 0 }, function (cd, dur, cu) {
      //writes each char
      arr[pos].el.innerHTML = arr[pos].text.slice(0, cd);
      //run the loop again but with the next position in array
      if (cd === 0 && pos > end) {
        writeEach(arr, --pos, end, callback, del);
      }
    });
  }
  //is all elements have been written, unhide the image and the next button
  if (pos === end) {
    callback();
  }
}

// stores and returns an array with objects like so:
// [{el: singleElementObject, text: "Hello", char: ["H","e","l","l","o"]}, {el: singleElementObject, text: "Hello", char: ["H","e","l","l","o"]}]
// also deletes the original text
function getChar(nodes) {
  var array = [];
  for (var i = 0; i < nodes.length; i++) {
    var object = {};
    object.el = nodes[i];
    object.text = nodes[i].textContent;
    object.char = object.text.split('');
    array[i] = object;

    // delete original text
    nodes[i].textContent = '';
  }
  return array;
}