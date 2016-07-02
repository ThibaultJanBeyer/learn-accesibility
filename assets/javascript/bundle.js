'use strict';

//.
var LOCATION = window.location.href;
var BODY = document.body;
var WELCOME = document.getElementById('welcome');
var HOME = document.getElementById('home');
var SITE = document.getElementById('site');

var BODYCONTAINER = WELCOME || HOME ? document.getElementsByClassName('body__container')[0] : undefined;

// Routes
if (WELCOME) {
  var R_WELCOME = true;
} else if (SITE) {
  var R_SITE = true;
} else {
  var R_HOME = true;
}
'use strict';

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
    if (LOCATION.indexOf('door') >= 0) {
      // second time visit (through door)
      var preloader = document.querySelector('.home__preloader');
      preloader.classList.add('home__preloader--loaded');
      setTimeout(function () {
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
      var _preloader = document.querySelector('.home__preloader');
      _preloader.classList.add('home__preloader--loaded');
    }

    /* just for testing @TODO: remove */
    var reset = document.createElement('button');
    reset.style.position = 'fixed';
    reset.style.top = '0';
    reset.style.width = '10px';
    reset.style.height = '10px';
    reset.style.background = 'red';
    BODY.appendChild(reset);
    reset.addEventListener('click', function () {
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
  var objects = document.getElementsByClassName('home-objects__object');

  // detect mouse pos
  BODY.addEventListener('mousemove', function (event) {
    mouseMove(event.pageX, event.pageY, objects);
  });
  BODY.addEventListener('touchmove', function (event) {
    mouseMove(event.touches[0].pageX, event.touches[0].pageY, objects);
  });

  /*
   * Leaving animation
   */
  var links = document.getElementsByClassName('leaving-animation');
  var linkContainers = document.getElementsByClassName('leaving-animation__container');
  var linkHolders = document.getElementsByClassName('leaving-animation__holder');
  var homeLeaveringTargets = document.getElementsByClassName('home-leaving__target');
  var homeContent = document.getElementsByClassName('home__content')[0];

  /*
   * Normal Leaving
   */
  for (var i = 0; i < links.length; i++) {
    // set the holder size = the container size
    // we will use it later to position elements before moving them
    // to prevent weirt jumping
    linkHolders[i].style.width = linkContainers[i].offsetWidth + 'px';
    linkHolders[i].style.height = linkContainers[i].offsetHeight + 'px';

    // add the click listener to the links
    links[i].addEventListener('click', function (e) {
      var aLink = this;
      leavingAnimation({ linkContainers: linkContainers, aLink: aLink, linkHolders: linkHolders, homeContent: homeContent, homeLeaveringTargets: homeLeaveringTargets });
      e.preventDefault(); // prevent default pageleaving
    });
  }
}

function mouseMove(hoverX, hoverY, objects) {
  var halfWidth = window.innerWidth / 2;
  var halfHeight = window.innerHeight / 2;

  var xDeg = -(halfWidth - hoverX) / 8;
  var yDeg = (halfHeight - hoverY) / 8;

  for (var i = 0; i < objects.length; i++) {
    var e = objects[i];

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

function leavingAnimation(_ref) {
  var linkContainers = _ref.linkContainers;
  var aLink = _ref.aLink;
  var linkHolders = _ref.linkHolders;
  var homeContent = _ref.homeContent;
  var homeLeaveringTargets = _ref.homeLeaveringTargets;

  for (var i = 0; i < linkContainers.length; i++) {
    var el = linkContainers[i];
    // give the containers a fixed position
    // move the now fixed containers to their original position
    mover(el, linkHolders[i], function (element, xT, yT, xE, yE) {
      element.style.position = 'fixed';
      element.style.left = xT + 'px';
      element.style.top = yT - homeContent.scrollTop + 'px';
    });
  }
  // delay needed for mover to work properly
  setTimeout(function () {
    // add the leaving class, 'home-leaving.scss' will handle all the rest
    BODY.classList.add('leaving');

    for (var _i = 0; _i < linkContainers.length; _i++) {
      var target = homeLeaveringTargets[_i];
      var element = linkContainers[_i];
      // move the elements to the targets
      mover(element, target);
    }

    // move the selection to the right item
    var size = BODYCONTAINER.offsetWidth;
    setTimeout(function () {
      homeContent.classList.add('top');
      if (aLink.classList.contains('L')) {
        homeContent.style.top = size > 800 ? '130px' : '85px';
      } else if (aLink.classList.contains('P')) {
        homeContent.style.top = size > 800 ? '235px' : '165px';
      } else if (aLink.classList.contains('C')) {
        homeContent.style.top = size > 800 ? '345px' : '245px';
      } else if (aLink.classList.contains('S')) {
        homeContent.style.top = 'calc(100% - 60px)';
      }

      // duplicate the elements
      // move the elements to the outer DOM position to remove weird flickering bug in chrome
      var temp = linkContainers.length - 1;
      for (var _i2 = 0; _i2 < temp; _i2++) {
        var _element = linkContainers[_i2];
        var _target = homeLeaveringTargets[_i2];
        var clone = document.importNode(_element, true);
        BODY.appendChild(clone);
        mover(clone, _target);
      }

      setTimeout(function () {
        // go to location
        window.location.href = aLink.getAttribute('href');
      }, 1000);
    }, 2500);
  }, 200);
}
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var _this = this;

  if (R_SITE) {
    var siteContent;
    var siteToggler;
    var navLink;
    var navObjects;
    var audioExamples;
    var skiplinks;
    var menuItems;

    (function () {

      var loading = document.getElementsByClassName('loading');
      setTimeout(function () {
        // timeout to get rid of strange firefox flickering bug...
        for (var i = 0; i < loading.length; i++) {
          loading[i].classList.add('loaded');
        }
      }, 500);

      /*
       * Navigation
       */
      // main
      siteContent = document.getElementsByClassName('site__content')[0];
      siteToggler = document.getElementsByClassName('site__toggler')[0];


      siteToggler.addEventListener('click', function () {
        siteContent.classList.toggle('site__content--open');
        siteToggler.classList.toggle('site__toggler--open');
      });

      navLink = document.getElementsByClassName('nav__link');


      for (var i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener('click', function () {
          var clicked = _this;
          navLinkClick({ clicked: clicked, navLink: navLink, loading: loading });
        });
      }

      // toc
      if (document.getElementsByClassName('toc__toggler')[0]) {
        (function () {
          // toggling
          var tocToggler = document.getElementsByClassName('toc__toggler')[0];
          var tocContainer = document.getElementsByClassName('toc__container')[0];

          tocToggler.addEventListener('click', function () {
            tocToggler.classList.toggle('toc__toggler--open');
            tocContainer.classList.toggle('toc__container--open');
          });

          /*
           * Check which sections the user is on to update the TOC flow accordingly
           */
          setTimeout(function () {
            // a small delay so that everything else is successfully rendered
            // store the position of each section - 1/4 of the window height in an array
            var sectionsPos = [];
            [].concat(_toConsumableArray(document.getElementsByClassName('section__title'))).forEach(function (e, i) {
              sectionsPos.push(e.offsetTop - window.innerHeight / 4);
            });
            sectionsPos.push(siteContent.offsetHeight);

            // store all Links in a variable.
            var tocLinks = document.getElementsByClassName('toc__link');
            // set a boolean that will see if we are scrolling
            var scrolling = true;
            // set that bool = true if we do
            window.onscroll = function () {
              scrolling = true;
            };

            // every x seconds check if a scroll has happened
            setInterval(function () {
              if (scrolling) {
                // is so, then store the scroll position
                var scroll = document.documentElement.scrollTop || document.body.scrollTop;

                // and compare it to each sections position
                for (var _i = 0; _i < tocLinks.length; _i++) {
                  // store the corresponding link. How convenient, that we always have the same amout of links as sections
                  var tocLink = tocLinks[_i];
                  // if it is within the range from the current one to the next one
                  if (scroll > sectionsPos[_i] && scroll < sectionsPos[_i + 1]) {
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
        })();
      }

      /*
       * Objects
       */
      navObjects = document.getElementsByClassName('nav__objects')[0];

      navObjects.style.height = siteContent.offsetHeight + 'px';

      /*
       * Read examples
       */
      audioExamples = document.getElementsByClassName('play');

      for (var _i2 = 0; _i2 < audioExamples.length; _i2++) {
        audioExamples[_i2].addEventListener('click', function () {
          responsiveVoice.speak(this.getAttribute('data-audio'));
        });
      }

      /*
       * Unhide Skiplinks on focus
       */
      skiplinks = document.querySelectorAll('a.visuallyhidden');

      var _loop = function _loop(_i3) {
        var e = skiplinks[_i3];
        e.addEventListener('focus', function () {
          e.classList.remove('visuallyhidden');
        });
        e.addEventListener('blur', function () {
          e.classList.add('visuallyhidden');
        });
      };

      for (var _i3 = 0; _i3 < skiplinks.length; _i3++) {
        _loop(_i3);
      }

      /*
       * Add linkclass to all links within text and strongclass to all strong
       */
      [].concat(_toConsumableArray(document.querySelectorAll('.section a'))).forEach(function (e) {
        e.classList.add('section__link');
      });
      [].concat(_toConsumableArray(document.querySelectorAll('.section strong'))).forEach(function (e) {
        e.classList.add('section__strong');
      });

      /*
       * Examples
       */
      menuItems = document.querySelectorAll('.exampleButton');

      for (var _i4 = 0; _i4 < menuItems.length; _i4++) {
        menuItems[_i4].addEventListener('click', function (e) {
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
    })();
  }
})();

function navLinkClick(_ref) {
  var clicked = _ref.clicked;
  var navLink = _ref.navLink;
  var loading = _ref.loading;

  for (var i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove('nav__link--selected');
  }
  for (var _i5 = 0; _i5 < loading.length; _i5++) {
    loading[_i5].classList.remove('loaded');
  }
  clicked.classList.add('nav__link--selected');
}
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if (R_WELCOME) {

    // stores the values of the elements we need
    var text = document.getElementsByClassName('welcome__text');
    var flyOut = document.getElementsByClassName('fly--out');
    var wText = [];

    for (var i = 0; i < text.length; i++) {
      wText[i] = getChar(document.getElementsByClassName('writer__text--' + (i + 1)));
    }

    // hide all texts except the first one
    [].concat(_toConsumableArray(text)).forEach(function (el, i) {
      if (i !== 0) {
        el.classList.add('visuallyhidden');
      }
    });

    /* we pass:
     * – the array to loop
     * – integer where to start
     * – integer when to end
     * – what happens when ended (here flying in the flyout element)
     * – a boolean if the writer should delete the text 
     * to the writer
     */
    writeEach(wText[0], 0, wText[0].length - 1, function () {
      myLoop({ cd: flyOut.length - 1, dur: 1500, cu: 0 }, function (cd, dur, cu) {
        flyOut[cu].classList.add('fly--in');
      });
    }, false);

    var next = function next(i) {
      if (i === 0) {
        // same as above but with delete option on true to delete the text
        writeEach(wText[i], wText[i].length - 1, 0, function () {
          // when everything is deleted
          setTimeout(function () {
            // hide the image and the text
            myLoop({ cd: flyOut.length - 1, dur: 5, cu: 0 }, function (cd, dur, cu) {
              flyOut[cu].classList.remove('fly--in');
            });
            setTimeout(function () {
              // and remove that first contentblock after some time
              text[i].classList.add('visuallyhidden');
              // go to next animation
              next(i + 1);
            }, 1500);
          }, 500);
        }, true);
      }

      // for any animation up ultil the last
      else if (i < text.length - 1) {
          // unhide the content block
          text[i].classList.remove('visuallyhidden');
          // fly in the icon element
          myLoop({ cd: flyOut.length - 1, dur: 5, cu: 0 }, function (cd, dur, cu) {
            flyOut[cu].classList.add('fly--in');
          });
          //  write the text
          writeEach(wText[i], 0, wText[i].length - 1, function () {
            // when the writing is over, timeout the animation for some seconds
            setTimeout(function () {
              // then delete the text (via the boolean set to "true")
              writeEach(wText[i], wText[i].length - 1, 0, function () {
                // after everything is deleted wait for some seconds
                setTimeout(function () {
                  // then flyout all flyout elements
                  myLoop({ cd: flyOut.length - 1, dur: 5, cu: 0 }, function (cd, dur, cu) {
                    flyOut[cu].classList.remove('fly--in');
                  });
                  // wait again some seconds
                  setTimeout(function () {
                    // and remove that first contentblock
                    text[i].classList.add('visuallyhidden');
                    // then go to the next animation
                    next(i + 1);
                  }, 1500);
                }, 500);
              }, true);
            }, 1750);
          }, false);
        }

        // for the last animation
        else if (i >= text.length - 1) {
            // unhide the content block
            text[i].classList.remove('visuallyhidden');
            // fly in the icon element
            myLoop({ cd: flyOut.length - 1, dur: 10, cu: 0 }, function (cd, dur, cu) {
              flyOut[cu].classList.add('fly--in');
            });
            // write the text
            writeEach(wText[i], 0, wText[i].length - 1, function () {
              // when the writing is over, timeout the animation for some seconds
              setTimeout(function () {
                finishing(i + 1);
              }, 500);
            }, false, true);
          }
    };

    var finishing = function finishing(i) {
      /*
       * open the door 
       */
      myLoop({ cd: 3, dur: 1000, cu: 0 }, function (cd, dur, cu) {
        // get the current attribute src
        var source = flyOut[i].getAttribute('src');
        // substring = everything without the "0.gif" part
        var substring = source.substring(0, source.length - 5);
        console.log(substring);

        // set the src respectively 1.gif, 2.gif, ...
        flyOut[i].setAttribute('src', substring + cu + '.gif');

        if (cd === 0) {
          // prepare all the chars
          // divided in two groupd to mimic the different styles
          setTimeout(function () {
            var wcc = document.querySelectorAll('.welcome__text--normal > .wcc');
            var wc = document.querySelectorAll('.welcome__text--normal > .wcc > .wc');
            var specialWcc = document.querySelectorAll('.welcome__text--special > .wcc');
            var specialWc = document.querySelectorAll('.welcome__text--special > .wcc > .wc');
            for (var j = 0; j < wcc.length; j++) {
              wcc[j].style.display = 'inline-block';
              wcc[j].style.width = wc[j].offsetWidth + 'px';
              wcc[j].style.height = wc[j].offsetHeight - 30 + 'px';
              wc[j].style.position = 'absolute';
              wc[j].style.zIndex = '99';
              wc[j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
              wc[j].style.textShadow = 'none';
            }
            for (var _j = 0; _j < specialWcc.length; _j++) {
              specialWcc[_j].style.display = 'inline-block';
              specialWcc[_j].style.width = specialWc[_j].offsetWidth + 'px';
              specialWcc[_j].style.height = specialWc[_j].offsetHeight - 70 + 'px';
              specialWc[_j].style.position = 'absolute';
              specialWc[_j].style.zIndex = '99';
              specialWc[_j].style.transition = 'font-size 1.5s ease-out, left 1s ease-out, top 1s ease-out';
              specialWc[_j].style.textShadow = 'none';
            }

            /*
            * fly elements into the door
            */
            var target = document.getElementsByClassName('welcome__target')[0];
            // this is what should happen with each letter
            var specialMove = function specialMove(el, xT, yT, xE, yE, i) {
              setTimeout(function () {
                // scramble the elements
                if (i % 2 === 0) {
                  el.style.left = xE - Math.floor(Math.random() * 101) + 'px';
                  el.style.top = yE + Math.floor(Math.random() * 101) + 'px';
                } else {
                  el.style.left = xE + Math.floor(Math.random() * 101) + 'px';
                  el.style.top = yE - Math.floor(Math.random() * 101) + 'px';
                }
                setTimeout(function () {
                  // then move one after another towards the door
                  el.style.left = xT + 'px';
                  el.style.top = yT + 'px';
                  el.style.fontSize = '1px';
                }, 400);
              }, 5);
            };
            // move large text
            mover(specialWc, target, specialMove);
            // move normal text
            mover(wc, target, specialMove, function () {
              /*
               * fly through door
               */
              setTimeout(function () {
                // lock the screen by hiding overflow
                WELCOME.classList.add('lock');
                BODY.classList.add('lock');
                // get the fly img container and let it overflow
                var container = document.getElementsByClassName('fly__container')[i];
                container.style.overflow = 'visible';
                // change the flyout to grow super big
                flyOut[i].style.position = 'relative';
                flyOut[i].style.transform = 'translateY(0) scale(20,20)';
                // add a locked class to the lock element
                // css to fade it in with full white
                var lock = document.getElementsByClassName('lock--locker')[0];
                lock.classList.add('lock--locked');

                setTimeout(function () {
                  window.location.href = 'index.html#door';
                }, 400);
              }, 1000);
            });
          }, 2000);
        }
      });
    };

    var buttonNext = document.getElementsByClassName('button--next');
    // bind actions to each button
    [].concat(_toConsumableArray(buttonNext)).forEach(function (el, i) {
      // first remove the disabled attrubute
      el.removeAttribute('disabled');
      // then add an onclick listener
      el.addEventListener('click', function () {
        el.setAttribute('disabled', 'true');
        // run the next function with the appropriate button number
        next(i);
      });
    });
  }
})();
'use strict';

(function () {
  /*
   * Script that adds a svg anchor and proper ids and links to those anchors.
   * To all elements with the anchor--add class
   * via Thibault Jan Beyer via http://codepen.io/ThibaultJanBeyer/pen/beeVbJ
   * Common Public *
   */
  var svg = '<svg viewBox="153.1 4.9 14 16"><path d="M160.1,4.9c-1,0-1.9,0.8-1.9,1.8c0,0.7,0.5,1.4,1.1,1.6l0,0.9h-5v1h4.9l-0.1,7.1c0,0.1,0,1.6-2,0.6c-2-1-0.9-2.1-0.7-2.2 c-1.2-0.4-2.2-1.4-3.1-2.4c-0.8,1.8,0.7,3.8,0.7,4.1c0.2-0.2,0.5-0.2,0.6-0.1c2,3.1,4.7,2.7,5.4,3.6c0.7-0.9,3.4-0.5,5.4-3.6 c0.2,0,0.4-0.1,0.6,0.1c0.1-0.3,1.6-2.2,0.7-4.1c-0.9,1-1.9,2-3.1,2.4c0.1,0,1.3,1.2-0.7,2.2c-2,1-2-0.4-2-0.6l-0.2-7.1h4.9v-1h-5 l0-0.9c0.6-0.3,1.1-0.9,1.1-1.6C161.9,5.7,161.1,4.9,160.1,4.9z M160.1,6c0.4,0,0.7,0.3,0.7,0.7c0,0.4-0.3,0.7-0.7,0.7 s-0.7-0.3-0.7-0.7C159.4,6.3,159.7,6,160.1,6z"/></svg>';
  var anchorElements = document.getElementsByClassName('anchor--add');

  // Setup all elements with class "anchor--add" to have the anchor svg and give them the ID equal to their innerText without any special character
  for (var i = 0; i < anchorElements.length; i++) {
    var el = anchorElements[i];
    var content = el.innerHTML;
    var contentText = el.innerText || el.textContent;
    var replaceText = contentText.replace(/[^A-Za-z0-9]/g, '-');
    var anchor = '<a class="anchor" href="#' + replaceText + '" aria-hidden="true" tabindex="0">';

    el.innerHTML = anchor + svg + '</a>' + content;
    el.setAttribute('ID', replaceText);
  }

  // add skiplinks
  var anchorSkip = document.getElementsByClassName('anchor--skiplink');
  for (var j = 0; j < anchorSkip.length; j++) {
    var elJ = anchorSkip[j];
    var dataSkiplinkTitle = elJ.getAttribute('data-skiplink-title');
    var dataSkiplinkIndex = elJ.getAttribute('data-skiplink-index');
    dataSkiplinkTitle = dataSkiplinkTitle.replace(/[^A-Za-z0-9]/g, '-');

    if (!dataSkiplinkIndex) {
      elJ.setAttribute('href', '#' + dataSkiplinkTitle);
    } else {
      elJ.setAttribute('href', '#' + dataSkiplinkTitle + '-' + dataSkiplinkIndex);
      elJ.removeAttribute('data-skiplink-index');
    }
    elJ.removeAttribute('data-skiplink-title');
  }

  // add ria-labeledbys
  var anchorAria = document.getElementsByClassName('anchor--aria-labelledby');
  for (var k = 0; k < anchorAria.length; k++) {
    var elK = anchorAria[k];
    var labelAria = elK.getAttribute('data-aria-labelledby');
    labelAria = labelAria.replace(/[^A-Za-z0-9]/g, '-');

    elK.setAttribute('aria-labelledby', labelAria);
    elK.removeAttribute('data-aria-labelledby');
  }

  // give lis anchors
  var anchorLi = document.getElementsByClassName('anchor--li');
  for (var l = 0; l < anchorLi.length; l++) {
    var elL = anchorLi[l];
    var contentL = elL.innerHTML;
    var sectionTitle = elL.getAttribute('data-section-title');
    var index = elL.getAttribute('data-index');
    sectionTitle = sectionTitle.replace(/[^A-Za-z0-9]/g, '-');
    var anchorL = '<a class="anchor" href="#' + sectionTitle + '-' + index + '" aria-hidden="true">';

    elL.innerHTML = anchorL + svg + '</a>' + contentL;
    elL.setAttribute('id', sectionTitle + '-' + index);
    elL.removeAttribute('data-section-title');
    elL.removeAttribute('data-index');
  }
})();
'use strict';

/**
 *
 * The mover moves elements to a certain target element
 * (via Thibault Jan Beyer @ThibaultBeyer http://codepen.io/pen/RRPQEX http://thibaultjanbeyer.com)
 *
 * @param  {Nodes} elements             A list of elements that should move array
 * 
 * @param  {Node} target                The target element
 *
 * @param  {Function} callback          This is what should happen each run
 * 
 * @param  {Function} endCallback       This is what should happen at the end 
 *         (elements[cu], xT, yT, xE, yE, cu)
 * 
 * example:
 * 
 * mover(specialWc, target, (el, xT, yT, xE, yE, i) => {
 *     setTimeout(function() {
 *       // then move one after another towards the door
 *       el.style.left = xT + 'px';
 *       el.style.top = yT + 'px';
 *       el.style.fontSize = '1px';
 *     }, 500);
 *   });
 */
function mover(elements, target, callback, endCallback) {
  // store the x,y coordinates of the target and setup variables
  var xT = target.offsetLeft,
      yT = target.offsetTop,
      xE,
      yE;
  // is there are several elements
  if (elements.length > 0) {
    myLoop({ cd: elements.length - 1, dur: 5, cu: 0 }, function (cd, dur, cu) {
      // store the elements coordinate
      xE = elements[cu].offsetLeft;
      yE = elements[cu].offsetTop;
      // set the elements position to their position for a smooth animation
      elements[cu].style.left = xE + 'px';
      elements[cu].style.top = yE + 'px';
      // set their position to the target position
      // the animation is a simple css transition
      if (callback) {
        callback(elements[cu], xT, yT, xE, yE, cu);
      } else {
        setTimeout(function () {
          elements[cu].style.left = xT + 'px';
          elements[cu].style.top = yT + 'px';
        }, 500);
      }
      if (cd === 0) {
        if (endCallback) {
          endCallback();
        }
      }
    });
  } else {
    // do the same but only on one element
    xE = elements.offsetLeft;
    yE = elements.offsetTop;
    elements.style.left = xE + 'px';
    elements.style.top = yE + 'px';
    if (callback) {
      callback(elements, xT, yT, xE, yE);
    } else {
      setTimeout(function () {
        elements.style.left = xT + 'px';
        elements.style.top = yT + 'px';
      }, 500);
    }
    // note that it doesn’t need an end callback since
    // it is only one element to perfrom the action on
  }
}
"use strict";

/**
 * A loop with timeouts.
 * (via Thibault Jan Beyer @ThibaultBeyer http://thibaultjanbeyer.com)
 *
 * @param  {object}   options
 *         cd: Integer,            The number of times it should run => ..3, ..2, ..1, ..0
 *         dur: Integer,             How long should it timeout? In ms
 *         cu: Integer               Every run this number is increased by 1 => 0, ..1, ..2 , ..3
 * 
 * @param  {Function} callback            This is what should happen each run
 *         cd, dur, cu   get’s the current state of options
 * 
 * @param  {//}       scope               can be blank
 *
 * 
 * example:
 * 
 * myLoop({
 *   cd: 9, // number of iterations
 *   dur: 150, // in ms
 *   cu: 0 // starts to count up at 0 
 * },
 *   (cd, dur, cu) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + cd + '.jpg');
 * });
 */
function myLoop(options, callback, scope) {
  // pass number of iterations and dur in ms and counter
  callback.call(scope, options.cd, options.dur, options.cu); // passes back stuff we need to callback into
  options.cu++;
  if (--options.cd >= 0) {
    setTimeout(function () {
      myLoop(options, callback, scope); // decrement cd and call myLoop again if cd >= 0
    }, options.dur);
  }
}
'use strict';

(function () {
	/**
  * Prism is a Syntax highliter.
  * (via Lea Verou, Golmote & co. via http://prismjs.com)
  *
  */
	var _self = typeof window !== 'undefined' ? window // if in browser
	: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
	: {} // if in node js
	;

	/**
  * Prism: Lightweight, robust, elegant syntax highlighting
  * MIT license http://www.opensource.org/licenses/mit-license.php/
  * @author Lea Verou http://lea.verou.me
  */

	var Prism = function () {

		// Private helper vars
		var lang = /\blang(?:uage)?-(\w+)\b/i;
		var uniqueId = 0;

		var _ = _self.Prism = {
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
					} else if (_.util.type(tokens) === 'Array') {
						return tokens.map(_.util.encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				type: function type(o) {
					return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
				},

				objId: function objId(obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				// Deep clone a language definition (e.g. to extend it)
				clone: function clone(o) {
					var type = _.util.type(o);

					switch (type) {
						case 'Object':
							var clone = {};

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = _.util.clone(o[key]);
								}
							}

							return clone;

						case 'Array':
							// Check for existence for IE8
							return o.map && o.map(function (v) {
								return _.util.clone(v);
							});
					}

					return o;
				}
			},

			languages: {
				extend: function extend(id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
     * Insert a token before another token in a language literal
     * As this needs to recreate the object (we cannot actually insert before keys in object literals),
     * we cannot just provide an object, we need anobject and a key.
     * @param inside The key (or language id) of the parent
     * @param before The key to insert before. If not provided, the function appends instead.
     * @param insert Object with the key/value pairs to insert
     * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
     */
				insertBefore: function insertBefore(inside, before, insert, root) {
					root = root || _.languages;
					var grammar = root[inside];

					if (arguments.length == 2) {
						insert = arguments[1];

						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								grammar[newToken] = insert[newToken];
							}
						}

						return grammar;
					}

					var ret = {};

					for (var token in grammar) {

						if (grammar.hasOwnProperty(token)) {

							if (token == before) {

								for (var newToken in insert) {

									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							ret[token] = grammar[token];
						}
					}

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === root[inside] && key != inside) {
							this[key] = ret;
						}
					});

					return root[inside] = ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};
					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, null, visited);
							} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
								visited[_.util.objId(o[i])] = true;
								_.languages.DFS(o[i], callback, i, visited);
							}
						}
					}
				}
			},
			plugins: {},

			highlightAll: function highlightAll(async, callback) {
				var env = {
					callback: callback,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run("before-highlightall", env);

				var elements = env.elements || document.querySelectorAll(env.selector);

				for (var i = 0, element; element = elements[i++];) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			highlightElement: function highlightElement(element, async, callback) {
				// Find language
				var language,
				    grammar,
				    parent = element;

				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
					grammar = _.languages[language];
				}

				// Set language on the element, if not present
				element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				_.hooks.run('before-sanity-check', env);

				if (!env.code || !env.grammar) {
					_.hooks.run('complete', env);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						env.highlightedCode = evt.data;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						callback && callback.call(env.element);
						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(element);

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				}
			},

			highlight: function highlight(text, grammar, language) {
				var tokens = _.tokenize(text, grammar);
				return Token.stringify(_.util.encode(tokens), language);
			},

			tokenize: function tokenize(text, grammar, language) {
				var Token = _.Token;

				var strarr = [text];

				var rest = grammar.rest;

				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				tokenloop: for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						var pattern = patterns[j],
						    inside = pattern.inside,
						    lookbehind = !!pattern.lookbehind,
						    greedy = !!pattern.greedy,
						    lookbehindLength = 0,
						    alias = pattern.alias;

						if (greedy && !pattern.pattern.global) {
							// Without the global flag, lastIndex won't work
							pattern.pattern = RegExp(pattern.pattern.source, pattern.pattern.flags + "g");
						}

						pattern = pattern.pattern || pattern;

						// Don’t cache length as it changes during the loop
						for (var i = 0, pos = 0; i < strarr.length; pos += (strarr[i].matchedStr || strarr[i]).length, ++i) {

							var str = strarr[i];

							if (strarr.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								break tokenloop;
							}

							if (str instanceof Token) {
								continue;
							}

							pattern.lastIndex = 0;

							var match = pattern.exec(str),
							    delNum = 1;

							// Greedy patterns can override/remove up to two previously matched tokens
							if (!match && greedy && i != strarr.length - 1) {
								pattern.lastIndex = pos;
								match = pattern.exec(text);
								if (!match) {
									break;
								}

								var from = match.index + (lookbehind ? match[1].length : 0),
								    to = match.index + match[0].length,
								    k = i,
								    p = pos;

								for (var len = strarr.length; k < len && p < to; ++k) {
									p += (strarr[k].matchedStr || strarr[k]).length;
									// Move the index i to the element in strarr that is closest to from
									if (from >= p) {
										++i;
										pos = p;
									}
								}

								/*
         * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
         * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
         */
								if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
									continue;
								}

								// Number of tokens to delete and replace with the new match
								delNum = k - i;
								str = text.slice(pos, p);
								match.index -= pos;
							}

							if (!match) {
								continue;
							}

							if (lookbehind) {
								lookbehindLength = match[1].length;
							}

							var from = match.index + lookbehindLength,
							    match = match[0].slice(lookbehindLength),
							    to = from + match.length,
							    before = str.slice(0, from),
							    after = str.slice(to);

							var args = [i, delNum];

							if (before) {
								args.push(before);
							}

							var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

							args.push(wrapped);

							if (after) {
								args.push(after);
							}

							Array.prototype.splice.apply(strarr, args);
						}
					}
				}

				return strarr;
			},

			hooks: {
				all: {},

				add: function add(name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				run: function run(name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; callback = callbacks[i++];) {
						callback(env);
					}
				}
			}
		};

		var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
			this.type = type;
			this.content = content;
			this.alias = alias;
			// Copy of the full string this token was created from
			this.matchedStr = matchedStr || null;
			this.greedy = !!greedy;
		};

		Token.stringify = function (o, language, parent) {
			if (typeof o == 'string') {
				return o;
			}

			if (_.util.type(o) === 'Array') {
				return o.map(function (element) {
					return Token.stringify(element, language, o);
				}).join('');
			}

			var env = {
				type: o.type,
				content: Token.stringify(o.content, language, parent),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language,
				parent: parent
			};

			if (env.type == 'comment') {
				env.attributes['spellcheck'] = 'true';
			}

			if (o.alias) {
				var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
				Array.prototype.push.apply(env.classes, aliases);
			}

			_.hooks.run('wrap', env);

			var attributes = '';

			for (var name in env.attributes) {
				attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
			}

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
		};

		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _self.Prism;
			}
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
				    lang = message.language,
				    code = message.code,
				    immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);

			return _self.Prism;
		}

		//Get current script and highlight
		var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

		if (script) {
			_.filename = script.src;

			if (document.addEventListener && !script.hasAttribute('data-manual')) {
				if (document.readyState !== "loading") {
					requestAnimationFrame(_.highlightAll, 0);
				} else {
					document.addEventListener('DOMContentLoaded', _.highlightAll);
				}
			}
		}

		return _self.Prism;
	}();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof global !== 'undefined') {
		global.Prism = Prism;
	}
	;
	Prism.languages.markup = {
		'comment': /<!--[\w\W]*?-->/,
		'prolog': /<\?[\w\W]+?\?>/,
		'doctype': /<!DOCTYPE[\w\W]+?>/,
		'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'attr-value': {
					pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
					inside: {
						'punctuation': /[=>"']/
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': /&#?[\da-z]{1,8};/i
	};

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Prism.languages.xml = Prism.languages.markup;
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.css = {
		'comment': /\/\*[\w\W]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
		'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
		'property': /(\b|\B)[\w-]+(?=\s*:)/i,
		'important': /\B!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
				lookbehind: true,
				inside: Prism.languages.css,
				alias: 'language-css'
			}
		});

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|').*?\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	};
	Prism.languages.clike = {
		'comment': [{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}],
		'string': {
			pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /(\.|\\)/
			}
		},
		'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		'boolean': /\b(true|false)\b/,
		'function': /[a-z0-9_]+(?=\()/i,
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
		'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
	});

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		}
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\\\|\\?[^\\])*?`/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\$\{[^}]+\}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		}
	});

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript,
				alias: 'language-javascript'
			}
		});
	}

	Prism.languages.js = Prism.languages.javascript;
})();
"use strict";

/*
 ResponsiveVoice JS v1.4.7

 (c) 2015 LearnBrite
 free for non commercial use

 License: http://responsivevoice.org/license
*/
if ("undefined" != typeof responsiveVoice) console.log("ResponsiveVoice already loaded"), console.log(responsiveVoice);else var ResponsiveVoice = function ResponsiveVoice() {
  var a = this;a.version = "1.4.7";console.log("ResponsiveVoice r" + a.version);a.responsivevoices = [{ name: "UK English Female", flag: "gb", gender: "f", voiceIDs: [3, 5, 1, 6, 7, 171, 201, 8] }, { name: "UK English Male", flag: "gb", gender: "m", voiceIDs: [0, 4, 2, 75, 202, 159, 6, 7] }, { name: "US English Female", flag: "us", gender: "f", voiceIDs: [39, 40, 41, 42, 43, 173, 205, 204, 44] }, { name: "Arabic Male",
    flag: "ar", gender: "m", voiceIDs: [96, 95, 97, 196, 98], deprecated: !0 }, { name: "Arabic Female", flag: "ar", gender: "f", voiceIDs: [96, 95, 97, 196, 98] }, { name: "Armenian Male", flag: "hy", gender: "f", voiceIDs: [99] }, { name: "Australian Female", flag: "au", gender: "f", voiceIDs: [87, 86, 5, 201, 88] }, { name: "Brazilian Portuguese Female", flag: "br", gender: "f", voiceIDs: [124, 123, 125, 186, 223, 126] }, { name: "Chinese Female", flag: "cn", gender: "f", voiceIDs: [58, 59, 60, 155, 191, 231, 61] }, { name: "Czech Female", flag: "cz", gender: "f", voiceIDs: [101, 100, 102, 197, 103] }, { name: "Danish Female", flag: "dk", gender: "f", voiceIDs: [105, 104, 106, 198, 107] }, { name: "Deutsch Female", flag: "de", gender: "f", voiceIDs: [27, 28, 29, 30, 31, 78, 170, 199, 32] }, { name: "Dutch Female", flag: "nl", gender: "f", voiceIDs: [219, 84, 157, 158, 184, 45] }, { name: "Finnish Female", flag: "fi", gender: "f", voiceIDs: [90, 89, 91, 209, 92] }, { name: "French Female", flag: "fr", gender: "f", voiceIDs: [21, 22, 23, 77, 178, 210, 26] }, { name: "Greek Female", flag: "gr", gender: "f", voiceIDs: [62, 63, 80, 200, 64] }, { name: "Hatian Creole Female", flag: "ht",
    gender: "f", voiceIDs: [109] }, { name: "Hindi Female", flag: "hi", gender: "f", voiceIDs: [66, 154, 179, 213, 67] }, { name: "Hungarian Female", flag: "hu", gender: "f", voiceIDs: [9, 10, 81, 214, 11] }, { name: "Indonesian Female", flag: "id", gender: "f", voiceIDs: [111, 112, 180, 215, 113] }, { name: "Italian Female", flag: "it", gender: "f", voiceIDs: [33, 34, 35, 36, 37, 79, 181, 216, 38] }, { name: "Japanese Female", flag: "jp", gender: "f", voiceIDs: [50, 51, 52, 153, 182, 217, 53] }, { name: "Korean Female", flag: "kr", gender: "f", voiceIDs: [54, 55, 56, 156, 183, 218, 57] }, { name: "Latin Female",
    flag: "va", gender: "f", voiceIDs: [114] }, { name: "Norwegian Female", flag: "no", gender: "f", voiceIDs: [72, 73, 221, 74] }, { name: "Polish Female", flag: "pl", gender: "f", voiceIDs: [120, 119, 121, 185, 222, 122] }, { name: "Portuguese Female", flag: "br", gender: "f", voiceIDs: [128, 127, 129, 187, 224, 130] }, { name: "Romanian Male", flag: "ro", gender: "m", voiceIDs: [151, 150, 152, 225, 46] }, { name: "Russian Female", flag: "ru", gender: "f", voiceIDs: [47, 48, 83, 188, 226, 49] }, { name: "Slovak Female", flag: "sk", gender: "f", voiceIDs: [133, 132, 134, 227, 135] }, { name: "Spanish Female",
    flag: "es", gender: "f", voiceIDs: [19, 16, 17, 18, 20, 76, 174, 207, 15] }, { name: "Spanish Latin American Female", flag: "es", gender: "f", voiceIDs: [137, 136, 138, 175, 208, 139] }, { name: "Swedish Female", flag: "sv", gender: "f", voiceIDs: [85, 148, 149, 228, 65] }, { name: "Tamil Male", flag: "hi", gender: "m", voiceIDs: [141] }, { name: "Thai Female", flag: "th", gender: "f", voiceIDs: [143, 142, 144, 189, 229, 145] }, { name: "Turkish Female", flag: "tr", gender: "f", voiceIDs: [69, 70, 82, 190, 230, 71] }, { name: "Afrikaans Male", flag: "af", gender: "m", voiceIDs: [93] }, { name: "Albanian Male",
    flag: "sq", gender: "m", voiceIDs: [94] }, { name: "Bosnian Male", flag: "bs", gender: "m", voiceIDs: [14] }, { name: "Catalan Male", flag: "catalonia", gender: "m", voiceIDs: [68] }, { name: "Croatian Male", flag: "hr", gender: "m", voiceIDs: [13] }, { name: "Czech Male", flag: "cz", gender: "m", voiceIDs: [161] }, { name: "Danish Male", flag: "da", gender: "m", voiceIDs: [162], deprecated: !0 }, { name: "Esperanto Male", flag: "eo", gender: "m", voiceIDs: [108] }, { name: "Finnish Male", flag: "fi", gender: "m", voiceIDs: [160], deprecated: !0 }, { name: "Greek Male", flag: "gr",
    gender: "m", voiceIDs: [163], deprecated: !0 }, { name: "Hungarian Male", flag: "hu", gender: "m", voiceIDs: [164] }, { name: "Icelandic Male", flag: "is", gender: "m", voiceIDs: [110] }, { name: "Latin Male", flag: "va", gender: "m", voiceIDs: [165], deprecated: !0 }, { name: "Latvian Male", flag: "lv", gender: "m", voiceIDs: [115] }, { name: "Macedonian Male", flag: "mk", gender: "m", voiceIDs: [116] }, { name: "Moldavian Male", flag: "md", gender: "m", voiceIDs: [117] }, { name: "Montenegrin Male", flag: "me", gender: "m", voiceIDs: [118] }, { name: "Norwegian Male", flag: "no",
    gender: "m", voiceIDs: [166] }, { name: "Serbian Male", flag: "sr", gender: "m", voiceIDs: [12] }, { name: "Serbo-Croatian Male", flag: "hr", gender: "m", voiceIDs: [131] }, { name: "Slovak Male", flag: "sk", gender: "m", voiceIDs: [167], deprecated: !0 }, { name: "Swahili Male", flag: "sw", gender: "m", voiceIDs: [140] }, { name: "Swedish Male", flag: "sv", gender: "m", voiceIDs: [168], deprecated: !0 }, { name: "Vietnamese Male", flag: "vi", gender: "m", voiceIDs: [146], deprecated: !0 }, { name: "Welsh Male", flag: "cy", gender: "m", voiceIDs: [147] }, { name: "US English Male",
    flag: "us", gender: "m", voiceIDs: [0, 4, 2, 6, 7, 75, 159] }, { name: "Fallback UK Female", flag: "gb", gender: "f", voiceIDs: [8] }];a.voicecollection = [{ name: "Google UK English Male" }, { name: "Agnes" }, { name: "Daniel Compact" }, { name: "Google UK English Female" }, { name: "en-GB", rate: .25, pitch: 1 }, { name: "en-AU", rate: .25, pitch: 1 }, { name: "inglés Reino Unido" }, { name: "English United Kingdom" }, { name: "Fallback en-GB Female", lang: "en-GB", fallbackvoice: !0 }, { name: "Eszter Compact" }, { name: "hu-HU", rate: .4 }, { name: "Fallback Hungarian",
    lang: "hu", fallbackvoice: !0, service: "g2" }, { name: "Fallback Serbian", lang: "sr", fallbackvoice: !0 }, { name: "Fallback Croatian", lang: "hr", fallbackvoice: !0 }, { name: "Fallback Bosnian", lang: "bs", fallbackvoice: !0 }, { name: "Fallback Spanish", lang: "es", fallbackvoice: !0 }, { name: "Spanish Spain" }, { name: "español España" }, { name: "Diego Compact", rate: .3 }, { name: "Google Español" }, { name: "es-ES", rate: .2 }, { name: "Google Français" }, { name: "French France" }, { name: "francés Francia" }, { name: "Virginie Compact",
    rate: .5 }, { name: "fr-FR", rate: .25 }, { name: "Fallback French", lang: "fr", fallbackvoice: !0 }, { name: "Google Deutsch" }, { name: "German Germany" }, { name: "alemán Alemania" }, { name: "Yannick Compact", rate: .5 }, { name: "de-DE", rate: .25 }, { name: "Fallback Deutsch", lang: "de", fallbackvoice: !0 }, { name: "Google Italiano" }, { name: "Italian Italy" }, { name: "italiano Italia" }, { name: "Paolo Compact", rate: .5 }, { name: "it-IT", rate: .25 }, { name: "Fallback Italian", lang: "it", fallbackvoice: !0 }, { name: "Google US English", timerSpeed: 1 }, { name: "English United States" }, { name: "inglés Estados Unidos" }, { name: "Vicki" }, { name: "en-US", rate: .2, pitch: 1, timerSpeed: 1.3 }, { name: "Fallback English", lang: "en-US", fallbackvoice: !0, timerSpeed: 0 }, { name: "Fallback Dutch", lang: "nl", fallbackvoice: !0, timerSpeed: 0 }, { name: "Fallback Romanian", lang: "ro", fallbackvoice: !0 }, { name: "Milena Compact" }, { name: "ru-RU", rate: .25 }, { name: "Fallback Russian", lang: "ru", fallbackvoice: !0 }, { name: "Google 日本人", timerSpeed: 1 }, { name: "Kyoko Compact" }, { name: "ja-JP", rate: .25 }, { name: "Fallback Japanese",
    lang: "ja", fallbackvoice: !0 }, { name: "Google 한국의", timerSpeed: 1 }, { name: "Narae Compact" }, { name: "ko-KR", rate: .25 }, { name: "Fallback Korean", lang: "ko", fallbackvoice: !0 }, { name: "Google 中国的", timerSpeed: 1 }, { name: "Ting-Ting Compact" }, { name: "zh-CN", rate: .25 }, { name: "Fallback Chinese", lang: "zh-CN", fallbackvoice: !0 }, { name: "Alexandros Compact" }, { name: "el-GR", rate: .25 }, { name: "Fallback Greek", lang: "el", fallbackvoice: !0, service: "g2" }, { name: "Fallback Swedish", lang: "sv", fallbackvoice: !0, service: "g2" }, { name: "hi-IN", rate: .25 }, { name: "Fallback Hindi", lang: "hi", fallbackvoice: !0 }, { name: "Fallback Catalan", lang: "ca", fallbackvoice: !0 }, { name: "Aylin Compact" }, { name: "tr-TR", rate: .25 }, { name: "Fallback Turkish", lang: "tr", fallbackvoice: !0 }, { name: "Stine Compact" }, { name: "no-NO", rate: .25 }, { name: "Fallback Norwegian", lang: "no", fallbackvoice: !0, service: "g2" }, { name: "Daniel" }, { name: "Monica" }, { name: "Amelie" }, { name: "Anna" }, { name: "Alice" }, { name: "Melina" }, { name: "Mariska" }, { name: "Yelda" }, { name: "Milena" }, { name: "Xander" }, { name: "Alva" }, { name: "Lee Compact" }, { name: "Karen" }, { name: "Fallback Australian", lang: "en-AU", fallbackvoice: !0 }, { name: "Mikko Compact" }, { name: "Satu" }, { name: "fi-FI", rate: .25 }, { name: "Fallback Finnish", lang: "fi", fallbackvoice: !0, service: "g2" }, { name: "Fallback Afrikans", lang: "af", fallbackvoice: !0 }, { name: "Fallback Albanian", lang: "sq", fallbackvoice: !0 }, { name: "Maged Compact" }, { name: "Tarik" }, { name: "ar-SA", rate: .25 }, { name: "Fallback Arabic", lang: "ar", fallbackvoice: !0, service: "g2" }, { name: "Fallback Armenian", lang: "hy", fallbackvoice: !0,
    service: "g2" }, { name: "Zuzana Compact" }, { name: "Zuzana" }, { name: "cs-CZ", rate: .25 }, { name: "Fallback Czech", lang: "cs", fallbackvoice: !0, service: "g2" }, { name: "Ida Compact" }, { name: "Sara" }, { name: "da-DK", rate: .25 }, { name: "Fallback Danish", lang: "da", fallbackvoice: !0, service: "g2" }, { name: "Fallback Esperanto", lang: "eo", fallbackvoice: !0 }, { name: "Fallback Hatian Creole", lang: "ht", fallbackvoice: !0 }, { name: "Fallback Icelandic", lang: "is", fallbackvoice: !0 }, { name: "Damayanti" }, { name: "id-ID", rate: .25 }, { name: "Fallback Indonesian",
    lang: "id", fallbackvoice: !0 }, { name: "Fallback Latin", lang: "la", fallbackvoice: !0, service: "g2" }, { name: "Fallback Latvian", lang: "lv", fallbackvoice: !0 }, { name: "Fallback Macedonian", lang: "mk", fallbackvoice: !0 }, { name: "Fallback Moldavian", lang: "mo", fallbackvoice: !0, service: "g2" }, { name: "Fallback Montenegrin", lang: "sr-ME", fallbackvoice: !0 }, { name: "Agata Compact" }, { name: "Zosia" }, { name: "pl-PL", rate: .25 }, { name: "Fallback Polish", lang: "pl", fallbackvoice: !0 }, { name: "Raquel Compact" }, { name: "Luciana" }, { name: "pt-BR", rate: .25 }, { name: "Fallback Brazilian Portugese", lang: "pt-BR", fallbackvoice: !0, service: "g2" }, { name: "Joana Compact" }, { name: "Joana" }, { name: "pt-PT", rate: .25 }, { name: "Fallback Portuguese", lang: "pt-PT", fallbackvoice: !0 }, { name: "Fallback Serbo-Croation", lang: "sh", fallbackvoice: !0, service: "g2" }, { name: "Laura Compact" }, { name: "Laura" }, { name: "sk-SK", rate: .25 }, { name: "Fallback Slovak", lang: "sk", fallbackvoice: !0, service: "g2" }, { name: "Javier Compact" }, { name: "Paulina" }, { name: "es-MX", rate: .25 }, { name: "Fallback Spanish (Latin American)",
    lang: "es-419", fallbackvoice: !0, service: "g2" }, { name: "Fallback Swahili", lang: "sw", fallbackvoice: !0 }, { name: "Fallback Tamil", lang: "ta", fallbackvoice: !0 }, { name: "Narisa Compact" }, { name: "Kanya" }, { name: "th-TH", rate: .25 }, { name: "Fallback Thai", lang: "th", fallbackvoice: !0 }, { name: "Fallback Vietnamese", lang: "vi", fallbackvoice: !0 }, { name: "Fallback Welsh", lang: "cy", fallbackvoice: !0 }, { name: "Oskar Compact" }, { name: "sv-SE", rate: .25 }, { name: "Simona Compact" }, { name: "Ioana" }, { name: "ro-RO", rate: .25 }, { name: "Kyoko" }, { name: "Lekha" }, { name: "Ting-Ting" }, { name: "Yuna" }, { name: "Xander Compact" }, { name: "nl-NL", rate: .25 }, { name: "Fallback UK English Male", lang: "en-GB", fallbackvoice: !0, service: "g1", voicename: "rjs" }, { name: "Finnish Male", lang: "fi", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Czech Male", lang: "cs", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Danish Male", lang: "da", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Greek Male", lang: "el", fallbackvoice: !0, service: "g1", voicename: "", rate: .25 }, { name: "Hungarian Male",
    lang: "hu", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Latin Male", lang: "la", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Norwegian Male", lang: "no", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Slovak Male", lang: "sk", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Swedish Male", lang: "sv", fallbackvoice: !0, service: "g1", voicename: "" }, { name: "Fallback US English Male", lang: "en", fallbackvoice: !0, service: "tts-api", voicename: "" }, { name: "German Germany", lang: "de_DE" }, { name: "English United Kingdom",
    lang: "en_GB" }, { name: "English India", lang: "en_IN" }, { name: "English United States", lang: "en_US" }, { name: "Spanish Spain", lang: "es_ES" }, { name: "Spanish Mexico", lang: "es_MX" }, { name: "Spanish United States", lang: "es_US" }, { name: "French Belgium", lang: "fr_BE" }, { name: "French France", lang: "fr_FR" }, { name: "Hindi India", lang: "hi_IN" }, { name: "Indonesian Indonesia", lang: "in_ID" }, { name: "Italian Italy", lang: "it_IT" }, { name: "Japanese Japan", lang: "ja_JP" }, { name: "Korean South Korea", lang: "ko_KR" }, { name: "Dutch Netherlands",
    lang: "nl_NL" }, { name: "Polish Poland", lang: "pl_PL" }, { name: "Portuguese Brazil", lang: "pt_BR" }, { name: "Portuguese Portugal", lang: "pt_PT" }, { name: "Russian Russia", lang: "ru_RU" }, { name: "Thai Thailand", lang: "th_TH" }, { name: "Turkish Turkey", lang: "tr_TR" }, { name: "Chinese China", lang: "zh_CN_#Hans" }, { name: "Chinese Hong Kong", lang: "zh_HK_#Hans" }, { name: "Chinese Hong Kong", lang: "zh_HK_#Hant" }, { name: "Chinese Taiwan", lang: "zh_TW_#Hant" }, { name: "Alex" }, { name: "Maged", lang: "ar-SA" }, { name: "Zuzana", lang: "cs-CZ" }, { name: "Sara",
    lang: "da-DK" }, { name: "Anna", lang: "de-DE" }, { name: "Melina", lang: "el-GR" }, { name: "Karen", lang: "en-AU" }, { name: "Daniel", lang: "en-GB" }, { name: "Moira", lang: "en-IE" }, { name: "Samantha (Enhanced)", lang: "en-US" }, { name: "Samantha", lang: "en-US" }, { name: "Tessa", lang: "en-ZA" }, { name: "Monica", lang: "es-ES" }, { name: "Paulina", lang: "es-MX" }, { name: "Satu", lang: "fi-FI" }, { name: "Amelie", lang: "fr-CA" }, { name: "Thomas", lang: "fr-FR" }, { name: "Carmit", lang: "he-IL" }, { name: "Lekha", lang: "hi-IN" }, { name: "Mariska", lang: "hu-HU" }, { name: "Damayanti",
    lang: "id-ID" }, { name: "Alice", lang: "it-IT" }, { name: "Kyoko", lang: "ja-JP" }, { name: "Yuna", lang: "ko-KR" }, { name: "Ellen", lang: "nl-BE" }, { name: "Xander", lang: "nl-NL" }, { name: "Nora", lang: "no-NO" }, { name: "Zosia", lang: "pl-PL" }, { name: "Luciana", lang: "pt-BR" }, { name: "Joana", lang: "pt-PT" }, { name: "Ioana", lang: "ro-RO" }, { name: "Milena", lang: "ru-RU" }, { name: "Laura", lang: "sk-SK" }, { name: "Alva", lang: "sv-SE" }, { name: "Kanya", lang: "th-TH" }, { name: "Yelda", lang: "tr-TR" }, { name: "Ting-Ting", lang: "zh-CN" }, { name: "Sin-Ji", lang: "zh-HK" }, { name: "Mei-Jia",
    lang: "zh-TW" }];a.iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);a.iOS9 = /(iphone|ipod|ipad).* os 9_/.test(navigator.userAgent.toLowerCase());a.is_chrome = -1 < navigator.userAgent.indexOf("Chrome");a.is_safari = -1 < navigator.userAgent.indexOf("Safari");a.is_chrome && a.is_safari && (a.is_safari = !1);a.is_opera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");a.is_android = -1 < navigator.userAgent.toLowerCase().indexOf("android");a.iOS_initialized = !1;a.iOS9_initialized = !1;a.cache_ios_voices = [{ name: "he-IL",
    voiceURI: "he-IL", lang: "he-IL" }, { name: "th-TH", voiceURI: "th-TH", lang: "th-TH" }, { name: "pt-BR", voiceURI: "pt-BR", lang: "pt-BR" }, { name: "sk-SK", voiceURI: "sk-SK", lang: "sk-SK" }, { name: "fr-CA", voiceURI: "fr-CA", lang: "fr-CA" }, { name: "ro-RO", voiceURI: "ro-RO", lang: "ro-RO" }, { name: "no-NO", voiceURI: "no-NO", lang: "no-NO" }, { name: "fi-FI", voiceURI: "fi-FI", lang: "fi-FI" }, { name: "pl-PL", voiceURI: "pl-PL", lang: "pl-PL" }, { name: "de-DE", voiceURI: "de-DE", lang: "de-DE" }, { name: "nl-NL", voiceURI: "nl-NL", lang: "nl-NL" }, { name: "id-ID", voiceURI: "id-ID",
    lang: "id-ID" }, { name: "tr-TR", voiceURI: "tr-TR", lang: "tr-TR" }, { name: "it-IT", voiceURI: "it-IT", lang: "it-IT" }, { name: "pt-PT", voiceURI: "pt-PT", lang: "pt-PT" }, { name: "fr-FR", voiceURI: "fr-FR", lang: "fr-FR" }, { name: "ru-RU", voiceURI: "ru-RU", lang: "ru-RU" }, { name: "es-MX", voiceURI: "es-MX", lang: "es-MX" }, { name: "zh-HK", voiceURI: "zh-HK", lang: "zh-HK" }, { name: "sv-SE", voiceURI: "sv-SE", lang: "sv-SE" }, { name: "hu-HU", voiceURI: "hu-HU", lang: "hu-HU" }, { name: "zh-TW", voiceURI: "zh-TW", lang: "zh-TW" }, { name: "es-ES", voiceURI: "es-ES", lang: "es-ES" }, { name: "zh-CN", voiceURI: "zh-CN", lang: "zh-CN" }, { name: "nl-BE", voiceURI: "nl-BE", lang: "nl-BE" }, { name: "en-GB", voiceURI: "en-GB", lang: "en-GB" }, { name: "ar-SA", voiceURI: "ar-SA", lang: "ar-SA" }, { name: "ko-KR", voiceURI: "ko-KR", lang: "ko-KR" }, { name: "cs-CZ", voiceURI: "cs-CZ", lang: "cs-CZ" }, { name: "en-ZA", voiceURI: "en-ZA", lang: "en-ZA" }, { name: "en-AU", voiceURI: "en-AU", lang: "en-AU" }, { name: "da-DK", voiceURI: "da-DK", lang: "da-DK" }, { name: "en-US", voiceURI: "en-US", lang: "en-US" }, { name: "en-IE", voiceURI: "en-IE", lang: "en-IE" }, { name: "hi-IN",
    voiceURI: "hi-IN", lang: "hi-IN" }, { name: "el-GR", voiceURI: "el-GR", lang: "el-GR" }, { name: "ja-JP", voiceURI: "ja-JP", lang: "ja-JP" }];a.cache_ios9_voices = [{ name: "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", lang: "ar-SA", localService: !0, "default": !0 }, { name: "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", lang: "cs-CZ", localService: !0, "default": !0 }, { name: "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", lang: "da-DK", localService: !0, "default": !0 }, { name: "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact",
    lang: "de-DE", localService: !0, "default": !0 }, { name: "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", lang: "el-GR", localService: !0, "default": !0 }, { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: !0, "default": !0 }, { name: "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", lang: "en-GB", localService: !0, "default": !0 }, { name: "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", lang: "en-IE", localService: !0, "default": !0 }, { name: "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium",
    lang: "en-US", localService: !0, "default": !0 }, { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "en-US", localService: !0, "default": !0 }, { name: "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", lang: "en-ZA", localService: !0, "default": !0 }, { name: "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", lang: "es-ES", localService: !0, "default": !0 }, { name: "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", lang: "es-MX", localService: !0, "default": !0 }, { name: "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact",
    lang: "fi-FI", localService: !0, "default": !0 }, { name: "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", lang: "fr-CA", localService: !0, "default": !0 }, { name: "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", lang: "fr-FR", localService: !0, "default": !0 }, { name: "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", lang: "he-IL", localService: !0, "default": !0 }, { name: "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", lang: "hi-IN", localService: !0, "default": !0 }, { name: "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact",
    lang: "hu-HU", localService: !0, "default": !0 }, { name: "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", lang: "id-ID", localService: !0, "default": !0 }, { name: "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", lang: "it-IT", localService: !0, "default": !0 }, { name: "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", lang: "ja-JP", localService: !0, "default": !0 }, { name: "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", lang: "ko-KR", localService: !0, "default": !0 }, { name: "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact",
    lang: "nl-BE", localService: !0, "default": !0 }, { name: "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", lang: "nl-NL", localService: !0, "default": !0 }, { name: "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", lang: "no-NO", localService: !0, "default": !0 }, { name: "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", lang: "pl-PL", localService: !0, "default": !0 }, { name: "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", lang: "pt-BR", localService: !0, "default": !0 }, { name: "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact",
    lang: "pt-PT", localService: !0, "default": !0 }, { name: "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", lang: "ro-RO", localService: !0, "default": !0 }, { name: "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", lang: "ru-RU", localService: !0, "default": !0 }, { name: "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", lang: "sk-SK", localService: !0, "default": !0 }, { name: "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", lang: "sv-SE", localService: !0, "default": !0 }, { name: "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact",
    lang: "th-TH", localService: !0, "default": !0 }, { name: "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", lang: "tr-TR", localService: !0, "default": !0 }, { name: "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", lang: "zh-CN", localService: !0, "default": !0 }, { name: "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", lang: "zh-HK", localService: !0, "default": !0 }, { name: "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", lang: "zh-TW", localService: !0, "default": !0 }];a.systemvoices = null;a.CHARACTER_LIMIT = 100;a.VOICESUPPORT_ATTEMPTLIMIT = 5;a.voicesupport_attempts = 0;a.fallbackMode = !1;a.WORDS_PER_MINUTE = 130;a.fallback_parts = null;a.fallback_part_index = 0;a.fallback_audio = null;a.fallback_playbackrate = 1;a.def_fallback_playbackrate = a.fallback_playbackrate;a.fallback_audiopool = [];a.msgparameters = null;a.timeoutId = null;a.OnLoad_callbacks = [];a.useTimer = !1;a.utterances = [];a.tstCompiled = function (a) {
    return eval("typeof xy === 'undefined'");
  };a.fallbackServicePath = "https://code.responsivevoice.org/" + (a.tstCompiled() ? "" : "develop/") + "getvoice.php";a.default_rv = a.responsivevoices[0];a.init = function () {
    a.is_android && (a.useTimer = !0);a.is_opera || "undefined" === typeof speechSynthesis ? (console.log("RV: Voice synthesis not supported"), a.enableFallbackMode()) : setTimeout(function () {
      var b = setInterval(function () {
        var c = window.speechSynthesis.getVoices();0 != c.length || null != a.systemvoices && 0 != a.systemvoices.length ? (console.log("RV: Voice support ready"), a.systemVoicesReady(c), clearInterval(b)) : (console.log("Voice support NOT ready"), a.voicesupport_attempts++, a.voicesupport_attempts > a.VOICESUPPORT_ATTEMPTLIMIT && (clearInterval(b), null != window.speechSynthesis ? a.iOS ? (a.iOS9 ? a.systemVoicesReady(a.cache_ios9_voices) : a.systemVoicesReady(a.cache_ios_voices), console.log("RV: Voice support ready (cached)")) : (console.log("RV: speechSynthesis present but no system voices found"), a.enableFallbackMode()) : a.enableFallbackMode()));
      }, 100);
    }, 100);a.Dispatch("OnLoad");
  };a.systemVoicesReady = function (b) {
    a.systemvoices = b;a.mapRVs();null != a.OnVoiceReady && a.OnVoiceReady.call();a.Dispatch("OnReady");window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
  };a.enableFallbackMode = function () {
    a.fallbackMode = !0;console.log("RV: Enabling fallback mode");a.mapRVs();null != a.OnVoiceReady && a.OnVoiceReady.call();a.Dispatch("OnReady");window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
  };a.getVoices = function () {
    for (var b = [], c = 0; c < a.responsivevoices.length; c++) {
      b.push({ name: a.responsivevoices[c].name });
    }return b;
  };a.speak = function (b, c, f) {
    if (a.iOS9 && !a.iOS9_initialized) console.log("Initializing ios9"), setTimeout(function () {
      a.speak(b, c, f);
    }, 100), a.clickEvent(), a.iOS9_initialized = !0;else {
      a.isPlaying() && (console.log("Cancelling previous speech"), a.cancel());a.fallbackMode && 0 < a.fallback_audiopool.length && a.clearFallbackPool();b = b.replace(/[\"\`]/gm, "'");a.msgparameters = f || {};a.msgtext = b;a.msgvoicename = c;a.onstartFired = !1;var h = [];if (b.length > a.CHARACTER_LIMIT) {
        for (var e = b; e.length > a.CHARACTER_LIMIT;) {
          var g = e.search(/[:!?.;]+/),
              d = "";if (-1 == g || g >= a.CHARACTER_LIMIT) g = e.search(/[,]+/);-1 == g && -1 == e.search(" ") && (g = 99);if (-1 == g || g >= a.CHARACTER_LIMIT) for (var k = e.split(" "), g = 0; g < k.length && !(d.length + k[g].length + 1 > a.CHARACTER_LIMIT); g++) {
            d += (0 != g ? " " : "") + k[g];
          } else d = e.substr(0, g + 1);e = e.substr(d.length, e.length - d.length);h.push(d);
        }0 < e.length && h.push(e);
      } else h.push(b);a.multipartText = h;g = null == c ? a.default_rv : a.getResponsiveVoice(c);!0 === g.deprecated && console.warn("ResponsiveVoice: Voice " + g.name + " is deprecated and will be removed in future releases");
      e = {};if (null != g.mappedProfile) e = g.mappedProfile;else if (e.systemvoice = a.getMatchedVoice(g), e.collectionvoice = {}, null == e.systemvoice) {
        console.log("RV: ERROR: No voice found for: " + c);return;
      }1 == e.collectionvoice.fallbackvoice ? (a.fallbackMode = !0, a.fallback_parts = []) : a.fallbackMode = !1;a.msgprofile = e;a.utterances = [];for (g = 0; g < h.length; g++) {
        if (a.fallbackMode) {
          a.fallback_playbackrate = a.def_fallback_playbackrate;var d = a.selectBest([e.collectionvoice.pitch, e.systemvoice.pitch, 1]),
              k = a.selectBest([a.iOS9 ? 1 : null, e.collectionvoice.rate, e.systemvoice.rate, 1]),
              l = a.selectBest([e.collectionvoice.volume, e.systemvoice.volume, 1]);null != f && (d *= null != f.pitch ? f.pitch : 1, k *= null != f.rate ? f.rate : 1, l *= null != f.volume ? f.volume : 1);d /= 2;k /= 2;l *= 2;d = Math.min(Math.max(d, 0), 1);k = Math.min(Math.max(k, 0), 1);l = Math.min(Math.max(l, 0), 1);d = a.fallbackServicePath + "?t=" + encodeURIComponent(h[g]) + "&tl=" + (e.collectionvoice.lang || e.systemvoice.lang || "en-US") + "&sv=" + (e.collectionvoice.service || e.systemvoice.service || "") + "&vn=" + (e.collectionvoice.voicename || e.systemvoice.voicename || "") + "&pitch=" + d.toString() + "&rate=" + k.toString() + "&vol=" + l.toString();k = document.createElement("AUDIO");k.src = d;k.playbackRate = a.fallback_playbackrate;k.preload = "auto";k.load();a.fallback_parts.push(k);
        } else d = new SpeechSynthesisUtterance(), d.voice = e.systemvoice, d.voiceURI = e.systemvoice.voiceURI, d.volume = a.selectBest([e.collectionvoice.volume, e.systemvoice.volume, 1]), d.rate = a.selectBest([a.iOS9 ? 1 : null, e.collectionvoice.rate, e.systemvoice.rate, 1]), d.pitch = a.selectBest([e.collectionvoice.pitch, e.systemvoice.pitch, 1]), d.text = h[g], d.lang = a.selectBest([e.collectionvoice.lang, e.systemvoice.lang]), d.rvIndex = g, d.rvTotal = h.length, 0 == g && (d.onstart = a.speech_onstart), a.msgparameters.onendcalled = !1, null != f ? (g < h.length - 1 && 1 < h.length ? (d.onend = a.onPartEnd, d.hasOwnProperty("addEventListener") && d.addEventListener("end", a.onPartEnd)) : (d.onend = a.speech_onend, d.hasOwnProperty("addEventListener") && d.addEventListener("end", a.speech_onend)), d.onerror = f.onerror || function (a) {
          console.log("RV: Unknow Error");console.log(a);
        }, d.onpause = f.onpause, d.onresume = f.onresume, d.onmark = f.onmark, d.onboundary = f.onboundary || a.onboundary, d.pitch = null != f.pitch ? f.pitch : d.pitch, d.rate = a.iOS ? (null != f.rate ? f.rate * f.rate : 1) * d.rate : (null != f.rate ? f.rate : 1) * d.rate, d.volume = null != f.volume ? f.volume : d.volume) : (d.onend = a.speech_onend, d.onerror = function (a) {
          console.log("RV: Unknow Error");console.log(a);
        }), a.utterances.push(d), 0 == g && (a.currentMsg = d), console.log(d), a.tts_speak(d);
      }a.fallbackMode && (a.fallback_part_index = 0, a.fallback_startPart());
    }
  };a.startTimeout = function (b, c) {
    var f = a.msgprofile.collectionvoice.timerSpeed;null == a.msgprofile.collectionvoice.timerSpeed && (f = 1);if (!(0 >= f)) {
      var h = b.split(/\s+/).length,
          e = (b.match(/[^ ]/igm) || b).length,
          f = 60 / a.WORDS_PER_MINUTE * f * 1E3 * (e / h / 5.1) * h;3 > h && (f = 4E3);3E3 > f && (f = 3E3);a.timeoutId = setTimeout(c, f);
    }
  };a.checkAndCancelTimeout = function () {
    null != a.timeoutId && (clearTimeout(a.timeoutId), a.timeoutId = null);
  };a.speech_timedout = function () {
    a.cancel();a.cancelled = !1;a.speech_onend();
  };a.speech_onend = function () {
    a.checkAndCancelTimeout();
    !0 === a.cancelled ? a.cancelled = !1 : null != a.msgparameters && null != a.msgparameters.onend && 1 != a.msgparameters.onendcalled && (a.msgparameters.onendcalled = !0, a.msgparameters.onend());
  };a.speech_onstart = function () {
    if (!a.onstartFired) {
      a.onstartFired = !0;if (a.iOS || a.is_safari || a.useTimer) a.fallbackMode || a.startTimeout(a.msgtext, a.speech_timedout);a.msgparameters.onendcalled = !1;if (null != a.msgparameters && null != a.msgparameters.onstart) a.msgparameters.onstart();
    }
  };a.fallback_startPart = function () {
    0 == a.fallback_part_index && a.speech_onstart();a.fallback_audio = a.fallback_parts[a.fallback_part_index];if (null == a.fallback_audio) console.log("RV: Fallback Audio is not available");else {
      var b = a.fallback_audio;a.fallback_audiopool.push(b);setTimeout(function () {
        b.playbackRate = a.fallback_playbackrate;
      }, 50);b.onloadedmetadata = function () {
        b.play();b.playbackRate = a.fallback_playbackrate;
      };a.fallback_audio.play();a.fallback_audio.addEventListener("ended", a.fallback_finishPart);a.useTimer && a.startTimeout(a.multipartText[a.fallback_part_index], a.fallback_finishPart);
    }
  };a.fallback_finishPart = function (b) {
    a.checkAndCancelTimeout();a.fallback_part_index < a.fallback_parts.length - 1 ? (a.fallback_part_index++, a.fallback_startPart()) : a.speech_onend();
  };a.cancel = function () {
    a.checkAndCancelTimeout();a.fallbackMode ? (null != a.fallback_audio && a.fallback_audio.pause(), a.clearFallbackPool()) : (a.cancelled = !0, speechSynthesis.cancel());
  };a.voiceSupport = function () {
    return "speechSynthesis" in window;
  };a.OnFinishedPlaying = function (b) {
    if (null != a.msgparameters && null != a.msgparameters.onend) a.msgparameters.onend();
  };a.setDefaultVoice = function (b) {
    b = a.getResponsiveVoice(b);null != b && (a.default_rv = b);
  };a.mapRVs = function () {
    for (var b = 0; b < a.responsivevoices.length; b++) {
      for (var c = a.responsivevoices[b], f = 0; f < c.voiceIDs.length; f++) {
        var h = a.voicecollection[c.voiceIDs[f]];if (1 != h.fallbackvoice) {
          var e = a.getSystemVoice(h.name);if (null != e) {
            c.mappedProfile = { systemvoice: e, collectionvoice: h };break;
          }
        } else {
          c.mappedProfile = { systemvoice: {}, collectionvoice: h };break;
        }
      }
    }
  };a.getMatchedVoice = function (b) {
    for (var c = 0; c < b.voiceIDs.length; c++) {
      var f = a.getSystemVoice(a.voicecollection[b.voiceIDs[c]].name);if (null != f) return f;
    }return null;
  };a.getSystemVoice = function (b) {
    if ("undefined" === typeof a.systemvoices || null === a.systemvoices) return null;for (var c = 0; c < a.systemvoices.length; c++) {
      if (a.systemvoices[c].name == b) return a.systemvoices[c];
    }return null;
  };a.getResponsiveVoice = function (b) {
    for (var c = 0; c < a.responsivevoices.length; c++) {
      if (a.responsivevoices[c].name == b) return a.responsivevoices[c];
    }return null;
  };a.Dispatch = function (b) {
    if (a.hasOwnProperty(b + "_callbacks") && null != a[b + "_callbacks"] && 0 < a[b + "_callbacks"].length) {
      for (var c = a[b + "_callbacks"], f = 0; f < c.length; f++) {
        c[f]();
      }return !0;
    }var h = b + "_callbacks_timeout",
        e = b + "_callbacks_timeoutCount";a.hasOwnProperty(h) || (a[e] = 10, a[h] = setInterval(function () {
      --a[e];(a.Dispatch(b) || 0 > a[e]) && clearTimeout(a[h]);
    }, 50));return !1;
  };a.AddEventListener = function (b, c) {
    a.hasOwnProperty(b + "_callbacks") || (a[b + "_callbacks"] = []);a[b + "_callbacks"].push(c);
  };a.addEventListener = a.AddEventListener;a.clickEvent = function () {
    if (a.iOS && !a.iOS_initialized) {
      console.log("Initializing iOS click event");var b = new SpeechSynthesisUtterance(" ");speechSynthesis.speak(b);a.iOS_initialized = !0;
    }
  };a.isPlaying = function () {
    return a.fallbackMode ? null != a.fallback_audio && !a.fallback_audio.ended && !a.fallback_audio.paused : speechSynthesis.speaking;
  };a.clearFallbackPool = function () {
    for (var b = 0; b < a.fallback_audiopool.length; b++) {
      null != a.fallback_audiopool[b] && (a.fallback_audiopool[b].pause(), a.fallback_audiopool[b].src = "");
    }a.fallback_audiopool = [];
  };"complete" === document.readyState ? a.init() : document.addEventListener("DOMContentLoaded", function () {
    a.init();
  });a.selectBest = function (a) {
    for (var c = 0; c < a.length; c++) {
      if (null != a[c]) return a[c];
    }return null;
  };a.pause = function () {
    a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.pause() : speechSynthesis.pause();
  };a.resume = function () {
    a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.play() : speechSynthesis.resume();
  };a.tts_speak = function (b) {
    setTimeout(function () {
      a.cancelled = !1;speechSynthesis.speak(b);
    }, .01);
  };a.setVolume = function (b) {
    if (a.isPlaying()) if (a.fallbackMode) {
      for (var c = 0; c < a.fallback_parts.length; c++) {
        a.fallback_parts[c].volume = b;
      }for (c = 0; c < a.fallback_audiopool.length; c++) {
        a.fallback_audiopool[c].volume = b;
      }a.fallback_audio.volume = b;
    } else for (c = 0; c < a.utterances.length; c++) {
      a.utterances[c].volume = b;
    }
  };a.onPartEnd = function (b) {
    if (null != a.msgparameters && null != a.msgparameters.onchuckend) a.msgparameters.onchuckend();a.Dispatch("OnPartEnd");b = a.utterances.indexOf(b.utterance);a.currentMsg = a.utterances[b + 1];
  };a.onboundary = function (b) {
    console.log("On Boundary");a.iOS && !a.onstartFired && a.speech_onstart();
  };
},
    responsiveVoice = new ResponsiveVoice();
'use strict';

(function () {
  /**
   * 
   * The smooth scroll when clicking an insite-link
   * Based on Robin Leves smoothScroll answer via http://codepen.io/rleve/pen/iCbgy
   * 
   */
  var smoothScroll = function smoothScroll(anchor, duration, dataID) {

    // Calculate how far and how fast to scroll
    var startLocation = window.pageYOffset;
    var endLocation = anchor.offsetTop;
    var distance = endLocation - startLocation;
    var increments = distance / duration;
    var fullHeight = document.getElementById('main').offsetHeight - window.innerHeight;
    var stopAnimation;

    // Scroll the page by an increment, and check if it's time to stop
    var animateScroll = function animateScroll() {
      window.scrollBy(0, increments);
      stopAnimation();
    };

    // If scrolling down
    if (increments >= 0) {
      // Stop animation when you reach the anchor OR the bottom of the page
      stopAnimation = function stopAnimation() {
        var travelled = window.pageYOffset;
        if (travelled >= endLocation - increments || travelled >= fullHeight) {
          clearInterval(runAnimation);
          window.location.hash = dataID;
        }
      };
    }
    // If scrolling up
    else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function stopAnimation() {
          var travelled = window.pageYOffset;
          if (travelled <= (endLocation - increments || 0)) {
            clearInterval(runAnimation);
            window.location.hash = dataID;
          }
        };
      }

    // Loop the animation function
    var runAnimation = setInterval(animateScroll, 16);
  };

  setTimeout(function () {
    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('a[href^="#"]');

    // For each smooth scroll link
    [].forEach.call(scrollToggle, function (toggle) {

      // When the smooth scroll link is clicked
      toggle.addEventListener('click', function (e) {

        // Prevent the default link behavior
        e.preventDefault();

        // Get anchor link and calculate distance from the top
        var dataID = toggle.getAttribute('href');
        var dataTarget = document.querySelector(dataID);

        // If the anchor exists
        if (dataTarget) {
          // Scroll to the anchor
          smoothScroll(dataTarget, 25, dataID);
        }
      }, false);
    });
  }, 1000);
})();
'use strict';

/**
 *
 * The writer will take text, hide it and then create a fake text-writing animation
 * (via Thibault Jan Beyer @ThibaultBeyer http://thibaultjanbeyer.com)
 *
 * @param  [array] to be looped
 * 
 * @param  {integer} pos            the starting index position in the array (usually starts at 0)
 * 
 * @param  {integer} end            how many times should it loop
 * 
 * @param  {Function} callback      This is what should happen when the run is over
 * 
 * @param  {boolean} del            choose if it should write text or delete text
 * 
 * @param  {boolean} splitter        do you want to split each character?
 * 
 * 
 * example:
 * 
 * myLoop({
 *   cd: 9, // number of iterations
 *   dur: 150, // in ms
 *   cu: 0 // starts to count up at 0 
 * },
 *   (cd, dur, cu) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + cd + '.jpg');
 * });
 */
// write each function that writes each element in an array one by one
function writeEach(arr, pos, end, callback, del, splitter) {
  if (!del) {
    //it loops through each character of the current element position in array
    myLoop({ cd: arr[pos].char.length - 1, dur: 65, cu: 0 }, function (cd, dur, cu) {
      //writes each char
      if (!splitter) {
        arr[pos].el.innerHTML += arr[pos].char[cu];
      } else {
        //handle spaces
        if (arr[pos].char[cu] === ' ') {
          arr[pos].char[cu] = '&nbsp';
        }
        //write with splitter spanners
        arr[pos].el.innerHTML += '<span class="wcc"><span class="wc">' + arr[pos].char[cu] + '</span></span>';
      }
      //run the loop again but with the next position in array
      if (cd === 0 && pos < end) {
        writeEach(arr, ++pos, end, callback, del, splitter);
      }
    });
  } else {
    myLoop({ cd: arr[pos].text.length - 1, dur: 25, cu: 0 }, function (cd, dur, cu) {
      //writes each char
      arr[pos].el.innerHTML = arr[pos].text.slice(0, cd);
      //run the loop again but with the next position in array
      if (cd === 0 && pos > end) {
        writeEach(arr, --pos, end, callback, del);
      }
    });
  }
  //is all elements have been written, unhide the image and the next button
  if (pos === end) {
    callback();
  }
}

// stores and returns an array with objects like so:
// [{el: singleElementObject, text: "Hello", char: ["H","e","l","l","o"]}, {el: singleElementObject, text: "Hello", char: ["H","e","l","l","o"]}]
// also deletes the original text
function getChar(nodes) {
  var array = [];
  for (var i = 0; i < nodes.length; i++) {
    var object = {};
    object.el = nodes[i];
    object.text = nodes[i].textContent;
    object.char = object.text.split('');
    array[i] = object;

    // delete original text
    nodes[i].textContent = '';
  }
  return array;
}