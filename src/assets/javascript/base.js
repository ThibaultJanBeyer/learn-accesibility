//.
const BODY = document.getElementsByTagName('body')[0];
const WELCOME = document.getElementById('welcome');
var MOUSE = {};

// Routes
if ( window.location.href.indexOf('home') >= 0 ) {
  const R_HOME = true;
} else {
  const R_WELCOME = true;
}
