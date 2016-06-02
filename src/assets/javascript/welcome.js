(function () {
  // stores the values of the elements we need
  var text = document.getElementsByClassName('welcome__text');
  var flyOut = document.getElementsByClassName('fly--out');
  var wText = [];
      wText[0] = getChar(document.getElementsByClassName('writer__text--1'));
      wText[1] = getChar(document.getElementsByClassName('writer__text--2'));
      wText[2] = getChar(document.getElementsByClassName('writer__text--3'));
  
  [...text].forEach((el, i) => {
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
  writeEach(wText[0], 0, wText[0].length -1, function(){
    myLoop({ cd: flyOut.length -1, dur: 1500, cu: 0 }, (cd, dur, cu) => {
      flyOut[cu].classList.add('fly--in');
    });
  }, false);
  
  var buttonNext = document.getElementsByClassName('button--next');
  //when the nex button is clicked
  [...buttonNext].forEach((el, i) => {
    el.removeAttribute('disabled');
    el.addEventListener('click', () => {
      el.setAttribute('disabled', 'true');
      //run the next function with the appropriate button number
      next(i);
    });
  });
  
  function next(i) {

    if(i === 0) {
      //same as above but with delete option on true to delete the text
      writeEach(wText[i], wText[i].length -1, 0, () => {
        //when everything is deleted
        setTimeout(function() {
          //hide the image and the text
          myLoop({ cd: flyOut.length -1, dur: 10, cu: 0 }, (cd, dur, cu) => {
            flyOut[cu].classList.remove('fly--in');
          });
          setTimeout(function() {
            //and remove that first contentblock after some time
            text[i].classList.add('sr-only');
            //go to next animation
             next(i+1);
          }, 1500);
        }, 500);
      }, true);
    } 

    else if(i >= 1) {
      //add the next content block
      text[i].classList.remove('sr-only');
      //show the icon
      myLoop({ cd: flyOut.length -1, dur: 100, cu: 0 }, (cd, dur, cu) => {
        flyOut[cu].classList.add('fly--in');
      });

       // writing second text
      writeEach(wText[i], 0, wText[i].length -1, () => {
        setTimeout(function() {

           // deleting second text 
          writeEach(wText[i], wText[i].length -1, 0, () => {
            //when everything is deleted
            setTimeout(function() {
              //hide the image and the text
              myLoop({ cd: flyOut.length -1, dur: 150, cu: 0 }, (cd, dur, cu) => {
                flyOut[cu].classList.remove('fly--in');
              });
              setTimeout(function() {
                //and remove that first contentblock after some time
                text[i].classList.add('sr-only');
                //go to next animation
                next(i+1);
              }, 1500);
            }, 500);
          }, true);

        }, 5000);
      }, false);
    }

  }

})();
