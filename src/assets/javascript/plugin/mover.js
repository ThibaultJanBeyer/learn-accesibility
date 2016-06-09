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
 * example:
 * 
 * mover({
 *   cd: 9, // number of iterations
 *   dur: 150, // in ms
 *   cu: 0 // starts to count up at 0 
 * },
 *   (cd, dur, cu) => { // what happens each time
 *     thibaultImgMain.setAttribute('src', 'assets/img/thibault-jan-beyer_' + cd + '.jpg');
 * });
 */
function mover(elements, target, callback){
  // store the x,y coordinates of the target
  var xT = target.offsetLeft;
  var yT = target.offsetTop;

  myLoop({ cd: elements.length -1, dur: 10, cu: 0 }, (cd, dur, cu) => {
    // store the elements coordinate
    var xE = elements[cu].offsetLeft;
    var yE = elements[cu].offsetTop;
    // set the elements position to their position for a smooth animation
    elements[cu].style.left = xE + 'px';
    elements[cu].style.top = yE + 'px';
    // set their position to the target position
    // the animation is a simple css transition
    move(elements[cu], xT, yT, xE, yE, cu);
    
    if (cd === 0) {
      if(callback) { callback(); }
    }
  });
}

function move(element, xT, yT, xE, yE, i) {
  setTimeout(function() {
    // scramble the elements
    if(i % 2 === 0) {
      element.style.left = (xE - Math.floor(Math.random() * 101)) + 'px';
      element.style.top = (yE + Math.floor(Math.random() * 101)) + 'px';
    } else {
      element.style.left = (xE + Math.floor(Math.random() * 101)) + 'px';
      element.style.top = (yE - Math.floor(Math.random() * 101)) + 'px';
    }
    setTimeout(function() {
      // then move one after another towards the door
      element.style.left = xT + 'px';
      element.style.top = yT + 'px';
      element.style.fontSize = '1px';
    }, 500);
  }, 5);
}