(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["smooth-script"] = factory();
	else
		root["smooth-script"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./src/SmoothContext.js":
/*!******************************!*\
  !*** ./src/SmoothContext.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SmoothFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothFunctions */ "./src/SmoothFunctions.js");
/* harmony import */ var _SmoothHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmoothHelper */ "./src/SmoothHelper.js");
/* harmony import */ var _SmoothFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SmoothFile */ "./src/SmoothFile.js");
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");
/* harmony import */ var _SmoothExpressions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SmoothExpressions */ "./src/SmoothExpressions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // import expressions from './expressions'



 // Here's a stamp with public methods, and some state:

class SmoothContext {
  // this.predefinedVariables.OPTIONS_NO_BUTTONS = false
  // this.predefinedVariables.OPTIONS_BUTTON_DELAY = 0
  // this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT = false
  // this.predefinedVariables.CURRENT_FACE = ''
  constructor(state) {
    var preamble = {
      text: '',
      preamble: '',
      title: '',
      faces: {},
      firestore: {}
    };

    if (!state) {
      state = JSON.parse(JSON.stringify(preamble));
    }

    preamble.text = state.preamble;
    this.files = {};
    this.defaultFile = new _SmoothFile__WEBPACK_IMPORTED_MODULE_3__["default"](state);
    this.preambleFile = new _SmoothFile__WEBPACK_IMPORTED_MODULE_3__["default"](preamble);
    this.files[SmoothContext.DEFAULT_FILE_NAME] = this.defaultFile;
    this.files[SmoothContext.PREAMBLE_FILE_NAME] = this.preambleFile;
    this.currentFile = SmoothContext.DEFAULT_FILE_NAME;
    this.initialFace = this.defaultFile.initialFace;
    this.functions = {};
    this.functionReturns = [];
    this.variables = {};
    this.lineNumber = 0;
    this.indent = 0;
    this.voices = {}; // Lookup faces by ID (store, chats view)

    this.faces = {}; // Lookup faces by name (player)

    this.faceNameToId = {};
    this.predefinedVariables = {};
    this.options = [];
    this.voice = null;
    this.faceVoice = null;
    this.currentFaceId = null;
    this.recognitionLanguage = null;
    this.evaluationOptions = {
      unattended: false,
      emitEvents: true,
      evaluateVariables: true
    };
    this.htmlOutput = '';
    this.setupPredefinedVariables();
    this.readFunctions(this.defaultFile.functions);
  }

  getLines() {
    var lines = [];

    if (this.currentFile && this.files[this.currentFile]) {
      lines = this.files[this.currentFile].lines;
    }

    return lines;
  }

  getLabels() {
    var labels = {};

    if (this.currentFile && this.files[this.currentFile]) {
      labels = this.files[this.currentFile].labels;
    }

    return labels;
  }

  speechRecognitionBlocked() {
    console.warn('Warning: speech recognition may be blocked.');
  }

  readFunctions(functionLines) {
    var cachedLineNumber = this.lineNumber;

    for (var i = 0; i < functionLines.length; ++i) {
      this.lineNumber = functionLines[i];
      let functionNameAndArgs = null;
      let line = this.getLines()[this.lineNumber];

      if ((functionNameAndArgs = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_4__["default"].functionNameAndArgs.exec(line)) !== null) {
        var functionName = functionNameAndArgs[1];

        if (functionName === 'function') {
          _SmoothFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].execFunc(this, functionName, functionNameAndArgs[2]);
        } else {
          throw new Error('Expected function: ' + line);
        }
      }
    }

