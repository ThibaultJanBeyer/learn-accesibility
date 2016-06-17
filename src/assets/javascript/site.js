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

}})();
