/*
 * Flyes in the title at start
 */
(function(){
//start

  // get all title elements
  var welcomeTitle = document.getElementsByClassName('welcome__title')[0];
  var welcomeTitleEls = welcomeTitle.getElementsByClassName('fly--out');
  
  myLoop({
    countdown: welcomeTitleEls.length - 1,
    duration: 150,
    countup: 0
  }, (countdown, duration, countup) => {
    welcomeTitleEls[countup].classList.add('fly--in');
  });

//end
})();