    this.lineNumber = cachedLineNumber;
  }

  isLocalStorageAvailable() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('feature_test', 'yes');

        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          return true;
        }
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  setupPredefinedVariables() {
    this.predefinedVariables.OPTIONS_NO_BUTTONS = false; // Hide buttons until delay or wrong answer

    this.predefinedVariables.OPTIONS_BUTTON_DELAY = 0;
    this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT = false;
    this.predefinedVariables.CURRENT_FACE = '';
    this.predefinedVariables.webkitSpeechRecognition = 'webkitSpeechRecognition' in window;
    this.predefinedVariables.webkitSpeechRecognitionPermission = false;

    if (this.isLocalStorageAvailable()) {
      var permission = window.localStorage.getItem('webkitSpeechRecognitionPermission');

      if (permission === null) {
        this.predefinedVariables.webkitSpeechRecognitionPermission = false;
      } else {
        this.predefinedVariables.webkitSpeechRecognitionPermission = permission;
      }

      this.predefinedVariables.localStorageAvailable = true;
    } else {
      this.predefinedVariables.localStorageAvailable = false;
    }

    this.predefinedVariables.numSpeechSynthesisVoices = 0;

    if (typeof speechSynthesis !== 'undefined') {
      this.predefinedVariables.numSpeechSynthesisVoices = speechSynthesis.getVoices().length;
    }

    this.predefinedVariables.LAST_RESPONSE = '';
  }

  processNonFunctionLine(str) {
    str = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_5__["default"].replaceAndEvaluateEscapedExpressions(this, str); // Warning!!  SmoothScript does not do any sanitization of HTML
    // This is a security risk, allowing XSS attacks if you have a site
    // that hosts user-created content.  It is your responsibility to
    // sanitize the content!

    this.htmlOutput += str + '&nbsp;';
    return Promise.resolve();
  }

  outputHTML() {
    var voice = this.voice || this.faceVoice;

    if (voice) {
      // strip HTML tags
      var str = this.htmlOutput.replace(/(<([^>]+)>)/ig, '');
      str = str.replace(/&nbsp;/g, ' ');
      this.htmlOutput = '';

      if (!str.length) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.emitEvent('tts', {
            text: str,
            faceId: this.currentFaceId,
            voice: voice,
            onFinished: () => {
              resolve();
            },
            onError: error => {
              throw new Error(error);
            }
          });
        }, 0);
      });
    } else {
      this.emitEvent('appendHTML', {
        html: this.htmlOutput
      });
      this.htmlOutput = '';
      return Promise.resolve();
    }
  }

  finish() {
    if (this.currentFile !== SmoothContext.PREAMBLE_FILE_NAME) {
      return this.outputHTML().then(() => {
        this.emitEvent('finished');
        return Promise.resolve('finished');
      });
    } else {
      return Promise.resolve();
    }
  }

  playLineFromCurrent(handleResolveDataFn) {
    var lines = this.getLines();

    if (this.lineNumber >= lines.length) {
      return this.finish();
    }

    this.lineNumber = _SmoothHelper__WEBPACK_IMPORTED_MODULE_2__["default"].nextImportantLine(this.lineNumber, this.getLines());

    if (this.lineNumber >= lines.length) {
      return this.finish();
    }

    var playNextLineWhenDone = newLine => {
      this.lineNumber = newLine;
      return this.playLineFromCurrent(handleResolveDataFn);
    };

    if (!handleResolveDataFn) {
      handleResolveDataFn = resolveData => {
        if ('finished' in resolveData && resolveData.finished) {
          return this.finish();
        }

        if ('line' in resolveData) {
          return playNextLineWhenDone(resolveData.line);
        }

        if ('options' in resolveData) {
          // Options should not be returned except for "testing" when handleResolveDataFn is overriden
          throw new Error('Internal Error.');
        }

        throw new Error('Unknown function return promise');
      };
    }

    var line = lines[this.lineNumber];
    let functionNameAndArgs = null;

    if ((functionNameAndArgs = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_4__["default"].functionNameAndArgs.exec(line)) !== null) {
      var functionName = functionNameAndArgs[1];

      if (_SmoothFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].hasFunc(functionName)) {
        var promise = _SmoothFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].execFunc(this, functionName, functionNameAndArgs[2]);

        if (!promise || typeof promise.then !== 'function') {
          throw new Error(functionName + ' failed to return a promise!');
        }

        return promise.then(resolveData => {
          return handleResolveDataFn(resolveData);
        });
      } else {
        throw new Error('Unknown function: ' + functionName);
      }
    } else {
      return this.processNonFunctionLine(line).then(() => {
        return playNextLineWhenDone(this.lineNumber + 1);
      });
    }
  }

  play(handleResolveDataPreambleFn, handleResolveDataFn) {
    this.lineNumber = 0;

    if (this.files[SmoothContext.PREAMBLE_FILE_NAME].lines.length) {
      this.currentFile = SmoothContext.PREAMBLE_FILE_NAME;
      return this.playLineFromCurrent(handleResolveDataPreambleFn).then(() => {
        this.currentFile = SmoothContext.DEFAULT_FILE_NAME;
        this.lineNumber = 0;
        return this.playLineFromCurrent(handleResolveDataFn);
      });
    } else {
      this.currentFile = SmoothContext.DEFAULT_FILE_NAME;
      return this.playLineFromCurrent(handleResolveDataFn);
    }
  }

  emitEvent(name, payload) {
    if (this.evaluationOptions.emitEvents) {
      SmoothContext.eventEmitter.emit(name, payload);
    } else if (payload) {
      if (payload.onFinished) {
        // tts
        payload.onFinished();
      }

      if (payload.onLoaded) {
        // face
        payload.onLoaded();
      }
    }
  }

  setOptions(options) {
    this.options = options;
    this.randomId = Math.random();
    var cachededRandom = this.randomId;

    (cachededRandom => {
      var displayMatchFunction = () => {
        if (!this.predefinedVariables.OPTIONS_NO_BUTTONS && this.randomId === cachededRandom) {
          this.emitEvent('displayMatches', options);
        }
      };

      if (this.predefinedVariables.OPTIONS_NO_BUTTONS || options.hiddenOptions.length || this.recognitionLanguage || this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT) {
        this.emitEvent('startListening', this.recognitionLanguage);
      }

      setTimeout(() => {
        displayMatchFunction();
      }, this.predefinedVariables.OPTIONS_BUTTON_DELAY);
    })(cachededRandom);
  }

  submitInput(input, bIsFinal) {
    var result = this.options.submitInput(input, bIsFinal);

    if (input !== SmoothContext.SILENT_OPTION_STRING) {
      this.predefinedVariables.LAST_RESPONSE = input;
    }

    if (result) {
      this.randomId = Math.random();
      this.lineNumber = result.line;
      this.emitEvent('clearHTML');
      this.indent = _SmoothHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getIndent(this.getLines()[this.lineNumber]);
      this.emitEvent('stopListening');
      this.emitEvent('hideMatches');
      this.options.resolveFunc(result);
    } else if (bIsFinal && !this.predefinedVariables.OPTIONS_NO_BUTTONS) {
      this.emitEvent('displayMatches', this.options);
    }
  }

}

_defineProperty(SmoothContext, "eventEmitter", new events__WEBPACK_IMPORTED_MODULE_0___default.a());

_defineProperty(SmoothContext, "DEFAULT_FILE_NAME", 'DEFAULT_FILE_NAME');

_defineProperty(SmoothContext, "PREAMBLE_FILE_NAME", 'PREAMBLE_FILE_NAME');

_defineProperty(SmoothContext, "SILENT_OPTION_STRING", 'option_silence');

_defineProperty(SmoothContext, "NO_MATCH_OPTION_STRING", 'option_no_match');

_defineProperty(SmoothContext, "HIDDEN_OPTION_STRING", 'option_hidden');

_defineProperty(SmoothContext, "randomId", 0);

/* harmony default export */ __webpack_exports__["default"] = (SmoothContext);

/***/ }),

