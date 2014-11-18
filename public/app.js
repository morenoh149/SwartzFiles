/* Globals
*/
var scrollFactor = 10;
var ImageHeight = 1035;
var FontHeight = 16;
var HeaderHeight = 39;
var topScrollCorrection = ((FontHeight + 2 + ImageHeight) * scrollFactor+1);
var hash = window.location.hash;
var datasetEnd = 0;
var datasetStart = 0;
var pageTotalsActual = [104,26,379,4067,190,1,1,1,7,237397,90,259,17,0,254,9,13,547,403,2,533,33,309];
var pageTotals = [104,26,379,4067,190,1,1,1,7,0,90,259,17,0,254,9,13,547,403,2,533,33,309];

/* run javascript code while scrolling
 * responsible for detecting end of content and loading more
 */
window.onscroll = function (ev) {
  var docHeight = document.getElementById('main').offsetHeight;

  var winheight = window.innerHeight;
  winheight = winheight === undefined ? document.documentElement.clientHeight : winheight;

  var scrollpoint = window.scrollY;
  scrollpoint = scrollpoint === undefined ? window.document.documentElement.scrollTop : scrollpoint;

  // run on scroll bottom
  if ((scrollpoint + winheight) >= docHeight) {
    main.innerHTML += nextImageHTML("#part1-" + datasetEnd, scrollFactor);
    datasetEnd += scrollFactor;
  }

  // run on scroll top
  if (scrollpoint === 0) {
    main.innerHTML = nextImageHTML("#part1-"+datasetStart, scrollFactor*-1) + main.innerHTML;
    datasetStart -= scrollFactor;
    if (datasetStart < 1) datasetStart = 1;
    window.setTimeout(function() {
      if (datasetStart !== 1) window.scrollBy(0, topScrollCorrection);
    }, 500);
  }
};

/* generates next anchor+imageTags for injecting into the dom
 * given starting point and delta
 * start values = ["#part1-20", ""]
 * delta values = (-inf, -1], [1, +inf)
 * if no hash -> load first 10 pages
 * if hash -> load [hash, hash+delta]
 * (1, 10) -> [1, 10]
 * (25, 10) -> [25, 35]
 * (1, -10) -> [1, 1]
 * (25, -10) -> [15, 24]
 * (25, -3) -> [22, 24]
 */
function nextImageHTML(start, delta) {
  var dom = '';
  var start = parseStartString(start);
  if (start.part === '') {
    for (var i = 1; i <= delta; i++) {
      dom += '<a id="part1-' + i + '" href="#part1-' + i + '">Part-1-Page' + i + '</a>' +
           '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(i,3) + '.jpg">';
    }
  } else if (validHash(start)) {
    var num = extractPoint(start);
    if (num === 1) {
      // do nothing this is the beginning of the dataset
    } else if (delta > 0) {
      for (var i = num; i < num+delta; i++) {
        dom += '<a id="part1-' + i + '" href="#part1-' + i +'">Part-1-Page' + i + '</a>' +
             '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(i,3) + '.jpg">';
      }
    } else if (delta < 0) {
      var i = num+delta; // a + -(b) = a - b
      if (i < 1) i = 1;
      for (; i < num; i++) {
        dom += '<a id="part1-' + i + '" href="#part1-' + i +'">Part-1-Page' + i + '</a>' +
             '<img src="http://swartzfiles.org/foia-request-001-page-' + zeroFill(i,3) + '.jpg">';
      }
    } else {
      console.log('delta is zero. what do?');
    }
  }
  return dom;
}

/* given start (part, page) and delta
 * return dom to insert
 */
function makeTag(part, page, delta) {
  var partMax = pageTotals[part-1];
  if (page+delta > partMax) {
    // find where we end up in the next part
  } else {
    // add dom as normal
  }
};

/* given a start string,
 * return representative {part,page} pair
 */
function parseStartString(start) {
  var result = /(\d+)-(\d+)/.exec(start);
  if(result.index === 5) {
    return { part: result[1],
             page: result[2]
    };
  } else {
    return { part: '', page: ''};
  }
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

/* validates browser hash
 * we only use it if it fits the format we expect
 * returns boolean
 */
function validHash(str) {
  return str.slice(0,7) === '#part1-' ? true : false;
}

/* parses hash to extract point in dataset
 * "#part1-26" -> 26
 * "" -> 1
 */
function extractPoint(hash) {
  if (hash === '') return 1;
  else return parseInt(hash.slice(7), 10);
}

/* JQuery padded code
 */
$(function() {
  var main = document.getElementById('main');
  if (validHash(hash)) {
    main.innerHTML = nextImageHTML(hash, -3) + nextImageHTML(hash, scrollFactor);
    datasetStart = extractPoint(hash) - 3;
    datasetEnd = extractPoint(hash) + scrollFactor;
  } else {
    main.innerHTML += nextImageHTML('', scrollFactor-1);
    datasetStart = extractPoint('');
    datasetEnd = scrollFactor;
  }
});
