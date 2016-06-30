(function () {
  if (R_HOME) {

    BODY.classList.add('lock');
    BODYCONTAINER.classList.add('lock');

    /*
     * if a users has not been here,
     *  > add a yummy coockie and redirect to welcome.html
     * if he has, check if he entered through the door
     *  > play the animation
     * if not then skip the animation
     */
    if(LOCATION.indexOf('door') >= 0) {
      // second time visit (through door)
      let preloader = document.querySelector('.home__preloader');
      preloader.classList.add('home__preloader--loaded');
      setTimeout(function() {
        animationEnd();
      }, 9500);
    } else if (document.cookie.replace(/(?:(?:^|.*;\s*)doSomethingOnlyOnce\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {
      // first time visit
      window.location.href = 'welcome.html';
      document.cookie = 'doSomethingOnlyOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    } else {
      // >= third time visit
      BODY.classList.add('skip');
      animationEnd();
      let preloader = document.querySelector('.home__preloader');
      preloader.classList.add('home__preloader--loaded');
    }

    /* just for testing @TODO: remove */
    var reset = document.createElement('button');
    reset.style.position = 'fixed';
    reset.style.top = '0';
    reset.style.width = '10px';
    reset.style.height = '10px';
    reset.style.background = 'red';
    BODY.appendChild(reset);
    reset.addEventListener('click', () => {
      document.cookie = 'doSomethingOnlyOnce=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    /* just for testing */

  }
})();

// after the animation
function animationEnd() {
  var start = document.getElementsByClassName('start')[0];
  var end = document.getElementsByClassName('end')[0];

  start.classList.add('visuallyhidden');
  end.classList.remove('visuallyhidden');

  // reset window position to top
  window.location.hash = '#';

  /*
  * move Objects
  */
  // get objects
  let objects = document.getElementsByClassName('home-objects__object');

  // detect mouse pos
  BODY.addEventListener('mousemove', (event) => {
    mouseMove(event.pageX, event.pageY, objects);
  });
  BODY.addEventListener('touchmove', (event) => {
    mouseMove(event.touches[0].pageX, event.touches[0].pageY, objects);
  });

  /*
   * Leaving animation
   */
  let links = document.getElementsByClassName('leaving-animation');
  let linkContainers = document.getElementsByClassName('leaving-animation__container');
  let linkHolders = document.getElementsByClassName('leaving-animation__holder');
  let homeLeaveringTargets = document.getElementsByClassName('home-leaving__target');
  let homeContent = document.getElementsByClassName('home__content')[0];

  /*
   * Normal Leaving
   */
  for (let i = 0; i < links.length; i++) {
    // set the holder size = the container size
    // we will use it later to position elements before moving them
    // to prevent weirt jumping
    linkHolders[i].style.width = linkContainers[i].offsetWidth + 'px';
    linkHolders[i].style.height = linkContainers[i].offsetHeight + 'px';

    // add the click listener to the links
    links[i].addEventListener('click', function(e) {
      let aLink = this;
      leavingAnimation({linkContainers, aLink, linkHolders, homeContent, homeLeaveringTargets});
      e.preventDefault(); // prevent default pageleaving
    });
  }
}

function mouseMove(hoverX, hoverY, objects) {
  let halfWidth = window.innerWidth / 2;
  let halfHeight = window.innerHeight / 2;

  let xDeg = -(halfWidth - hoverX) / 8;
  let yDeg = (halfHeight - hoverY) / 8;

  for (let i = 0; i < objects.length; i++) {
    let e = objects[i];

    if (i < 15) {

      if (e.classList.contains('diamond')) {
        e.style.transform = 'rotate(45deg) translate3D(' + xDeg + '%, ' + yDeg + '%, 0)';
      } else if (e.classList.contains('circle')) {
        e.style.transform = 'rotate(20deg) translate3D(' + xDeg + '%, ' + yDeg + '%, 0)';
      } else {
        e.style.transform = 'translate3D(' + xDeg + '%, ' + yDeg + '%, 0)';
      }

    } else {

      if (e.classList.contains('diamond')) {
        e.style.transform = 'rotate(45deg) translate3D(' + xDeg / 2 + '%, ' + yDeg / 2 + '%, 0)';
      } else if (e.classList.contains('circle')) {
        e.style.transform = 'rotate(340deg) translate3D(' + xDeg / 2 + '%, ' + yDeg / 2 + '%, 0)';
      } else {
        e.style.transform = 'translate3D(' + xDeg / 2 + '%, ' + yDeg / 2 + '%, 0)';
      }

    }
  }
}

function leavingAnimation({ linkContainers, aLink, linkHolders, homeContent, homeLeaveringTargets }) {
  for (let i = 0; i < linkContainers.length; i++) {
    let el = linkContainers[i];
    // give the containers a fixed position
    // move the now fixed containers to their original position 
    mover(el, linkHolders[i], (element, xT, yT, xE, yE) => {
      element.style.position = 'fixed';
      element.style.left = xT + 'px';
      element.style.top = (yT - homeContent.scrollTop) + 'px';  
    });
  }
  // delay needed for mover to work properly
  setTimeout(function () {
    // add the leaving class, 'home-leaving.scss' will handle all the rest
    BODY.classList.add('leaving');

    for (let i = 0; i < linkContainers.length; i++) {
      let target = homeLeaveringTargets[i];
      let element = linkContainers[i];
      // move the elements to the targets
      mover(element, target);
    }

    // move the selection to the right item
    let size = BODYCONTAINER.offsetWidth;
    setTimeout(function() {
      homeContent.classList.add('top');
      if (aLink.classList.contains('L')) {
        homeContent.style.top = (size > 800) ? '130px' : '85px';
      } else if (aLink.classList.contains('P')) {
        homeContent.style.top = (size > 800) ? '235px' : '165px';
      } else if (aLink.classList.contains('C')) {
        homeContent.style.top = (size > 800) ? '345px' : '245px';
      } else if (aLink.classList.contains('S')) {
        homeContent.style.top = 'calc(100% - 60px)';
      }

      // duplicate the elements
      // move the elements to the outer DOM position to remove weird flickering bug in chrome
      let temp = linkContainers.length - 1;
      for (let i = 0; i < temp; i++) {
        let element = linkContainers[i];
        let target = homeLeaveringTargets[i];
        let clone = document.importNode(element, true);
        BODY.appendChild(clone);
        mover(clone, target);
      }

      setTimeout(function() {
        // go to location
        window.location.href = aLink.getAttribute('href');
      }, 1000);
    }, 2500);
  }, 200);
}