/***/ "./src/SmoothExpressions.js":
/*!**********************************!*\
  !*** ./src/SmoothExpressions.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");

const SmoothExpressions = {
  'operations': {
    '+': (l, r) => {
      return l + r;
    },
    '-': (l, r) => {
      return l - r;
    },
    '=': (l, r) => {
      return l === r;
    },
    '!=': (l, r) => {
      return l !== r;
    },
    '>=': (l, r) => {
      return l >= r;
    },
    '<=': (l, r) => {
      return l <= r;
    },
    '>': (l, r) => {
      return l > r;
    },
    '<': (l, r) => {
      return l < r;
    },
    '*': (l, r) => {
      return l * r;
    },
    '/': (l, r) => {
      if (r === 0) {
        throw new Error('Divide by zero');
      }

      return l / r;
    },
    '&&': (l, r) => {
      return l && r;
    },
    '||': (l, r) => {
      return l || r;
    }
  },
  'macros': {
    // single-argument functions
    // Add to SmoothSyntax macro regex when adding a new one
    'rand': max => {
      // return a random integer less than the arg specified (or 0)
      return Math.floor(Math.random() * Math.floor(max));
    },
    'length': str => {
      if (!isNaN(str)) {
        str = str.toString();
      }

      return str.length;
    },
    'not': bool => {
      return !bool;
    },
    'isNaN': str => {
      return isNaN(str);
    },
    'int': str => {
      return parseInt(str);
    }
  },
  // take a string starting with an open parenthesis, returns only the part of the string up until the matching ending parenthesis
  // not including the parenthesis
  getParenthesisExpression: function (str) {
    var end = ')';
    var start = '(';
    var count = 0;
    var bInQuote = false;

    if (str[0] !== start) {
      throw new Error('Expected (');
    }

    for (var i = 0; i < str.length; ++i) {
      if (bInQuote) {
        if (str[i] === '"' && str[i - 1] !== '\\') {
          bInQuote = false;
        }
      } else {
        if (str[i] === start) {
          count += 1;
        } else if (str[i] === end) {
          count -= 1;
        } else if (str[i] === '"') {
          bInQuote = true;
        }
      }

      if (count === 0) {
        return str.substring(1, i);
      }
    }

    throw new Error('Could not find matching parenthesis');
  },
  replaceEscapedExpressions: function (context, str) {
    return str.replace(_SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].escapedExpressionGlobal, match => {
      var m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].escapedExpression.exec(match);
      var value = this.evaluate(context, m[1]);
      return value;
    });
  },
  replaceAndEvaluateEscapedExpressions: function (context, str) {
    return str.replace(_SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].escapedExpressionGlobal, match => {
      var m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].escapedExpression.exec(match);
      var value = this.evaluate(context, m[1]);

      if (this.bIsVariable(value, context)) {
        return this.evaluateVariable(value, context);
      }

      return value;
    });
  },
  getQuotedString: function (str, context) {
    var m = str.match(/"(?:[^"\\]|\\.)*"/);

    if (!m) {
      throw new Error('Unterminated string: ' + str);
    }

    return m[0];
  },
  bIsVariable: function (str, context) {
    if (str in context.predefinedVariables || str in context.variables) {
      return true;
    }
  },
  evaluateVariable: function (str, context) {
    if (str in context.predefinedVariables) {
      return context.predefinedVariables[str];
    } else if (str in context.variables) {
      return context.variables[str];
    } else {
      throw new Error('Unkown variable: ' + str);
    }
  },

  evaluateFirstArg(context, expression) {
    let m = null;

    if (!expression) {
      throw new Error('null expression');
    }

    if (expression[0] === '(') {
      // Parenthesis
      try {
        var subExpression = this.getParenthesisExpression(expression);
        var value = this.evaluate(context, subExpression);
        return {
          value: value,
          remainder: expression.substring(subExpression.length + 2).trim()
        };
      } catch (error) {
        throw new Error('Parenthesis error on line: ' + context.lineNumber);
      }
    } else if (expression[0] === '"') {
      // strings
      var str = this.getQuotedString(expression);
      return {
        value: str.substring(1, str.length - 1),
        remainder: expression.substring(str.length).trim()
      };
    } else if ((m = /^[-]?\d+(\.\d+)?/.exec(expression)) !== null) {
      // Numbers
      return {
        value: Number(m[0]),
        remainder: expression.substring(m[0].length).trim()
      };
    } else if ((m = /^(true|false)/.exec(expression)) !== null) {
      // Bool
      return {
        value: m[0] === 'true',
        remainder: expression.substring(m[0].length).trim()
      };
    } else if ((m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].macro.exec(expression)) !== null) {
      // macros functions can only have a single argument according to how we evaluate them here
      value = this.macros[m[1]](this.evaluate(context, m[2]));
      return {
        value: value,
        remainder: expression.substring(m[0].length).trim()
      };
    } else if ((m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].variableName.exec(expression)) !== null) {
      // Variables
      if (this.bIsVariable(m[0], context)) {
        if (context.evaluationOptions.evaluateVariables) {
          return {
            value: this.evaluateVariable(m[0], context),
            remainder: expression.substring(m[0].length).trim()
          };
        }

        return {
          value: 0,
          remainder: expression.substring(m[0].length).trim()
        };
      } else {
        throw new Error('Undefined variable: ' + m[0]);
      }
    }

    throw new Error('Unknown expression value: ' + expression);
  },

  getOperatorString(str) {
    var double = str.substring(0, 2);

    if (double in this.operations) {
      return double;
    } else if (str[0] in this.operations) {
      return str[0];
    }

    throw new Error('Expected operator');
  },

  getArgStringArray(string) {
    if (string.length === 0) {
      return [];
    } // Loop through the argument string, replacing any commas inside of quotes with a unicode full-width comma (U+FF0C)


    var bInQuote = false;
    var replacementCharacter = '，';
    var numReplacements = 0;
    var replacedString = '';

    for (var i = 0; i < string.length; ++i) {
      if (string[i] === '"') {
        bInQuote = !bInQuote;
      }

      if (bInQuote && string[i] === ',') {
        replacedString += replacementCharacter;
        numReplacements += 1;
      } else {
        replacedString += string[i];
      }
    }

    var args = replacedString.split(',');

    for (i = 0; i < args.length; ++i) {
      if (numReplacements > 0) {
        // If there were any full-stop commas in strings, they are now
        // regular commas.  Use an even more obscure unicode character?
        args[i] = args[i].replace('，', ',');
      }

      args[i] = args[i].trim();
    }

    return args;
  },

  getArgArray(context, string) {
    var args = this.getArgStringArray(string);

    for (var i = 0; i < args.length; ++i) {
      args[i] = this.replaceEscapedExpressions(context, args[i]);
      args[i] = this.evaluate(context, args[i]);
    }

    return args;
  },

  evaluate(context, expression) {
    if (expression === undefined) {
      throw new Error('undefined expression');
    }

    expression = expression.trim();
    var argDict = this.evaluateFirstArg(context, expression);
    expression = argDict.remainder;
    var tally = argDict.value;
    var iterations = 1;

    while (expression) {
      var operatorString = this.getOperatorString(expression);
      expression = expression.substring(operatorString.length).trim();
      var nextArgDict = this.evaluateFirstArg(context, expression);
      expression = nextArgDict.remainder; // We don't take into account the order of operations.
      // So  1 + 1 = 2 returns true, but 4 = 2 + 2 simplifies to false + 2 = 2

      tally = this.operations[operatorString](tally, nextArgDict.value);
      iterations += 1;
    }

    if (iterations > 2) {
      console.warn('Use parenthesis to avoid potentially incorrect order of operations on line ' + (context.lineNumber + 1));
    }

    return tally;
  }

};
/* harmony default export */ __webpack_exports__["default"] = (SmoothExpressions);

/***/ }),

/***/ "./src/SmoothFile.js":
/*!***************************!*\
  !*** ./src/SmoothFile.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothHelper */ "./src/SmoothHelper.js");
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");



class SmoothFile {
  constructor(state) {
    this.text = '';
    this.preamble = '';
    this.title = '';
    this.firestore = {};
    this.faces = {};
    this.initialFace = '';

    if (state) {
      this.text = state.text || '';
      this.preamble = state.preamble || '';
      this.lines = [];

      if (this.text.length) {
        this.lines = this.text.split(/\r?\n/); // Warning: dirty hack (can't get Prism to start at line 0)
        // Only do this when we have at least one line so we don't
        // alqays create an empty line.

        this.lines.splice(0, 0, '\n');
      } // Parse the preamble seperately so we can figure out the ids
      // that come from there, and also to preserve the line numbers
      // of the original text
      // this.preamble.match(/[^\r\n]+/g) || []


      this.preambleLines = this.preamble.split(/\r?\n/) || [];
      this.labels = this.parseLabels();
      this.functions = this.parseFunctions();
      this.title = state.title || this.parseTitle(); // create_face commands list all the faces in the story,
      // but they don't include links to files stored in local storage (which would be too long as base64-encoded data).
      // We don't parse the faces completely here, but we maintain the dictionary as
      // it was initialized.

      this.parseFaces();
      this.getInitialFace();
      this.firestore = state.firestore || {};
    }
  }

