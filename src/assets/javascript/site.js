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
  if (document.getElementsByClassName('toc__toggler')[0]) {
    // toggling
    let tocToggler = document.getElementsByClassName('toc__toggler')[0];
    let tocContainer = document.getElementsByClassName('toc__container')[0];

    tocToggler.addEventListener('click', () => {
      tocToggler.classList.toggle('toc__toggler--open');
      tocContainer.classList.toggle('toc__container--open');
    });

    /*
     * Check which sections the user is on to update the TOC flow accordingly
     */
    setTimeout(function() { // a small delay so that everything else is successfully rendered
      // store the position of each section - 1/4 of the window height in an array
      let sectionsPos = [];
      [...document.getElementsByClassName('section__title')].forEach((e, i) => {
        sectionsPos.push(e.offsetTop - window.innerHeight / 4);
      });
      sectionsPos.push(siteContent.offsetHeight);
      
      // store all Links in a variable.
      let tocLinks = document.getElementsByClassName('toc__link');
      // set a boolean that will see if we are scrolling
      let scrolling = true;
      // set that bool = true if we do
      window.onscroll = () => { scrolling = true; };

      // every x seconds check if a scroll has happened
      setInterval(function() {
        if (scrolling) {
          // is so, then store the scroll position
          let scroll = document.documentElement.scrollTop || document.body.scrollTop;
          
          // and compare it to each sections position
          for (let i = 0; i < tocLinks.length; i++) {
            // store the corresponding link. How convenient, that we always have the same amout of links as sections
            let tocLink = tocLinks[i];
            // if it is within the range from the current one to the next one
            if (scroll > sectionsPos[i] && scroll < sectionsPos[i + 1]) {
              // give the link the current class 
              tocLink.classList.add('toc__link--current');
              tocLink.setAttribute('aria-label', 'current');
              window.hash = tocLink.href;
            } else {
              // if it is not in range, then remove the class
              tocLink.classList.remove('toc__link--current');
              tocLink.removeAttribute('aria-label');
            }
          }
        }
        // and set the scrolling to false again until next scroll
        scrolling = false;
      }, 500);
    }, 1000);

  }

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
   * Add linkclass to all links within text and strongclass to all strong
   */
  [...document.querySelectorAll('.section a')].forEach((e) => {
    e.classList.add('section__link');
  });
  [...document.querySelectorAll('.section strong')].forEach((e) => {
    e.classList.add('section__strong');
  });

  /*
   * Examples
   */
  var menuItems = document.querySelectorAll('.exampleButton');
  for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click',  function(e){
      var button = this;
      var buttonText = button.querySelector('.visuallyhidden');
      var subMenu = button.parentNode.querySelector('.example-submenu');

      if (!button.classList.contains('open')) {
        button.classList.add('open');
        buttonText.innerText = 'hide submenu';
        subMenu.classList.remove('hidden');
        subMenu.removeAttribute('aria-hidden');
        // sadly we have to set the focus on the first link element,
        // otherwise screenreader do not notice the change
        subMenu.querySelector('a').focus();
      } else {
        button.classList.remove('open');
        buttonText.innerText = 'show submenu';
        subMenu.classList.add('hidden');
        subMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

}})();
