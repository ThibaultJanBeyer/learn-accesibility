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
function mover(elements, target, callback, endCallback){
  // store the x,y coordinates of the target and setup variables
  var xT = target.offsetLeft, yT = target.offsetTop, xE, yE;
  // is there are several elements
  if (elements.length > 0) {
    myLoop({ cd: elements.length - 1, dur: 5, cu: 0 }, (cd, dur, cu) => {
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
        setTimeout(function() {
          elements[cu].style.left = xT + 'px';
          elements[cu].style.top = yT + 'px';
        }, 500);
      }
      if (cd === 0) {
        if(endCallback) { endCallback(); }
      }
    });
  } else {
    // do the same but only on one element
    xE = elements.offsetLeft;
    yE = elements.offsetTop;
    elements.style.left = xE + 'px';
    elements.style.top = yE + 'px';
    if (callback) { callback(elements, xT, yT, xE, yE); }
    else { setTimeout(function() {
      elements.style.left = xT + 'px';
      elements.style.top = yT + 'px';
    }, 500); }
    // note that it doesn’t need an end callback since
    // it is only one element to perfrom the action on
  }     
}