  getMinimizedJson() {
    var minimized = {
      faces: this.faces,
      title: this.title,
      text: this.text,
      preamble: this.preamble,
      firestore: this.firestore
    };
    return minimized;
  }

  getUpdatedJson() {
    this.parseTitle();
    this.parseFaces();
    return this.getMinimizedJson();
  }

  parseTitle() {
    var regex = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].title;

    for (var i = 0; i < this.lines.length; ++i) {
      var match = regex.exec(this.lines[i]);

      if (match) {
        this.title = match[1];
        return this.title;
      }
    }

    this.title = SmoothFile.getPreviewText(this);
    return this.title;
  }

  parseLabels() {
    var labelRegex = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].label;
    var match;
    var labels = {};

    for (var i = 0; i < this.lines.length; ++i) {
      match = labelRegex.exec(this.lines[i]);

      if (match) {
        labels[match[1]] = i;
      }
    }

    this.labels = labels;
    return this.labels;
  }

  parseFaces(lines) {
    // Get FaceIDs from preamble first
    this.preambleLines = this.preamble.split(/\r?\n/);
    var allLines = this.preambleLines.concat(this.lines);
    this.faces = SmoothFile.getFacesInLines(allLines);
    return this.faces;
  }

  getInitialFace(lines) {
    for (var i = 0; i < this.lines.length; ++i) {
      var match = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].faceWithStringArg.exec(this.lines[i]);

      if (match) {
        this.initialFace = match[1];
        return;
      }
    }
  }

  parseFunctions(lines) {
    this.functions = [];

    for (var i = 0; i < this.lines.length; ++i) {
      var match = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].function.exec(this.lines[i]);

      if (match) {
        this.functions.push(i);
      }
    }

    return this.functions;
  }

  static updateWithLinks(file) {
    var preamble = file.preamble;
    var faceDict = file.faces;
    var preambleLines = preamble.split(/\r?\n/);
    var regex = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].createFaces;
    file.preamble = '';

    for (var i = 0; i < preambleLines.length; ++i) {
      var match = regex.exec(preambleLines[i]);

      if (match) {
        var args = match[1].split(',');

        for (var j = 0; j < args.length; ++j) {
          args[j] = args[j].trim();
        }

        var id = args[0].substring(1, args[0].length - 1); // remove quotes

        var name = args[1].substring(1, args[1].length - 1);

        if (id in faceDict && faceDict[id].apng && faceDict[id].thumb) {
          file.preamble += 'create_face("' + id + '", "' + name + '", "' + faceDict[id].apng + '", "' + faceDict[id].thumb + '")\n';
        }
      } else {
        file.preamble += preambleLines[i] + '\n';
      }
    }
  }

  static getPreviewText(file) {
    if (file.text) {
      return file.text.substr(0, 60);
    }

    return '';
  }

  static getFacesInLines(lines) {
    var faces = {};
    var regex = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_1__["default"].createFaces;

    for (var i = 0; i < lines.length; ++i) {
      var match = regex.exec(lines[i]);

      if (match) {
        var face = _SmoothHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parse_create_face_args(match[1]);
        faces[face.id] = {
          apng: face.apng,
          thumb: face.thumb,
          name: face.name
        };
      }
    }

    return faces;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SmoothFile);

/***/ }),

/***/ "./src/SmoothFunctions.js":
/*!********************************!*\
  !*** ./src/SmoothFunctions.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothExpressions */ "./src/SmoothExpressions.js");
/* harmony import */ var _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothHelper */ "./src/SmoothHelper.js");
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");
/* harmony import */ var _SmoothOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SmoothOptions */ "./src/SmoothOptions.js");



 // A custom error class for syntax errors that we can
// detect without evaluating the context.  These can then
// be flagged early while still on the edit screen.

class SmoothSyntaxError extends Error {
  constructor(...params) {
    super(...params); // Maintains proper stack trace for where our error was thrown (only available on V8)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SmoothSyntaxError);
    }

    this.name = 'SmoothSyntaxError';
  }

}

