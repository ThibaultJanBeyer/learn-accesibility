(function(){
/*
 * Script that adds a svg anchor and proper ids and links to those anchors.
 * To all elements with the add-anchor class
 * via Thibault Jan Beyer via http://codepen.io/ThibaultJanBeyer/pen/beeVbJ
 * Common Public *
 */
var svg = '<svg viewBox="153.1 4.9 14 16"><path d="M160.1,4.9c-1,0-1.9,0.8-1.9,1.8c0,0.7,0.5,1.4,1.1,1.6l0,0.9h-5v1h4.9l-0.1,7.1c0,0.1,0,1.6-2,0.6c-2-1-0.9-2.1-0.7-2.2 c-1.2-0.4-2.2-1.4-3.1-2.4c-0.8,1.8,0.7,3.8,0.7,4.1c0.2-0.2,0.5-0.2,0.6-0.1c2,3.1,4.7,2.7,5.4,3.6c0.7-0.9,3.4-0.5,5.4-3.6 c0.2,0,0.4-0.1,0.6,0.1c0.1-0.3,1.6-2.2,0.7-4.1c-0.9,1-1.9,2-3.1,2.4c0.1,0,1.3,1.2-0.7,2.2c-2,1-2-0.4-2-0.6l-0.2-7.1h4.9v-1h-5 l0-0.9c0.6-0.3,1.1-0.9,1.1-1.6C161.9,5.7,161.1,4.9,160.1,4.9z M160.1,6c0.4,0,0.7,0.3,0.7,0.7c0,0.4-0.3,0.7-0.7,0.7 s-0.7-0.3-0.7-0.7C159.4,6.3,159.7,6,160.1,6z"/></svg>';
var anchorElements = document.getElementsByClassName('add-anchor');

// Setup all elements with class "add-anchor" to have the anchor svg and give them the ID equal to their innerText without any special character
for(var i = 0; i < anchorElements.length; i++) {
  var el = anchorElements[i];
  var content = el.innerHTML;
  var contentText = (el.innerText || el.textContent);
  if(contentText.length > 25) { // shorten text if super long
    contentText = contentText.substring(0,25);
  }
  var replaceText = contentText.replace(/[^A-Za-z0-9]/g, '-');
  var anchor = '<a class="anchor" href="#' + replaceText + '" aria-hidden="true">';

  el.innerHTML = anchor + svg + '</a>' + content;
  el.setAttribute('ID', replaceText);
}

// add skiplinks
var anchorSkip = document.getElementsByClassName('anchor--skiplink');
for (var j = 0; j < anchorSkip.length; j++) {
  var elJ = anchorSkip[j];
  var labelSkip = elJ.getAttribute('data-skiplink');

  if(labelSkip.length > 25) { // shorten text if super long
    labelSkip = labelSkip.substring(0,25);
  }
  labelSkip = labelSkip.replace(/[^A-Za-z0-9]/g, '-');

  elJ.setAttribute('href', '#' + labelSkip);
  elJ.setAttribute('data-skiplink', 'used');
}

// add ria-labeledbys
var anchorAria = document.getElementsByClassName('anchor--aria-labelledby');
for (var k = 0; k < anchorAria.length; k++) {
  var elK = anchorAria[k];
  var labelAria = elK.getAttribute('data-aria-labelledby');

  if(labelAria.length > 25) { // shorten text if super long
    labelAria = labelAria.substring(0,25);
  }
  labelAria = labelAria.replace(/[^A-Za-z0-9]/g, '-');

  elK.setAttribute('aria-labelledby', labelAria);
  elK.setAttribute('data-aria-labelledby', 'used');
}

})();
