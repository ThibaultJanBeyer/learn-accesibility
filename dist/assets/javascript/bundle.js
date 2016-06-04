'use strict';

//.
var BODY = document.getElementsByTagName('body')[0];
var WELCOME = document.getElementById('welcome');
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

  // hide all texts except the first one
  [].concat(_toConsumableArray(text)).forEach(function (el, i) {
    if (i !== 0) {
      el.classList.add('sr-only');
    }
  });

  /* we pass:
   * – the array to loop
   * – integer where to start
   * – integer when to end
   * – what happens when ended (here flying in the flyout element)
   * – a boolean if the writer should delete the text 
   * to the writer
   */
  writeEach(wText[0], 0, wText[0].length - 1, function () {
    myLoop({ cd: flyOut.length - 1, dur: 1500, cu: 0 }, function (cd, dur, cu) {
      flyOut[cu].classList.add('fly--in');
    });
  }, false);

  var buttonNext = document.getElementsByClassName('button--next');
  // bind actions to each button
  [].concat(_toConsumableArray(buttonNext)).forEach(function (el, i) {
    // first remove the disabled attrubute
    el.removeAttribute('disabled');
    // then add an onclick listener
    el.addEventListener('click', function () {
      el.setAttribute('disabled', 'true');
      // run the next function with the appropriate button number
      next(i);
    });
  });

  function next(i) {

    if (i === 0) {
      // same as above but with delete option on true to delete the text
      writeEach(wText[i], wText[i].length - 1, 0, function () {
        // when everything is deleted
        setTimeout(function () {
          // hide the image and the text
          myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
            flyOut[cu].classList.remove('fly--in');
          });
          setTimeout(function () {
            // and remove that first contentblock after some time
            text[i].classList.add('sr-only');
            // go to next animation
            next(i + 1);
          }, 1500);
        }, 500);
      }, true);
    }

    // for any animation up ultil the last
    else if (i < text.length - 1) {
        // unhide the content block
        text[i].classList.remove('sr-only');
        // fly in the icon element
        myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
          flyOut[cu].classList.add('fly--in');
        });
        //  write the text
        writeEach(wText[i], 0, wText[i].length - 1, function () {
          // when the writing is over, timeout the animation for some seconds
          setTimeout(function () {
            // then delete the text (via the boolean set to "true")
            writeEach(wText[i], wText[i].length - 1, 0, function () {
              // after everything is deleted wait for some seconds
              setTimeout(function () {
                // then flyout all flyout elements
                myLoop({ cd: flyOut.length - 1, dur: 150, cu: 0 }, function (cd, dur, cu) {
                  flyOut[cu].classList.remove('fly--in');
                });
                // wait again some seconds
                setTimeout(function () {
                  // and remove that first contentblock
                  text[i].classList.add('sr-only');
                  // then go to the next animation
                  next(i + 1);
                }, 1500);
              }, 500);
            }, true);
          }, 4000);
        }, false);
      }

      // for the last animation
      else if (i >= text.length - 1) {
          // unhide the content block
          text[i].classList.remove('sr-only');
          // fly in the icon element
          myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
            flyOut[cu].classList.add('fly--in');
          });
          // write the text
          writeEach(wText[i], 0, wText[i].length - 1, function () {
            // when the writing is over, timeout the animation for some seconds
            setTimeout(function () {
              finishing(i);
            }, 1000);
          }, false, true);
        }
  }

  function finishing(i) {
    /*
     * open the door 
     */
    myLoop({ cd: 3, dur: 1000, cu: 0 }, function (cd, dur, cu) {
      // get the current attribute src
      var source = flyOut[i].getAttribute('src');
      // substring = everything without the "0.gif" part
      var substring = source.substring(0, source.length - 5);
      // set the src respectively 1.gif, 2.gif, ...
      flyOut[i].setAttribute('src', substring + cu + '.gif');

      if (cd === 0) {
        // prepare all the chars
        // divided in two groupd to mimic the different styles
        setTimeout(function () {
          var wcc = document.querySelectorAll('.welcome__text--normal > .wcc');
          var wc = document.querySelectorAll('.welcome__text--normal > .wcc > .wc');
          var specialWcc = document.querySelectorAll('.welcome__text--special > .wcc');
          var specialWc = document.querySelectorAll('.welcome__text--special > .wcc > .wc');
          for (var j = 0; j < wcc.length; j++) {
            wcc[j].style.display = 'inline-block';
            wcc[j].style.width = wc[j].offsetWidth + 'px';
            wcc[j].style.height = wc[j].offsetHeight - 30 + 'px';
            wc[j].style.position = 'absolute';
            wc[j].style.zIndex = '99';
            wc[j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
            wc[j].style.textShadow = 'none';
          }
          for (var _j = 0; _j < specialWcc.length; _j++) {
            specialWcc[_j].style.display = 'inline-block';
            specialWcc[_j].style.width = specialWc[_j].offsetWidth + 'px';
            specialWcc[_j].style.height = specialWc[_j].offsetHeight - 70 + 'px';
            specialWc[_j].style.position = 'absolute';
            specialWc[_j].style.zIndex = '99';
            specialWc[_j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
            specialWc[_j].style.textShadow = 'none';
          }
          /*
          * fly elements into the door
          */
          var target = document.getElementsByClassName('welcome__target')[0];
          mover(specialWc, target);
          mover(wc, target, function () {
            /*
            * fly through door
            */
            setTimeout(function () {
              // lock the screen by hiding overflow
              WELCOME.classList.add('lock');
              BODY.classList.add('lock');
              // get the fly img container and let it overflow
              var container = document.getElementsByClassName('fly__container')[i];
              container.style.overflow = 'visible';
              // change the flyout to grow super big
              flyOut[i].style.position = 'relative';
              flyOut[i].style.transform = 'translateY(0) scale(20,20)';
              // add a locked class to the lock element
              // css to fade it in with full white
              var lock = document.getElementsByClassName('lock--locker')[0];
              lock.classList.add('lock--locked');

              setTimeout(function () {
                document.getElementsByClassName('welcome__button--skip')[0].click();
              }, 400);
            }, 3000);
          });
        }, 2000);
      }
    });
  }
})();
'use strict';

