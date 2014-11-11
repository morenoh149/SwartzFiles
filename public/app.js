/* Globals
 */
// window.scrollTo(0, 1000);
var scrollFactor = 10;

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
    main.innerHTML += nextImageHTML(scrollFactor);
    window.setTimeout(function() {
    }, 3000);
  }
};

/* generates next anchor+imageTags for injecting into the dom
 * aggresivity controlled by delta
 */
function nextImageHTML(delta) {
  var str = '';
  for (var i = 0; i < delta; i++) {
    str += '<a id="part1-' + i + '">Part-1-Page' + i + '</a>' +
         '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(i,3) + '.jpg">';
  }
  return str;
}

/* accepts a number and magnitude
 * returns a zerofilled string representation
 * zeroFill(1,5) -> '00001'
 * zeroFill(100,5) -> '00100'
 */
function zeroFill(num, mag) {
  var result = '' + num;
  mag -= result.length;
  while(mag > 0) {
    result = '0' + result;
    mag--;
  }
  return result;
}

/* JQuery padded code
 */
$(function() {
  var main = document.getElementById('main');
  console.log(main);
});
