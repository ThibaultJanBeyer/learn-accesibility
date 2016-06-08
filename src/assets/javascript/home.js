(function () { if( R_HOME ){

  BODY.classList.add('lock');
  setTimeout(function() {
    var start = document.getElementsByClassName('start')[0];
    var end = document.getElementsByClassName('end')[0];
    start.classList.add('sr-only');
    end.classList.remove('sr-only');
  }, 10000);

}})();