/**
 *
 * The mover moves elements to a certain target element
 * (via Thibault Jan Beyer @ThibaultBeyer http://codepen.io/pen/RRPQEX http://thibaultjanbeyer.com)
 *
 * @param  {Nodes} elements             A list of elements that should move array
 * 
 * @param  {Node} target                The target element
 *
 * @param  {Function} callback          This is what should happen each run 
 * 
 * @param  {Function} endCallback       This is what should happen after the run
 * 
 * example:
 * 
 * mover({
 *   cd: 9, // number of iterations
 *   dur: 150, // in ms
 *   cu: 0 // starts to count up at 0 
 * },
 *   (cd, dur, cu) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + cd + '.jpg');
 * });
 */
function mover(elements, target, callback) {
  // store the x,y coordinates of the target
  var xT = target.offsetLeft;
  var yT = target.offsetTop;

  myLoop({ cd: elements.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
    // store the elements coordinate
    var xE = elements[cu].offsetLeft;
    var yE = elements[cu].offsetTop;
    // set the elements position to their position for a smooth animation
    elements[cu].style.left = xE + 'px';
    elements[cu].style.top = yE + 'px';
    // set their position to the target position
    // the animation is a simple css transition
    move(elements[cu], xT, yT, xE, yE, cu);

    if (cd === 0) {
      if (callback) {
        callback();
      }
    }
  });
}

function move(element, xT, yT, xE, yE, i) {
  setTimeout(function () {
    // scramble the elements
    if (i % 2 === 0) {
      element.style.left = xE - Math.floor(Math.random() * 101) + 'px';
      element.style.top = yE + Math.floor(Math.random() * 101) + 'px';
    } else {
      element.style.left = xE + Math.floor(Math.random() * 101) + 'px';
      element.style.top = yE - Math.floor(Math.random() * 101) + 'px';
    }
    setTimeout(function () {
      // then move one after another towards the door
      element.style.left = xT + 'px';
      element.style.top = yT + 'px';
      element.style.fontSize = '1px';
    }, 500);
  }, 5);
}
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
 * @param  {integer} pos            the starting index position in the array (usually starts at 0)
 * 
 * @param  {integer} end            how many times should it loop
 * 
 * @param  {Function} callback      This is what should happen when the run is over
 * 
 * @param  {boolean} del            choose if it should write text or delete text
 * 
 * @param  {boolean} splitter        do you want to split each character?
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
function writeEach(arr, pos, end, callback, del, splitter) {
  if (!del) {
    //it loops through each character of the current element position in array
    myLoop({ cd: arr[pos].char.length - 1, dur: 100, cu: 0 }, function (cd, dur, cu) {
      //writes each char
      if (!splitter) {
        arr[pos].el.innerHTML += arr[pos].char[cu];
      } else {
        //handle spaces
        if (arr[pos].char[cu] === ' ') {
          arr[pos].char[cu] = '&nbsp';
        }
        //write with splitter spanners
        arr[pos].el.innerHTML += '<span class="wcc"><span class="wc">' + arr[pos].char[cu] + '</span></span>';
      }
      //run the loop again but with the next position in array
      if (cd === 0 && pos < end) {
        writeEach(arr, ++pos, end, callback, del, splitter);
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