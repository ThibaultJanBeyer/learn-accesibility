(function () { if( R_SITE ){

  /*
   * Navigation
   */
  var site = document.getElementsByClassName('site')[0];
  var siteToggler = document.getElementsByClassName('site__toggler')[0];

  siteToggler.addEventListener('click', () => {
    site.classList.toggle('site--open');
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

}})();
