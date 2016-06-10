//.
const BODY = document.getElementsByTagName('body')[0];
const WELCOME = document.getElementById('welcome');
var MOUSE = {};
var LOCATION = window.location.href;

// Routes
if ( LOCATION.indexOf('home') >= 0 ) {
  const R_HOME = true;
} else if ( LOCATION.indexOf('visual') >= 0 ) {
  const R_SITE = true;
} else {
  const R_WELCOME = true;
}
