(function () { if( R_SITE ){

  /*
   * Navigation
   */
  // main
  var siteContent = document.getElementsByClassName('site__content')[0];
  var siteToggler = document.getElementsByClassName('site__toggler')[0];

  siteToggler.addEventListener('click', () => {
    siteContent.classList.toggle('site__content--open');
    siteToggler.classList.toggle('site__toggler--open');
  });


  var navLink = document.getElementsByClassName('nav__link');

  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener('click', () => {
      let clicked = this;
      for (let i = 0; i < navLink.length; i++) {
        navLink[i].classList.remove('nav__link--selected');
      }
      clicked.classList.add('nav__link--selected');
    });
  }

  // toc
  var tocTogger = document.getElementsByClassName('toc__toggler')[0];
  var tocContainer = document.getElementsByClassName('toc__container')[0];

  tocTogger.addEventListener('click', () => {
    tocTogger.classList.toggle('toc__toggler--open');
    tocContainer.classList.toggle('toc__container--open');
  });

  /*
   * Objects
   */
  var navObjects = document.getElementsByClassName('nav__objects')[0];
  navObjects.style.height = siteContent.offsetHeight + 'px';

  /*
   * Read examples
   */
  var audioExamples = document.getElementsByClassName('play');
  for (let i = 0; i < audioExamples.length; i++) {
    audioExamples[i].addEventListener('click', function(){
      responsiveVoice.speak(this.getAttribute('data-audio'));
    });
  }

  /*
   * Unhide Skiplinks on focus
   */
  var skiplinks = document.querySelectorAll('a.visuallyhidden');
  for (let i = 0; i < skiplinks.length; i++) {
    let e = skiplinks[i];
    e.addEventListener('focus', () => {
      e.classList.remove('visuallyhidden');
    });
    e.addEventListener('blur', () => {
      e.classList.add('visuallyhidden');
    });
  }

  /*
   * Check which sections the user is on to update the TOC accordingly
   */
  setTimeout(function() { // a small delay so that everything else is successfully rendered
    // store the position of each section - 1/4 of the window height in an array
    let sectionsPos = [];
    [...document.getElementsByClassName('section__title')].forEach((e, i) => {
      sectionsPos.push(e.offsetTop - window.innerHeight / 4);
    });
    
    // store all Links in a variable.
    let tocLinks = document.getElementsByClassName('toc__link');
    // set a boolean that will see if we are scrolling
    let scrolling = false;
    // set that bool = true if we do
    window.onscroll = () => { scrolling = true; };

    // every x seconds check if a scroll has happened
    setInterval(function() {
      if (scrolling) {
        // is so, then store the scroll position
        let scroll = document.documentElement.scrollTop || document.body.scrollTop;
        // and compare it to each sections position
        for (let i = 0; i < sectionsPos.length; i++) {
          // store the corresponding link. How convenient, that we always have the same amout of links as sections
          let tocLink = tocLinks[i];
          // if it is within the range from the current one to the next one
          if (scroll > sectionsPos[i] && scroll < sectionsPos[i + 1]) {
            // give the link the current class 
            tocLink.classList.add('toc__link--current');
            tocLink.setAttribute('aria-label', 'current');
            window.hash = tocLink.href;
          } else {
            // if it is not in gange, then remove the class
            tocLink.classList.remove('toc__link--current');
            tocLink.removeAttribute('aria-label');
          }
        }
      }
      // and set the scrolling to false again until next scroll
      scrolling = false;
    }, 1500);
  }, 1000);

}})();
