'use strict';

var Console = require('console').Console;
var wrap = require('ansi-wrap');
function gray(message) {
  return wrap(90, 39, message);
}
function blue(message) {
  return wrap(34, 39, message);
}
function yellow(message) {
  return wrap(33, 39, message);
}
function red(message) {
  return wrap(31, 39, message);
}
var timestamp = require('time-stamp');
var supportsColor = require('color-support');
var nodeVersion = require('parse-node-version')(process.version);

var colorDetectionOptions = {
  // If on Windows, ignore the isTTY check
  // This is due to AppVeyor (and thus probably common Windows platforms?) failing the check
  // TODO: If this is too broad, we can reduce it to an APPVEYOR env check
  ignoreTTY: (process.platform === 'win32'),
};

// Needed to add this because node 10 decided to start coloring log output randomly
var console;
if (nodeVersion.major >= 10) {
  // Node 10 also changed the way this is constructed
  console = new Console({
    stdout: process.stdout,
    stderr: process.stderr,
    colorMode: false,
  });
} else {
  console = new Console(process.stdout, process.stderr);
}

function hasFlag(flag) {
  return (process.argv.indexOf('--' + flag) !== -1);
}

function addColor(str) {
  if (hasFlag('no-color')) {
    return str;
  }

  if (hasFlag('color')) {
    return gray(str);
  }

  if (supportsColor(colorDetectionOptions)) {
    return gray(str);
  }

  return str;
}

function getTimestamp() {
  return '[' + addColor(timestamp('HH:mm:ss')) + ']';
}

function debug() {
  var time = getTimestamp();
  process.stdout.write(time + ' ' + gray('[D]') + ' ');
  console.log.apply(console, arguments);
  return this;
}

function info() {
  var time = getTimestamp();
  process.stdout.write(time + ' ' + blue('[I]') + ' ');
  console.info.apply(console, arguments);
  return this;
}

function user() {
  var time = getTimestamp();
  process.stdout.write(time + ' ' + blue('[I]') + ' ');
  console.info.apply(console, arguments);
  return this;
}

function dir() {
  var time = getTimestamp();
  process.stdout.write(time + ' ' + gray('[D]') + ' ');
  console.dir.apply(console, arguments);
  return this;
}

function warn() {
  var time = getTimestamp();
  process.stderr.write(time + ' ' + yellow('[W]') + ' ');
  console.warn.apply(console, arguments);
  return this;
}

function error() {
  var time = getTimestamp();
  process.stderr.write(time + ' ' + red('[E]') + ' ');
  console.error.apply(console, arguments);
  return this;
}

module.exports = function(ve) {
  module.exports.error = error;
  module.exports.user = user;
  if (ve >= 1) {
    module.exports.warn = warn;
  } else {
    module.exports.warn = function() {};
  }
  if (ve >= 2) {
    module.exports.info = info;
  } else {
    module.exports.info = function() {};
  }
  if (ve >= 3) {
    module.exports.dir = dir;
    module.exports.debug = debug;
  } else {
    module.exports.dir = function() {};
    module.exports.debug = function() {};
  }
};
