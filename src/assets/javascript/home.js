(function () { if( R_HOME ){

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

  }, 9500);

}})();