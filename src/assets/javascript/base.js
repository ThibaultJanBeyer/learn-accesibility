//.
const BODY = document.body;
const BODYCONTAINER = document.getElementsByClassName('body__container')[0]; 
const WELCOME = document.getElementById('welcome');
var LOCATION = window.location.href;

// Routes
if ( LOCATION.indexOf('welcome') >= 0 ) {
  const R_WELCOME = true;
} else if ( LOCATION.indexOf('visual') >= 0 ||
LOCATION.indexOf('vision') >= 0 ||
LOCATION.indexOf('physical') >= 0 ||
LOCATION.indexOf('cognitive') >= 0 ) {
  const R_SITE = true;
  
} else {
  const R_HOME = true;
}