const SmoothFunctions = {
  currentPromise: null,
  hasFunc: funcName => {
    return '_' + funcName in SmoothFunctions;
  },
  execFunc: (context, funcName, str) => {
    if (funcName === 'create_face') {
      SmoothFunctions.currentPromise = SmoothFunctions['_' + funcName](context, _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].parse_create_face_args(str));
    } else if (funcName === 'create_voice' || funcName === 'label' || funcName === 'title' || funcName === 'var' || funcName === 'function') {
      SmoothFunctions.currentPromise = SmoothFunctions['_' + funcName](context, _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__["default"].getArgStringArray(str));
    } else {
      SmoothFunctions.currentPromise = SmoothFunctions['_' + funcName](context, _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__["default"].getArgArray(context, str));
    }

    return SmoothFunctions.currentPromise;
  },
  // create_face is called from the preamble...and MUST return immediately
  // You can't wait for the face to download here.
  _create_face: (context, face) => {
    context.faces[face.id] = {
      apng: face.apng,
      thumb: face.thumb,
      name: face.name
    };
    context.faceNameToId[face.name] = face.id;

    var onError = () => {
      throw new Error('Could not load face: ' + face.id);
    };

    var initialFace = context.initialFace; // Wait for this command if we are downloading the "initial face" which is the first one
    // to be used as a quotes argument. Otherwise, just start downloading it but don't do anything
    // else.
    // If you have a lot of faces, ideally, one of the first create_face commands would be the
    // initial face, otherwise there may be a lot of current downloads by the time we start
    // waiting for the result.

    var bWaitForLoad = !context.currentFaceId && initialFace === '' || // No intial face was set and this is the first
    initialFace in context.faceNameToId && face.name === initialFace; // This is the initial face

    if (bWaitForLoad) {
      return new Promise((resolve, reject) => {
        var doneLoading = () => {
          context.currentFaceId = face.id;
          context.predefinedVariables.CURRENT_FACE = face.name;

          if (face.name in context.voices) {
            context.faceVoice = context.voices[face.name];
          }

          resolve({
            line: context.lineNumber + 1
          });
        };

        var onWaitLoaded = () => {
          context.emitEvent('faceId', face.id); // Setting timeout to make sure we have time to complete loading the face
          // prior to making it animate.

          setTimeout(() => {
            doneLoading();
          }, 0);
        };

        if (context.evaluationOptions.unattended) {
          doneLoading();
        } else {
          context.emitEvent('requestFace', {
            id: face.id,
            apng: face.apng,
            thumb: face.thumb,
            onLoaded: onWaitLoaded,
            onError: onError
          });
        }
      });
    } else {
      context.emitEvent('requestFace', {
        id: face.id,
        apng: face.apng,
        thumb: face.thumb,
        onLoaded: null,
        onError: onError
      });
      return Promise.resolve({
        line: context.lineNumber + 1
      });
    }
  },
  _create_voice: (context, argArray) => {
    var stringArgs = [];

    for (var i = 0; i < argArray.length; ++i) {
      stringArgs.push(argArray[i].substring(1, argArray[i].length - 1));
    }

    var expectedArguments = 4;

    if (argArray.length === expectedArguments) {
      var name = stringArgs[0];
      var locale = stringArgs[1];
      var gender = stringArgs[2].toLowerCase();
      var voiceNameOrIndex = stringArgs[3];
      var index = 0;
      var voiceName = null;

      if (Number.isInteger(Number(voiceNameOrIndex))) {
        index = Number(voiceNameOrIndex);
      } else {
        voiceName = voiceNameOrIndex;
      }

      var bIsMale = gender === 'male';
      context.voices[name] = {
        locale: locale,
        bIsMale: bIsMale,
        index: index,
        name: voiceName
      };

      if (!context.faceVoice) {
        context.faceVoice = {
          locale: locale,
          bIsMale: bIsMale,
          index: index,
          name: voiceName
        };
      }
    } else {
      throw new SmoothSyntaxError('Expected ' + expectedArguments + ' arguments to create_voice (name, locale, male/female, voiceName/index).');
    }

    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  _face: (context, argArray) => {
    return context.outputHTML().then(() => {
      if (argArray.length === 0) {
        return new Promise((resolve, reject) => {
          context.currentFaceId = null;
          context.emitEvent('faceId', null);
          context.faceVoice = null; // Setting timeout to make sure we have time to complete loading the face
          // prior to making it animate.

          setTimeout(() => {
            resolve({
              line: context.lineNumber + 1
            });
          }, 0);
        });
      }

      if (argArray.length !== 1) {
        throw new SmoothSyntaxError('Expected zero or one arguments to face.');
      } else {
        return new Promise((resolve, reject) => {
          var namedFace = argArray[0];

          if (!(namedFace in context.faceNameToId)) {
            throw new Error('Unknown named face: ' + namedFace + '.');
          }

          if (!context.faceNameToId[namedFace]) {
            throw new Error('context.faceNameToId has null entry for ' + namedFace);
          }

          var faceid = context.faceNameToId[namedFace];

          if (!(faceid in context.faces)) {
            throw new Error(faceid + ' not present in context.faces');
          }

          var face = context.faces[faceid];

          var onError = () => {
            reject(new Error('Could not load face: ' + faceid));
          };

          var onLoaded = () => {
            if (namedFace in context.voices) {
              context.faceVoice = context.voices[namedFace];
            }

            context.predefinedVariables.CURRENT_FACE = namedFace;
            context.currentFaceId = faceid;
            context.emitEvent('faceId', faceid); // Setting timeout to make sure we have time to complete loading the face
            // prior to making it animate.

            setTimeout(() => {
              resolve({
                line: context.lineNumber + 1
              });
            }, 0);
          }; // Request the face so that we get a callback when it is ready.
          // It should have already been requested with create_face


          context.emitEvent('requestFace', {
            id: faceid,
            apng: face.apng,
            thumb: face.thumb,
            onLoaded: onLoaded,
            onError: onError
          });
        });
      }
    });
  },
  _voice: (context, argArray) => {
    return context.outputHTML().then(() => {
      if (argArray.length === 1) {
        var voiceName = argArray[0];

        if (voiceName in context.voices) {
          context.voice = context.voices[voiceName];
        } else {
          throw new Error('unknown voice: ' + voiceName);
        }
      } else if (argArray.length === 0) {
        context.voice = null;
      } else {
        throw new SmoothSyntaxError('Expected zero or one argument to voice.');
      }

      return Promise.resolve({
        line: context.lineNumber + 1
      });
    });
  },
  _title: (context, argArray) => {
    // Handled in SmoothFile construction
    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  _label: (context, argArray) => {
    if (argArray.length === 0) {
      throw new SmoothSyntaxError('Expected label name');
    } // Handled in SmoothFile construction


    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  _option: (context, argArray) => {
    return context.outputHTML().then(() => {
      if (argArray.length === 0) {
        throw new SmoothSyntaxError('Expected at least one argument to option');
      }

      var optionDict = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getOptionTextDict(context, context.lineNumber);
      var optionLinestrings = Object.keys(optionDict);
      var options = new _SmoothOptions__WEBPACK_IMPORTED_MODULE_3__["default"]();

      for (var i = 0; i < optionLinestrings.length; ++i) {
        var optionText = optionDict[optionLinestrings[i]];
        var lineNumber = parseInt(optionLinestrings[i]);
        options.addOption(optionText, lineNumber + 1);
      }

      context.setOptions(options);

      if (context.evaluationOptions.unattended) {
        return Promise.resolve({
          options: optionDict
        });
      }

      return options.promise;
    });
  },
  _if: (context, argArray) => {
    if (argArray.length !== 1) {
      throw new SmoothSyntaxError('Expected single argument to if. Got ' + argArray.length + '.');
    }

    var lines = context.getLines();
    _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].requireIndentIncrease(context, context.lineNumber);
    var lineNumber = context.lineNumber; // Evaluate the if statement

    if (argArray[0]) {
      lineNumber += 1;
    } else {
      // Handle the else
      var possibleElse = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].nextLineAfterBlock(lines, lineNumber);

      if (possibleElse === lines.length) {
        return Promise.resolve({
          finished: true
        });
      }

      var line = lines[possibleElse];
      let m = null;
      lineNumber = possibleElse;

      if ((m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].functionNameAndArgs.exec(line)) != null) {
        if (m[1] === 'else') {
          _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].requireIndentIncrease(context, possibleElse);
          lineNumber = possibleElse + 1;
        }
      }
    }

    return Promise.resolve({
      line: lineNumber
    });
  },
  _else: (context, args) => {
    // search up for if
    var lines = context.getLines();
    var indent = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getIndent(context.getLines()[context.lineNumber]);

    for (var i = context.lineNumber; i >= 0; --i) {
      var newIndent = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getIndent(context.getLines()[i]);

      if (newIndent < indent) {
        throw new SmoothSyntaxError('Else without matching if.  Indentation must match.');
      } else if (newIndent === indent) {
        var match = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].functionNameAndArgs.exec(context.getLines()[i]);

        if (match && match[1] === 'if') {
          _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].requireIndentIncrease(context, context.lineNumber);
          var lineAfterElseBlock = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].nextLineAfterBlock(lines, context.lineNumber);
          return Promise.resolve({
            line: lineAfterElseBlock
          });
        }
      }
    }

    throw new SmoothSyntaxError('Else without matching if');
  },
  _finish: (context, args) => {
    return Promise.resolve({
      finished: true
    });
  },
  _var: (context, stringArray) => {
    var varname = stringArray[0];

    if (stringArray.length < 2) {
      throw new SmoothSyntaxError('Expected two arguments to var. The variable and the assignment');
    }

    if (varname.length === 0) {
      throw new SmoothSyntaxError('Expected variable name');
    }

    if (varname.length && varname[0] === '"') {
      throw new SmoothSyntaxError('variable name must not be enclosed in quotes');
    }

    varname = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__["default"].replaceEscapedExpressions(context, varname);
    var match = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].variableName.exec(varname);

    if (match == null || match[0].length !== varname.length) {
      throw new SmoothSyntaxError('Invalid variable name: ' + varname + '.  Use only a-zA-Z_0-9 and start with a-zA-Z');
    }

    var replacedVariables = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__["default"].replaceEscapedExpressions(context, stringArray[1]);
    var value = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(context, replacedVariables);

    if (varname in context.predefinedVariables) {
      context.predefinedVariables[varname] = value;
    } else {
      context.variables[varname] = value;
    }

    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  _goto: (context, args) => {
    if (args.length !== 1) {
      throw new SmoothSyntaxError('Expected one arguement');
    }

    var labelName = args[0];
    var labels = context.getLabels();

    if (!(labelName in labels)) {
      throw new Error('Unknown label');
    }

    return Promise.resolve({
      line: context.getLabels()[labelName]
    });
  },
  _delay: (context, args) => {
    return context.outputHTML().then(() => {
      if (args.length !== 1) {
        throw new SmoothSyntaxError('Expected one argument to delay');
      }

      var delay = parseInt(args[0]);

      if (isNaN(delay)) {
        throw new SmoothSyntaxError('Expected integer argument to delay');
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            line: context.lineNumber + 1
          });
        }, delay);
      });
    });
  },
  _clear: (context, args) => {
    context.emitEvent('clearHTML');
    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  // Currently, _function can be executed twice for a given line.  Once as part of
  // the intial readFunctions call in the context, and once when we come across it
  // during playback
  _function: (context, argStringArray) => {
    if (argStringArray.length < 1) {
      throw new SmoothSyntaxError('Expected function name argument');
    }

    var lines = context.getLines();
    var funcName = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getSimpleQuotedStringWithoutQuotes(argStringArray[0]);
    var functionEnd = _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].nextLineAfterBlock(context.getLines(), context.lineNumber);
    var line = lines[functionEnd];
    let m = null;

    if ((m = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].functionNameAndArgs.exec(line)) != null) {
      if (m[1] !== 'end') {
        throw new SmoothSyntaxError('end() required after function');
      }
    }

    if (!(funcName in context.functions)) {
      _SmoothHelper__WEBPACK_IMPORTED_MODULE_1__["default"].requireIndentIncrease(context, context.lineNumber);
      var func = {
        line: context.lineNumber + 1,
        file: context.currentFile,
        args: []
      };

      for (var i = 1; i < argStringArray.length; ++i) {
        if (_SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].variableName.exec(argStringArray[i]) == null) {
          throw new SmoothSyntaxError('invalid variable name: ' + argStringArray[i]);
        } // Prevent errors when we are testing for syntax errors


        context.variables[argStringArray[i]] = '';
        func.args.push(argStringArray[i]);
      }

      context.functions[funcName] = func;
    } // Skip over function block and end()


    return Promise.resolve({
      line: functionEnd + 1
    });
  },
  _end: (context, args) => {
    // if (context.bIsTestingForErrors) {
    //  return
    // }
    if (context.functionReturns.length === 0) {
      throw new Error('Unexpected end of function.  No function call to return to.');
    }

    var ret = context.functionReturns.pop();

    if (!(ret.file in context.files)) {
      throw new Error('Unknown file: ' + ret.file);
    } // todo, when we support running functions from different files,
    // load the ret.file


    return Promise.resolve({
      line: ret.line
    });
  },
  _exec: (context, args) => {
    if (args.length === 0) {
      throw new SmoothSyntaxError('exec requires function name argument');
    }

    var funcName = args[0];

    if (!(funcName in context.functions)) {
      throw new Error('unknown function ' + funcName);
    }
    /*
      {
        file: default,
        line: 10,
        args: ['arg1', 'arg2']
      }
    */


    var func = context.functions[args[0]];

    if (func.args.length !== args.length - 1) {
      throw new SmoothSyntaxError(funcName + ' requires ' + func.args.length + ' arguments, but ' + (args.length - 1) + ' are provided.');
    }

    for (var i = 0; i < func.args.length; ++i) {
      context.variables[func.args[i]] = args[i + 1];
    }

    context.functionReturns.push({
      file: context.currentFile,
      line: context.lineNumber + 1
    });
    return Promise.resolve({
      line: func.line
    });
  },
  _recognition: (context, args) => {
    if (args.length === 0) {
      context.recognitionLanguage = null;
    }

    if (!args[0]) {
      context.recognitionLanguage = null;
    }

    if (typeof args[0] !== 'string' || args[0].length < 2) {
      throw new SmoothSyntaxError('If an argument is provided to recognition, it must be a Language code string (e.g. "en-US")');
    }

    context.recognitionLanguage = args[0];
    return Promise.resolve({
      line: context.lineNumber + 1
    });
  },
  _random_face: (context, args) => {
    var faces = Object.keys(context.files[context.currentFile].faces);
    var rand = Math.floor(Math.random() * Math.floor(faces.length));

    if (faces.length) {
      return SmoothFunctions['_face'](context, [faces[rand]]);
    }

    return Promise.resolve({
      line: context.lineNumber + 1
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (SmoothFunctions);

/***/ }),

/***/ "./src/SmoothHelper.js":
/*!*****************************!*\
  !*** ./src/SmoothHelper.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");
/* harmony import */ var _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothExpressions */ "./src/SmoothExpressions.js");


