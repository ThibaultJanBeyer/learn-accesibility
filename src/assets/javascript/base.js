//.
var LOCATION = window.location.href;
const BODY = document.body;
const WELCOME = document.getElementById('welcome');
const HOME = document.getElementById('home');
const SITE = document.getElementById('site');

const BODYCONTAINER = (WELCOME || HOME ? document.getElementsByClassName('body__container')[0] : undefined);

// Routes
if ( WELCOME ) {
  const BODYCONTAINER = document.getElementsByClassName('body__container')[0];
  const R_WELCOME = true;
} else if ( SITE ) {
  const R_SITE = true;
} else {
  const R_HOME = true;
}
