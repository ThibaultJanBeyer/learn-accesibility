(function () { if( R_SITE ){

  /*
   * Navigation
   */
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

  /*
   * Objects
   */
  var navObjects = document.getElementsByClassName('nav__objects')[0];
  navObjects.style.height = siteContent.offsetHeight + 'px';
  console.log(siteContent.offsetHeight);
  console.log(navObjects.style.height);
  

}})();