const SmoothHelper = {
  getSimpleQuotedStringWithoutQuotes: function (str) {
    str = str.trim();

    if (str.length < 2) {
      throw new Error('Expected quoted string');
    }

    if (str[0] === '"' && str[str.length - 1] === '"') {
      return str.substring(1, str.length - 1);
    }
  },
  nextImportantLine: function (lineNumber, lines) {
    var numLines = lines.length;

    for (var i = lineNumber; i < numLines; ++i) {
      if (lines[i].trim() && _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].comment.exec(lines[i]) === null) {
        return i;
      }
    }

    return i;
  },
  getIndent: function (str) {
    if (str) {
      return str.search(/\S|$/);
    }

    return 0;
  },
  requireIndentIncrease: function (context, lineNumber) {
    var lines = context.getLines();
    var indent = SmoothHelper.getIndent(lines[lineNumber]);

    if (lineNumber > lines.length - 2) {
      context.lineNumber = lineNumber;
      throw new Error('Can not end on block that requires indent');
    }

    var blockIndent = SmoothHelper.getIndent(lines[lineNumber + 1]);

    if (blockIndent <= indent) {
      context.lineNumber = lineNumber;
      throw new Error('Block requires increased indent');
    }
  },
  lastLineInBlock: function (lines, lineNumber) {
    var indentToMatch = this.getIndent(lines[lineNumber]);
    var cachedLine = lineNumber + 1;

    for (var i = cachedLine; i < lines.length; ++i) {
      i = SmoothHelper.nextImportantLine(i, lines);
      var indent = this.getIndent(lines[i]);

      if (indentToMatch >= indent) {
        return cachedLine;
      }

      cachedLine = i;
    }

    return cachedLine;
  },
  nextLineAfterBlock: function (lines, lineNumber) {
    var indentToMatch = this.getIndent(lines[lineNumber]);

    for (var i = lineNumber + 1; i < lines.length; ++i) {
      i = SmoothHelper.nextImportantLine(i, lines);
      var indent = this.getIndent(lines[i]);

      if (indentToMatch >= indent) {
        return i;
      }
    }

    return i;
  },
  getOptions: function (context, lineNumber) {
    var lines = context.getLines();

    if (lineNumber >= lines.length) {
      throw new Error('Unexpected end to story looking for option');
    }

    var original = this.getIndent(lines[lineNumber]);
    var optionLines = [];
    var nextLineAfterBlock = lineNumber;

    while (nextLineAfterBlock < lines.length) {
      var indent = this.getIndent(lines[nextLineAfterBlock]);

      if (indent < original) {
        return optionLines;
      }

      if (indent === original) {
        if (_SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].optionFunction.exec(lines[nextLineAfterBlock]) === null) {
          // in this case, there is only a single option.
          return optionLines;
        } else {
          optionLines.push(nextLineAfterBlock);
        }
      }

      nextLineAfterBlock = this.nextLineAfterBlock(lines, nextLineAfterBlock);
    }

    return optionLines;
  },
  // Returns {"4": ["Option text at line 4"], "8": ["Option text at line 8", "alternate"]}
  getOptionTextDict: function (context, lineNumber) {
    var options = this.getOptions(context, lineNumber);
    var optionDict = {};

    for (var i = 0; i < options.length; ++i) {
      lineNumber = options[i];
      var line = context.getLines()[lineNumber];
      var args = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getArgArray(context, _SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].functionNameAndArgs.exec(line)[2]);
      optionDict[lineNumber.toString()] = args;
    }

    return optionDict;
  },
  parse_create_face_args: function (args) {
    if (_SmoothSyntax__WEBPACK_IMPORTED_MODULE_0__["default"].escapedExpression.exec(args)) {
      throw new Error('create_face is not allowed to have variables');
    }

    var argArray = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getArgStringArray(args);

    if (argArray.length < 2) {
      throw new Error('create_face requires at least 2 arguments');
    }

    for (var j = 0; j < argArray.length; ++j) {
      if (argArray[j].length === 0 || argArray[j][0] !== '"') {
        throw new Error('Arg ' + j + ' of create_face must be quoted string');
      }
    }

    var id = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getQuotedString(argArray[0]).substring(1, argArray[0].length - 1);
    var name = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getQuotedString(argArray[1]).substring(1, argArray[1].length - 1);
    var apng = '';
    var thumb = '';

    if (argArray.length > 2) {
      apng = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getQuotedString(argArray[2]).substring(1, argArray[2].length - 1);
    }

    if (argArray.length > 3) {
      thumb = _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"].getQuotedString(argArray[3]).substring(1, argArray[3].length - 1);
    }

    return {
      id: id,
      apng: apng,
      thumb: thumb,
      name: name
    };
  }
};
/* harmony default export */ __webpack_exports__["default"] = (SmoothHelper);

