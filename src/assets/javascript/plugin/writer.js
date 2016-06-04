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
  if(!del){
    //it loops through each character of the current element position in array 
    myLoop({ cd: arr[pos].char.length -1, dur: 100, cu: 0 }, (cd, dur, cu) => {
      //writes each char
      if(!splitter) {
        arr[pos].el.innerHTML += arr[pos].char[cu];
      } else {
        //handle spaces
        if(arr[pos].char[cu] === ' ') { arr[pos].char[cu] = '&nbsp'; }
        //write with splitter spanners
        arr[pos].el.innerHTML += '<span class="wcc"><span class="wc">' + arr[pos].char[cu] + '</span></span>';
      }
      //run the loop again but with the next position in array 
      if(cd === 0 && pos < end) { writeEach(arr, ++pos, end, callback, del, splitter); }
    });
  } else {
    myLoop({ cd: arr[pos].text.length -1, dur: 50, cu: 0 }, (cd, dur, cu) => {
      //writes each char
      arr[pos].el.innerHTML = arr[pos].text.slice(0, cd);
      //run the loop again but with the next position in array 
      if(cd === 0 && pos > end) { writeEach(arr, --pos, end, callback, del); }
    });
  }
  //is all elements have been written, unhide the image and the next button
  if(pos === end ){
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
