/**
 * utility.js
 * version: 20171203v3
 */

/** -------------------------------------------------------
 * 注意：Array.prototype.XXX 會影響某些網站，別用！
 ** -------------------------------------------------------*/

/**
 * *****************************************************************
 * String extension
 *******************************************************************/

/**
 * format string
 * (Ex) 'Hello {0}, {1}!'.format('World', 'aaa');  --> return 'Hello World, aaa!'
 */
String.prototype.aplFormat = function () {
  var msg = this;
  // The = operator does not make a copy of the data.
  // The = operator creates a new reference to the same data.
  // javascript - Copy a variable's value into another - Stack Overflow - https://goo.gl/rqtMn8
  var i, rx;
  for (i = 0; i < arguments.length; i += 1) {
    rx = new RegExp('\\{' + i + '\\}', 'g');
    msg = msg.replace(rx, arguments[i]);
  }
  return msg;
};

/**
 * 將字串編為hash code
 * (Ex) var hash = "abc".aplHash()
 */
String.prototype.aplHash = function () {
  var hash = 0,
    i, chr;
  if (this.length === 0) {
    return hash;
  }
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * *****************************************************************
 * Utility
 *******************************************************************/
var APLTOOL = {};

/**
 * return a random digital string
 * Usage:
 *       var s = hash();
 *       var s = hash(5);
 */
APLTOOL.hash = function (length) {
  var len = length;
  if (length === undefined) {
    len = 20;
  }
  var s = '';
  while (s.length < len) {
    s += Math.random()
      .toString()
      .replace('0.', '');
  }
  s = s.substr(0, len);
  return s;
};

// Clone object: (note) don't use this function, IE will be error!
// What is the most efficent way to clone a JavaScript object? - Stack Overflow
// http://stackoverflow.com/questions/122102/what-is-the-most-efficent-way-to-clone-a-javascript-object

/* Note: 必須原始網站沒有限制CSP(Content Security Policy)才能允許引用其它domain之js
 * Usage:
 *  addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');
 */
APLTOOL.addScript = function (url) {
  try {
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = url;
    document.body.appendChild(scriptElement);
  } catch (err) {
    console.log(err);
  } // unable to catch exception if blocked by CSP, but can see error in console
};

/* Usage:
 * loadFile("myscript.js", "js")    //dynamically load and add this .js file
 * loadFile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
 * loadFile("mystyle.css", "css")   //dynamically load and add this .css file
 */
APLTOOL.loadFile = function (filename, filetype) {
  var fileref;
  if (filetype === 'js') { // if filename is a external JavaScript file
    fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', filename);
  } else if (filetype === 'css') { // if filename is an external CSS file
    fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', filename);
  }
  if (typeof fileref !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(fileref);
    return true;
  } else {
    return false;
  }
};

/**
 * Usage:
 * if you have a function aFunction(a, b){ return true; }
 *  you can convert it to string and add to the page:
 *    var s = " " + aFunction; // convert to string
 *    addScriptCode(s);        // add to the page
 *
 *  you can also add a function variable
 *    addScriptCode(aFunction);
 */
APLTOOL.addScriptCode = function (code) {
  // inject my code in page
  var str = '';
  if (typeof code !== 'string') {
    str = String(code); // convert to string
  } else {
    str = code;
  }

  var script = document.createElement('script');
  script.appendChild(document.createTextNode(str));
  (document.body || document.head || document.documentElement)
  .appendChild(script);
};

/* Usage:
 *  var v = getUrlParam('p1'); // (Ex) http://foo.bar/somepage?p1=abc&p2=def..., the value of v will be "abc"
 */
APLTOOL.getUrlParam = function (param) {
  var result = '';
  var tmp = [];
  var items = [];
  if (location.hash.indexOf('?') > 0) { // hash = "#actor?p=hello"
    items = location.hash.substr(location.hash.indexOf('?') + 1)
      .split('&');
  } else {
    items = location.search.substr(1)
      .split('&');
  }
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split('=');
    if (tmp[0] === param) {
      result = decodeURIComponent(tmp[1]);
    }
  }
  return result;
};

/*
 * Check if inside an iframe
 */
APLTOOL.inIframe = function () {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

/**
 *  Usage:
 *  myLog.init('TW116'); // before you use myLog, set the title of your script.
 *  myLog.log('hello world!'); // print any message you want, then it will display in chrome console.
 */
APLTOOL.myLog = {
  title: 'YOUR_SCRIPT',
  init: function (title) {
    // console.log(this.title);
    this.title = title;
    APLTOOL.myLog.log('start...');
    return this.title;
  },
  log: function (text) {
    try {
      var d = new Date();
      var n = d.toLocaleString();
      var s = n + ' [' + this.title + '] ' + text;
      console.log(s);
      return s;
    } catch (err) {
      // console.log(err);
    }
  }
};

/**
 * shortcut for APLTOOL.myLog.log()
 * 
 * @param {any} text 
 */
function log(text) {
  APLTOOL.myLog.log(text);
}


// global variable
APLTOOL.gURL = window.location.href.toLowerCase();
