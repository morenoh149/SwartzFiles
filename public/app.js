/* Globals
 */
// window.scrollTo(0, 1000);
// window.scrollBy(0, 1000);
var scrollFactor = 10;
var ImageHeight = 1035;
var FontHeight = 16;
var HeaderHeight = 39;
var topScrollCorrection = ((FontHeight + 2 + ImageHeight) * scrollFactor) - HeaderHeight - 300;
var startPoint = window.location.hash

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

  // run on scroll bottom
  if ((scrollpoint + winheight) >= docHeight) {
    main.innerHTML += nextImageHTML(scrollFactor);
    window.setTimeout(function() {
    }, 3000);
  }

  // run on scroll top
  if (scrollpoint === 0) {
    main.innerHTML = nextImageHTML(scrollFactor) + main.innerHTML;
    window.setTimeout(function() {
      console.log('try to scroll correct');
      window.scrollTo(0, topScrollCorrection);
    }, 100);
  }
};

/* generates next anchor+imageTags for injecting into the dom
 * given starting point and delta
 */
function nextImageHTML(start, delta) {
  var str = '';
  if (start === 0) {
    for (var i = 0; i < delta; i++) {
      str += '<a id="part1-' + i + '">Part-1-Page' + i + '</a>' +
           '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(i,3) + '.jpg">';
    }
  } else {
    var num = parseInt(start.slice(7), 10);
    var j = num - 3 < 0 ? 0 : num - 3;
    var end = j + delta;
    for (; j < end; j++) {
      str += '<a id="part1-' + j + '">Part-1-Page' + j + '</a>' +
           '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(j,3) + '.jpg">';
    }
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

/* sanitizes browser hash
 * we only use it if it fits the format we expect
 */
function sanitizeHash(str) {
  return str.slice(0,7) === '#part1-' ? true : false;
}

/* JQuery padded code
 */
$(function() {
  var main = document.getElementById('main');
  if (sanitizeHash(window.location.hash)) {
    console.log('starting point middle load buffers');
    main.innerHTML = nextImageHTML(window.location.hash, scrollFactor);
  } else {
    console.log('starting point origin load beginning');
    main.innerHTML += nextImageHTML(0, scrollFactor);
  }
});
