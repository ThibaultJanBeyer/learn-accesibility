(function () {
  if (R_HOME) {

    BODY.classList.add('lock');
    BODYCONTAINER.classList.add('lock');

    // after the animation
    var animationEnd = function() {
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
      var objects = [...document.getElementsByClassName('home-objects__object')];

      // detect mouse pos
      document.onmousemove = handleMouseMove;
      setInterval(() => {
        // move
        for (let i = 0; i < objects.length; i++) {
          let element = objects[i];

          if (i < 10) {

            if (element.classList.contains('diamond')) {
              element.style.transform = 'rotate(45deg) translate3D(' + (MOUSE.x / 15) + '%, ' + (MOUSE.y / 15) + '%, 0)';
            } else if (element.classList.contains('circle')) {
              element.style.transform = 'rotate(90deg) translate3D(' + (MOUSE.x / 15) + '%, ' + (MOUSE.y / 15) + '%, 0)';
            } else {
              element.style.transform = 'translate3D(' + (MOUSE.x / 15) + '%, ' + (MOUSE.y / 15) + '%, 0)';
            }

          } else if (i < 20) {

            if (element.classList.contains('diamond')) {
              element.style.transform = 'rotate(45deg) translate3D(' + (MOUSE.x / 5) + '%, ' + (MOUSE.y / 5) + '%, 0)';
            } else if (element.classList.contains('circle')) {
              element.style.transform = 'rotate(60deg) translate3D(' + (MOUSE.x / 5) + '%, ' + (MOUSE.y / 5) + '%, 0)';
            } else {
              element.style.transform = 'translate3D(' + (MOUSE.x / 5) + '%, ' + (MOUSE.y / 5) + '%, 0)';
            }

          } else {

            if (element.classList.contains('diamond')) {
              element.style.transform = 'rotate(45deg) translate3D(' + (MOUSE.x / 2) + '%, ' + (MOUSE.y / 2) + '%, 0)';
            } else if (element.classList.contains('circle')) {
              element.style.transform = 'rotate(20deg) translate3D(' + (MOUSE.x / 2) + '%, ' + (MOUSE.y / 2) + '%, 0)';
            } else {
              element.style.transform = 'translate3D(' + (MOUSE.x / 2) + '%, ' + (MOUSE.y / 2) + '%, 0)';
            }

          }
        }
      }, 50);

      /*
       * Leaving animation
       */
      var links = document.getElementsByTagName('a');
      var linkContainers = document.getElementsByClassName('home-nav__link-container');
      var linkHolders = document.getElementsByClassName('home-nav__link-holder');
      var homeLeaveringTargets = document.getElementsByClassName('home-leaving__target');
      var homeContent = document.getElementsByClassName('home__content')[0];

      for (let i = 0; i < links.length; i++) {
        // set the holder size = the container size
        // we will use it later to position elements before moving them
        // to prevent weirt jumping
        linkHolders[i].style.width = linkContainers[i].offsetWidth + 'px';
        linkHolders[i].style.height = linkContainers[i].offsetHeight + 'px';

        // add the click listener to the links
        links[i].addEventListener('click', function (e) {
          e.preventDefault(); // prevent default pageleaving
          var aLink = this;
          console.log(this);
          console.log(e);

          for (let i = 0; i < linkContainers.length; i++) {
            let el = linkContainers[i];
            // give the containers a fixed position
            el.style.position = 'fixed';
            // move the now fixed containers to their original position 
            mover(el, linkHolders[i], (element, xT, yT, xE, yE) => {
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
            setTimeout(function() {
              homeContent.classList.add('top');
              if (aLink.classList.contains('L')) {
                homeContent.style.top = '110px';
              } else if (aLink.classList.contains('P')) {
                homeContent.style.top = '220px';
              } else if (aLink.classList.contains('C')) {
                homeContent.style.top = '330px';
              }

              // duplicate the elements
              // move the elements to the outer DOM position to remove weird flickering bug in chrome
              let temp = linkContainers.length - 1;
              for (let i = 0; i < temp; i++) {
                let element = linkContainers[i];
                let target = homeLeaveringTargets[i];
                let clone = document.importNode(element, true);
                BODY.appendChild(clone);
                console.log(clone, i, target);
                mover(clone, target);
              }

              setTimeout(function() {
                // go to location
                window.location.href = aLink.href;
              }, 1000);
            }, 2500);
          }, 200);
        });
      }
    };

    /*
     * if a users has not been here,
     *  > add a yummy coockie and redirect to welcome.html
     * if he has, check if he entered through the door
     *  > play the animation
     * if not then skip the animation
     */
    if (document.cookie.replace(/(?:(?:^|.*;\s*)doSomethingOnlyOnce\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {
      // first time visit
      window.location.href = 'welcome.html';
      document.cookie = 'doSomethingOnlyOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    } else if(LOCATION.indexOf('door') >= 0) {
      // second time visit (through door)
      let preloader = document.querySelector('.home__preloader');
      preloader.classList.add('home__preloader--loaded');
      setTimeout(function() {
        animationEnd();
      }, 9500);
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