/***/ }),

/***/ "./src/SmoothOptions.js":
/*!******************************!*\
  !*** ./src/SmoothOptions.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothContext */ "./src/SmoothContext.js");


class SmoothOptions {
  constructor() {
    this.options = {};
    this.hiddenOptions = [];
    this.displayText = [];
    this.resolveFunc = null;
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
    });
  }

  addOption(textOrArray, lineNumber) {
    var option = {};

    if (Array.isArray(textOrArray)) {
      option.textArray = textOrArray;
    } else {
      option.textArray = [textOrArray];
    }

    option.lineNumber = lineNumber;
    var key = option.textArray[0];
    var lowerCaseKey = key.toLowerCase();

    if (option.textArray.indexOf(_SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].HIDDEN_OPTION_STRING) !== -1 || lowerCaseKey === _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].NO_MATCH_OPTION_STRING || lowerCaseKey === _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].SILENT_OPTION_STRING) {
      this.hiddenOptions.push(key);
    } else {
      this.displayText.push(key);
    }

    for (var i = 0; i < option.textArray.length; ++i) {
      lowerCaseKey = option.textArray[i].toLowerCase();

      if (lowerCaseKey in this.options) {
        this.options[lowerCaseKey].push(option);
      } else {
        this.options[lowerCaseKey] = [option];
      }
    }
  }

  submitInput(str, bIsFinal) {
    str = str.toLowerCase();

    if (bIsFinal && str !== _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].SILENT_OPTION_STRING && !(str in this.options) && _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].NO_MATCH_OPTION_STRING in this.options) {
      str = _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"].NO_MATCH_OPTION_STRING;
    }

    if (str in this.options) {
      var matchingOptions = this.options[str];
      var option = matchingOptions[Math.floor(Math.random() * matchingOptions.length)];
      var result = {
        line: option.lineNumber
      };
      this.resolveFunc(result);
      return result;
    }

    return null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SmoothOptions);

/***/ }),

/***/ "./src/SmoothSyntax.js":
/*!*****************************!*\
  !*** ./src/SmoothSyntax.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// regexes can have capture groups to return the most relevant info
const SmoothSyntax = {
  comment: /^\s*\/\/(.*)/,
  // Comments like this one
  commentPrism: /\s*\/\/.*/,
  functionNameHighlightPrism: /[a-z_]+(?=\s*\([^)]*\))/,
  functionLinePrism: /^\s*[a-z_]+\s*\([^)]*\)/m,
  functionNameAndArgs: /^\s*([a-z_]+)\s*\((.*)\)/,
  // only lower-case and _ in function names
  optionFunction: /^\s*option\s*\((.*)\)/,
  variableName: /([a-zA-Z][a-zA-Z_0-9]*)/,
  escapedExpression: /{{(.*?)}}/,
  escapedExpressionGlobal: /{{(.*?)}}/g,
  escapedExpressionPrism: /{{(.*?)}}/,
  number: /^[-]?\d+(\.\d+)?/,
  // These functions require a single quoted string as arg
  title: /^\s*title\s*\(\s*"(.*)"\s*\)/,
  label: /^\s*label\s*\(\s*"(.*)"\s*\)/,
  // face doesn't require a string arg, but we look for it when guessing
  // at the first face to download.
  faceWithStringArg: /^\s*face\s*\(\s*"(.*)"\s*\)/,
  // Multiple quoted strings as args
  createFaces: /^\s*create_face\s*\(\s*(".*"\s*,\s*".*")\s*\)/,
  function: /^\s*function\s*\(\s*"([^"]*)"/,
  macro: /^(rand|length|not|isNaN|int)\s*\(\s*(\S*)\s*\)/
};
/* harmony default export */ __webpack_exports__["default"] = (SmoothSyntax);

