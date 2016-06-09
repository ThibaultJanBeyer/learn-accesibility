(function () { if( R_WELCOME ){
  
  // stores the values of the elements we need
  var text = document.getElementsByClassName('welcome__text');
  var flyOut = document.getElementsByClassName('fly--out');
  var wText = [];
  
  for (var i = 0; i < text.length; i++) {
    wText[i] = getChar(document.getElementsByClassName('writer__text--' + (i + 1)));
  }

  // hide all texts except the first one
  [...text].forEach((el, i) => {
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
    myLoop({ cd: flyOut.length - 1, dur: 1500, cu: 0 }, (cd, dur, cu) => {
      flyOut[cu].classList.add('fly--in');
    });
  }, false);

  var next = (i) => {
    if (i === 0) {
      // same as above but with delete option on true to delete the text
      writeEach(wText[i], wText[i].length - 1, 0, () => {
        // when everything is deleted
        setTimeout(function () {
          // hide the image and the text
          myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, (cd, dur, cu) => {
            flyOut[cu].classList.remove('fly--in');
          });
          setTimeout(function () {
            // and remove that first contentblock after some time
            text[i].classList.add('sr-only');
            // go to next animation
            next(6 + 1);
          }, 1500);
        }, 500);
      }, true);
    }
    
    // for any animation up ultil the last
    else if (i < text.length - 1) {
      // unhide the content block
      text[i].classList.remove('sr-only');
      // fly in the icon element
      myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, (cd, dur, cu) => {
        flyOut[cu].classList.add('fly--in');
      });
      //  write the text
      writeEach(wText[i], 0, wText[i].length - 1, () => {
        // when the writing is over, timeout the animation for some seconds
        setTimeout(function () {
          // then delete the text (via the boolean set to "true") 
          writeEach(wText[i], wText[i].length - 1, 0, () => {
            // after everything is deleted wait for some seconds
            setTimeout(function () {
              // then flyout all flyout elements
              myLoop({ cd: flyOut.length - 1, dur: 150, cu: 0 }, (cd, dur, cu) => {
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
      myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, (cd, dur, cu) => {
        flyOut[cu].classList.add('fly--in');
      });
      // write the text
      writeEach(wText[i], 0, wText[i].length - 1, () => {
        // when the writing is over, timeout the animation for some seconds
        setTimeout(function () {
          finishing(i);
        }, 1000);
      }, false, true);
    }
  };

  var finishing = (i) => {
    /*
     * open the door 
     */
    myLoop({ cd: 3, dur: 1000, cu: 0 }, (cd, dur, cu) => {
      // get the current attribute src
      var source = flyOut[i].getAttribute('src');
      // substring = everything without the "0.gif" part
      var substring = source.substring(0, source.length - 5);
      // set the src respectively 1.gif, 2.gif, ...
      flyOut[i].setAttribute('src', substring + cu + '.gif');

      if (cd === 0) {
        // prepare all the chars
        // divided in two groupd to mimic the different styles
        setTimeout(function() {
          var wcc = document.querySelectorAll('.welcome__text--normal > .wcc');
          var wc = document.querySelectorAll('.welcome__text--normal > .wcc > .wc');
          var specialWcc = document.querySelectorAll('.welcome__text--special > .wcc');
          var specialWc = document.querySelectorAll('.welcome__text--special > .wcc > .wc');
          for(let j = 0; j < wcc.length; j++) {
            wcc[j].style.display = 'inline-block';
            wcc[j].style.width = wc[j].offsetWidth + 'px';
            wcc[j].style.height = (wc[j].offsetHeight - 30) + 'px';
            wc[j].style.position = 'absolute';
            wc[j].style.zIndex = '99';
            wc[j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
            wc[j].style.textShadow = 'none';
          }
          for(let j = 0; j < specialWcc.length; j++) {
            specialWcc[j].style.display = 'inline-block';
            specialWcc[j].style.width = specialWc[j].offsetWidth + 'px';
            specialWcc[j].style.height = (specialWc[j].offsetHeight - 70) + 'px';
            specialWc[j].style.position = 'absolute';
            specialWc[j].style.zIndex = '99';
            specialWc[j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
            specialWc[j].style.textShadow = 'none';
          }
          /*
          * fly elements into the door
          */
          var target = document.getElementsByClassName('welcome__target')[0];

          // this is what should happen with each letter
          var specialMove = (el, xT, yT, xE, yE, i) => {
            setTimeout(() => {
              // scramble the elements
              if(i % 2 === 0) {
                el.style.left = (xE - Math.floor(Math.random() * 101)) + 'px';
                el.style.top = (yE + Math.floor(Math.random() * 101)) + 'px';
              } else {
                el.style.left = (xE + Math.floor(Math.random() * 101)) + 'px';
                el.style.top = (yE - Math.floor(Math.random() * 101)) + 'px';
              }
              setTimeout(() => {
                // then move one after another towards the door
                el.style.left = xT + 'px';
                el.style.top = yT + 'px';
                el.style.fontSize = '1px';
              }, 500);
            }, 5);
          };
          // move large text
          mover(specialWc, target, specialMove);
          // move normal text
          mover(wc, target, specialMove, () => {

            /*
            * fly through door
            */
            setTimeout(function() {
              // lock the screen by hiding overflow
              WELCOME.classList.add('lock');
              BODY.classList.add('lock');
              // get the fly img container and let it overflow 
              let container = document.getElementsByClassName('fly__container')[i];
              container.style.overflow = 'visible';
              // change the flyout to grow super big
              flyOut[i].style.position = 'relative';
              flyOut[i].style.transform = 'translateY(0) scale(20,20)';
              // add a locked class to the lock element
              // css to fade it in with full white
              let lock = document.getElementsByClassName('lock--locker')[0];
              lock.classList.add('lock--locked');
              
              setTimeout(function() {
                //document.getElementsByClassName('welcome__button--skip')[0].click();
              }, 400);
            }, 3000);
          });
        }, 2000);
      }
    });
  };

  var buttonNext = document.getElementsByClassName('button--next');
  // bind actions to each button
  [...buttonNext].forEach((el, i) => {
    // first remove the disabled attrubute
    el.removeAttribute('disabled');
    // then add an onclick listener
    el.addEventListener('click', () => {
      el.setAttribute('disabled', 'true');
      // run the next function with the appropriate button number
      next(i);
    });
  });

}})();
