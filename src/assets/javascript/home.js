(function () {
  if (R_HOME) {

    BODY.classList.add('lock');

    // after the animation
    setTimeout(() => {
      var start = document.getElementsByClassName('start')[0];
      var end = document.getElementsByClassName('end')[0];

      start.classList.add('sr-only');
      end.classList.remove('sr-only');

      // reset window position to top
      window.location.hash = '#accessibility';

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
      }, 100);

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
          var link = this.href;
          
          for (let i = 0; i < linkContainers.length; i++) {
            // give the containers a fixed position
            linkContainers[i].style.position = 'fixed';
            // move the now fixed containers to their original position 
            mover(linkContainers[i], linkHolders[i], (element, xT, yT, xE, yE) => {
              element.style.left = xT + 'px';
              element.style.top = (yT - homeContent.scrollTop) + 'px';
            });
          }
          // delay needed for mover to work properly
          setTimeout(function() {
            // add the leaving class, 'home-leaving.scss' will handle all the rest
            BODY.classList.add('leaving');
            
            for (let i = 0; i < linkContainers.length; i++) {
              mover(linkContainers[i], homeLeaveringTargets[i]);
            }

            // after some time
            setTimeout(function() {
              // go to location
              window.location.href = link;
            }, 3000);
          }, 200);
        });
      }

    }, 9500);

  }
})();