/***/ }),

/***/ "./src/SmoothTest.js":
/*!***************************!*\
  !*** ./src/SmoothTest.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothFunctions */ "./src/SmoothFunctions.js");
/* harmony import */ var _SmoothContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothContext */ "./src/SmoothContext.js");
/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");




class SmoothTest {
  constructor(context) {
    this.ctx = new _SmoothContext__WEBPACK_IMPORTED_MODULE_1__["default"](context.defaultFile.getMinimizedJson());
    this.ctx.evaluationOptions.evaluateVariables = false;
    this.ctx.evaluationOptions.unattended = true;
    this.ctx.evaluationOptions.emitEvents = false;
  }

  getLineError(lineNumber) {
    if (lineNumber >= this.ctx.getLines().length) {
      return 'lineNumber out of range: ' + lineNumber;
    }

    this.ctx.lineNumber = lineNumber;
    var line = this.ctx.getLines()[lineNumber].trim(); // todo: check indent

    let match = null;

    if ((match = _SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].functionNameAndArgs.exec(line)) !== null) {
      var command = match[1];
      var args = match[2];

      if (!_SmoothFunctions__WEBPACK_IMPORTED_MODULE_0__["default"].hasFunc(command)) {
        return 'Unrecognized command: ' + command;
      }

      try {
        // eslint-disable-next-line handle-callback-err
        _SmoothFunctions__WEBPACK_IMPORTED_MODULE_0__["default"].execFunc(this.ctx, command, args).catch(error => {// ignore non-syntax errors
        });
      } catch (error) {
        if (error.name === 'SmoothSyntaxError') {
          return error.message;
        }
      }
    }

    return null;
  }

  getSyntaxLineErrors(lineNumbers, errors) {
    for (var i = 0; i < this.ctx.getLines().length; ++i) {
      var error = this.getLineError(i);

      if (error) {
        lineNumbers.push(i);
        errors.push(error);
      }
    }

    return lineNumbers.length > 0;
  }

  getErrors() {
    return new Promise((resolve, reject) => {
      var lineNumbers = [];
      var errors = [];
      this.getSyntaxLineErrors(lineNumbers, errors);

      if (lineNumbers.length === 0) {
        this.getRuntimeErrors().then(data => {
          resolve(data);
        }).catch(error => {
          console.error(error);
        });
      } else {
        console.log('syntax errors');
        resolve({
          lines: lineNumbers,
          strings: errors
        });
      }
    });
  }

  getRuntimeErrors() {
    var errors = [];
    var lineNumbers = [];
    var originalFunctionLines = [];
    var functionLines = []; // any option not picked is added to the todo dict:
    //   todo keys are line numbers, todo objects are the variables
    // todo: {"2":{"myvar":1}}
    //
    // So in the above example we would start at line 3 after setting the variables.

    var todo = {};
    this.ctx.evaluationOptions.emitEvents = false;
    this.ctx.evaluationOptions.unattended = true;
    this.ctx.evaluationOptions.evaluateVariables = true;

    for (var i = 0; i < this.ctx.getLines().length; ++i) {
      let line = this.ctx.getLines()[i];

      if (_SmoothSyntax__WEBPACK_IMPORTED_MODULE_2__["default"].functionNameAndArgs.exec(line) !== null) {
        functionLines.push(i);
        originalFunctionLines.push(i);
      }
    }

    this.ctx.lineNumber = 0;

    var handleResolveDataFn = resolveData => {
      // remove the 'current' line of the function that sent the resolve data
      functionLines = functionLines.filter(e => {
        return e !== this.ctx.lineNumber;
      });

      var playNextTodo = () => {
        var unfinishedLines = Object.keys(todo);
        var nextLine = unfinishedLines.pop();

        while (nextLine && !functionLines.includes(parseInt(nextLine))) {
          nextLine = unfinishedLines.pop();
        }

        if (!nextLine) {
          // we are actually done.
          return Promise.resolve({
            lines: lineNumbers,
            strings: errors
          });
        }

        functionLines = functionLines.filter(e => {
          return e !== nextLine;
        });
        this.ctx.vars = todo[nextLine];
        this.ctx.lineNumber = parseInt(nextLine);
        delete todo[nextLine];
        return this.ctx.playLineFromCurrent(handleResolveDataFn);
      };

      if ('finished' in resolveData && resolveData.finished) {
        return playNextTodo();
      }

      if ('line' in resolveData) {
        if (originalFunctionLines.includes(resolveData.line) && !functionLines.includes(resolveData.line)) {
          // We've already played that line (a goto) so hit the next todo
          return playNextTodo();
        }

        this.ctx.lineNumber = resolveData.line;
        return this.ctx.playLineFromCurrent(handleResolveDataFn);
      }

      if ('options' in resolveData) {
        // add options to todo
        for (var key in resolveData.options) {
          var optionLine = parseInt(key);

          if (functionLines.includes(optionLine)) {
            // Mark the actual (additional) option line as having been evaluated
            // The first line will have already been removed from the functionLines at the top
            functionLines = functionLines.filter(e => {
              return e !== optionLine;
            }); // Add next line after option to "todo"

            todo[(optionLine + 1).toString()] = JSON.parse(JSON.stringify(this.ctx.variables));
          }
        } // If there was more than one option, it would have been added to the todo.
        // The first option is then evaluated below.


        this.ctx.lineNumber += 1;
        return this.ctx.playLineFromCurrent(handleResolveDataFn);
      }
    };

    return this.ctx.play(null, handleResolveDataFn).then(doneData => {
      return Promise.resolve({
        lines: lineNumbers,
        strings: errors
      });
    }).catch(err => {
      console.error(err);
      errors.push(err);
      lineNumbers.push(this.ctx.lineNumber);
      return Promise.resolve({
        lines: lineNumbers,
        strings: errors
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SmoothTest);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: SmoothContext, SmoothExpressions, SmoothFile, SmoothFunctions, SmoothHelper, SmoothOptions, SmoothSyntax, SmoothTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmoothContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmoothContext */ "./src/SmoothContext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothContext", function() { return _SmoothContext__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothExpressions */ "./src/SmoothExpressions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothExpressions", function() { return _SmoothExpressions__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _SmoothFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmoothFile */ "./src/SmoothFile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothFile", function() { return _SmoothFile__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _SmoothFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SmoothFunctions */ "./src/SmoothFunctions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothFunctions", function() { return _SmoothFunctions__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _SmoothHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SmoothHelper */ "./src/SmoothHelper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothHelper", function() { return _SmoothHelper__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _SmoothOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SmoothOptions */ "./src/SmoothOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothOptions", function() { return _SmoothOptions__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _SmoothSyntax__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SmoothSyntax */ "./src/SmoothSyntax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothSyntax", function() { return _SmoothSyntax__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _SmoothTest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SmoothTest */ "./src/SmoothTest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmoothTest", function() { return _SmoothTest__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ })

/******/ });
});