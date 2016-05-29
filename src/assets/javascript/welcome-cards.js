/*
 * A card was selected
 */
(function () {
  //start

  // get all fly cards
  var fly = document.getElementsByClassName('fly');

  // for every fly card
  [...fly].forEach((el) => {
    let element = el;

    el.addEventListener('click', () => {
      // save the flyable elements
      let flyOut = element.getElementsByClassName('fly--out');

      // let each flyable element fly out (by removing its fly--in)
      [...flyOut].forEach((el) => {
        el.classList.remove('fly--in');
      });
      // afterwards
      setTimeout(() => {

        // trigger the cards animation (go big)
        element.classList.add('welcome__card--out');
        // lock the view
        BODY.classList.add('lock');
      }, 400);
    });
  });

  //end
})();
