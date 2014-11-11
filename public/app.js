/* Globals
 */
    // window.scrollTo(0, 1000);

/* run javascript code while scrolling
 * responsible for detecting end of content and loading more
 */
window.onscroll = function (ev) {
  // var docHeight = document.body.offsetHeight;
  // docHeight = docHeight === undefined ? window.document.documentElement.scrollHeight : docHeight;
  var docHeight = document.getElementById('main').offsetHeight;

  var winheight = window.innerHeight;
  winheight = winheight === undefined ? document.documentElement.clientHeight : winheight;

  var scrollpoint = window.scrollY;
  scrollpoint = scrollpoint === undefined ? window.document.documentElement.scrollTop : scrollpoint;

  if ((scrollpoint + winheight) >= docHeight) {
    main.innerHTML += nextImageHTML();
    window.setTimeout(function() {
    }, 3000);
  }
};

/* generates next 10 anchor+imageTags for injecting into the dom
 */
function nextImageHTML() {
  return '<a id="part1-4">Part-1-Page4</a>' +
         '<img src="http://swartzfiles.org/foia-request-001-page-004.jpg">';
}

/* JQuery padded code
 */
$(function() {
  var main = document.getElementById('main');
  console.log(main);
});
