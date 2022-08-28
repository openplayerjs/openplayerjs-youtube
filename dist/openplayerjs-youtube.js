(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 714:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getScript;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var glob = window;
var scripName = 'simpleLoadScript';
var globalCbsName = "_$_".concat(scripName, "CallBacks_$_");
var counter = 0;

var uid = function uid() {
  return "script-".concat(counter++);
};

var type = function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

var typeObj = function typeObj(obj) {
  return type(obj) === 'object';
};

var typeStr = function typeStr(obj) {
  return type(obj) === 'string';
};

var getCallBackObject = function getCallBackObject() {
  glob[globalCbsName] = !typeObj(glob[globalCbsName]) ? {} : glob[globalCbsName];
  return glob[globalCbsName];
};

var placementNode = function placementNode(opts) {
  if (opts.insertInto) {
    return document.querySelector(opts.insertInto);
  }

  return opts.inBody ? document.body : document.head;
};

var createScript = function createScript(opts) {
  var script = document.createElement('script');

  if (opts.attrs && typeObj(opts.attrs)) {
    for (var _i = 0, _Object$keys = Object.keys(opts.attrs); _i < _Object$keys.length; _i++) {
      var attr = _Object$keys[_i];
      script.setAttribute(attr, opts.attrs[attr]);
    }
  }

  return script;
};

var loadCallBack = function loadCallBack(opts) {
  if (opts.callBack && type(opts.callBack) === 'function') {
    opts.callBack();
  }
};

var loadRemoveScript = function loadRemoveScript(removeScript, where, script) {
  if (removeScript) {
    where.removeChild(script);
  }
};

var prepareCallBack = function prepareCallBack(opts) {
  var callBackName = opts.callBackName;
  var url = opts.url;
  return [url, callBackName ? glob : getCallBackObject(), callBackName || uid()];
};

var getScriptDefaults = {
  jsonp: false,
  callBackParamName: 'callback',
  removeScript: false,
  callBackName: null
};

function getScript() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (arguments.length > 1) {
    return Promise.all(Array.prototype.slice.call(arguments).map(getScript));
  }

  var optsTypeStr = typeStr(opts);
  return new Promise(function (resolve, reject) {
    if (!(typeObj(opts) && opts.url || optsTypeStr)) {
      reject('Error: object with url or url string needed');
      return;
    }

    if (optsTypeStr) {
      opts = {
        url: opts
      };
    }

    opts = Object.assign({}, getScriptDefaults, opts);
    var where = placementNode(opts);

    if (!where) {
      reject('Error: no DOM element to append script');
      return;
    }

    var script = createScript(opts);
    var removeScript = opts.removeScript;
    var jsonp = opts.callBackName || opts.jsonp;

    if (!jsonp) {
      script.addEventListener('load', function () {
        loadRemoveScript(removeScript, where, script);
        loadCallBack(opts);
        resolve(removeScript ? undefined : script);
      });
    } else {
      var _prepareCallBack = prepareCallBack(opts),
          _prepareCallBack2 = _slicedToArray(_prepareCallBack, 3),
          url = _prepareCallBack2[0],
          callBackObj = _prepareCallBack2[1],
          callBackName = _prepareCallBack2[2];

      opts.url = url;

      callBackObj[callBackName] = function (res) {
        delete callBackObj[callBackName];
        loadRemoveScript(removeScript, where, script);
        loadCallBack(opts);
        resolve(res || removeScript ? undefined : script);
      };
    }

    script.addEventListener('error', function () {
      where.removeChild(script);
      reject('Error: loading script');
    });
    script.src = opts.url;
    where.appendChild(script);
  });
}

module.exports = exports.default;

/***/ }),

/***/ 416:
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 215:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var objectWithoutPropertiesLoose = __webpack_require__(71);

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 71:
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(215);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(416);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var simple_load_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(714);
/* harmony import */ var simple_load_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(simple_load_script__WEBPACK_IMPORTED_MODULE_2__);


var _excluded = ["url", "nocookie"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var YouTube = function YouTube(element, media) {
  var autoplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var player;
  var interval;
  var _volume = 1;
  var _ended = false;
  var _paused = true;
  var promise = new Promise(function (resolve) {
    resolve();
  });
  var id = "op-yt__".concat(element.id || new Date().getTime());
  var isAudio = element.tagName === 'AUDIO';
  var opts = {
    url: 'https://www.youtube.com/iframe_api',
    autoplay: 0,
    controls: 0,
    disablekb: 1,
    end: 0,
    loop: 0,
    modestbranding: 0,
    playsinline: 0,
    rel: 0,
    showinfo: 0,
    start: 0,
    iv_load_policy: 3,
    nocookie: false
  };

  var playerVars = _objectSpread(_objectSpread({}, opts), options);

  var library = playerVars.url,
      noCookies = playerVars.nocookie,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(playerVars, _excluded);

  function _getYouTubeId(url) {
    return url.match(/(?:(?:youtu\.be\/)|(?:v=)|(?:\/v\/))(\w+)/)[1];
  }

  var _startInterval = function _startInterval() {
    interval = setInterval(function () {
      var event = new CustomEvent('timeupdate');
      element.dispatchEvent(event);
    }, 250);
  };

  var _stopInterval = function _stopInterval() {
    if (interval) {
      clearInterval(interval);
    }
  };

  var playerSettings = {
    id: id,
    videoId: _getYouTubeId(media.src),
    height: isAudio ? 1 : element.offsetHeight,
    width: isAudio ? 1 : element.offsetWidth,
    widget_referrer: window.location.host,
    origin: window.location.host,
    playerVars: rest,
    events: {
      onReady: function onReady(e) {
        player = e.target;
        var iframe = player.getIframe();

        if ('msLaunchUri' in window.navigator && !('documentMode' in document) || /chrome/i.test(window.navigator.userAgent) || element.muted) {
          player.mute();
        }

        ['mouseover', 'mouseout'].forEach(function (event) {
          iframe.addEventListener(event, function (ev) {
            var newEvent = new CustomEvent(ev.type);
            element.dispatchEvent(newEvent);
          });
        });
        ['loadedmetadata', 'loadeddata', 'canplay'].forEach(function (event) {
          var ev = new CustomEvent(event);
          element.dispatchEvent(ev);
        });
      },
      onStateChange: function onStateChange(e) {
        var events = [];

        switch (e.data) {
          case 0:
            events = ['ended'];
            _paused = false;
            _ended = !playerVars.loop;

            if (!playerVars.loop) {
              _stopInterval();
            }

            break;

          case 1:
            events = ['play', 'playing'];
            _paused = false;
            _ended = false;

            _startInterval();

            break;

          case 2:
            events = ['pause'];
            _paused = true;
            _ended = false;

            _stopInterval();

            break;

          case 3:
            events = ['progress'];
            _ended = false;
            break;

          case 5:
            events = ['loadeddata', 'loadedmetadata', 'canplay'];
            _paused = true;
            _ended = false;
            break;

          default:
            events = ['loadedmetadata'];
            _paused = true;
            _ended = false;
            break;
        }

        for (var i = 0, total = events.length; i < total; i++) {
          var event = new CustomEvent(events[i]);
          element.dispatchEvent(event);
        }
      },
      onError: function onError(e) {
        var message = '';

        switch (e.data) {
          case 2:
            message = "The request contains an invalid parameter value. Verify that video ID has 11 \n                            characters and that contains no invalid characters, such as exclamation points or asterisks.";
            break;

          case 5:
            message = "The requested content cannot be played in an HTML5 player or another error \n                            related to the HTML5 player has occurred.";
            break;

          case 100:
            message = 'The video requested was not found. Either video has been removed or has been marked as private.';
            break;

          case 101:
          case 105:
            message = 'The owner of the requested video does not allow it to be played in embedded players.';
            break;

          default:
            message = 'Unknown error.';
            break;
        }

        console.error("YouTube Error: ".concat(message));
      }
    }
  };

  function create() {
    if (document.getElementById(id)) {
      return;
    }

    var container = document.createElement('div');
    container.id = id;

    if (noCookies) {
      media.src = media.src.replace('.com', '-nocookie.com');
    }

    element.parentNode.insertBefore(container, element);
    element.style.display = 'none';

    if (isAudio || element.hasAttribute('playsinline')) {
      playerVars.playsinline = 1;
    }

    if (autoplay) {
      playerVars.autoplay = 1;
    }

    if (element.loop) {
      playerVars.loop = 1;
    }

    if ((playerVars.loop === 1 || media.src.indexOf('loop=') > -1) && !playerVars.playlist && media.src.indexOf('playlist=') === -1) {
      playerVars.playlist = _getYouTubeId(media.src);
    }

    playerVars.controls = 0;
    playerVars.enablejsapi = 1;

    if (typeof YT === 'undefined' || !YT.loaded) {
      simple_load_script__WEBPACK_IMPORTED_MODULE_2___default()(library);
    }

    return this;
  }

  function load() {
    return null;
  }

  function canPlayType(mimeType) {
    return mimeType === 'video/x-youtube';
  }

  function play() {
    player.playVideo();
  }

  function pause() {
    player.pauseVideo();
  }

  function destroy() {
    if (player) {
      player.destroy();
    }
  }

  window.onYouTubeIframeAPIReady = function () {
    create();
    return new YT.Player(id, playerSettings);
  };

  return Object.freeze({
    promise: promise,
    create: create,
    load: load,
    canPlayType: canPlayType,
    play: play,
    pause: pause,
    destroy: destroy,

    set src(source) {
      _source = typeof source === 'string' ? source : source[0].src;

      if (player) {
        var videoId = _getYouTubeId(_source);

        if (autoplay) {
          player.loadVideoById(videoId);
        } else {
          player.cueVideoById(videoId);
        }
      }
    },

    get src() {
      if (player) {
        return player.getVideoUrl();
      }

      return '';
    },

    set volume(value) {
      _volume = value;

      if (player) {
        player.setVolume(value * 100);
        setTimeout(function () {
          var event = new CustomEvent('volumechange');
          element.dispatchEvent(event);
        }, 50);
      }
    },

    get volume() {
      if (player) {
        _volume = player.getVolume() / 100;
      }

      return _volume;
    },

    set muted(value) {
      if (player) {
        if (value) {
          player.mute();
        } else {
          player.unMute();
        }

        setTimeout(function () {
          var event = new CustomEvent('volumechange');
          element.dispatchEvent(event);
        }, 50);
      }
    },

    get muted() {
      if (player) {
        return player.isMuted();
      }

      return false;
    },

    set playbackRate(value) {
      if (player) {
        player.setPlaybackRate(value);
      }
    },

    get playbackRate() {
      return player ? player.getPlaybackRate() : 1;
    },

    set defaultPlaybackRate(value) {
      if (player) {
        player.setPlaybackRate(value);
      }
    },

    get defaultPlaybackRate() {
      return player ? player.getPlaybackRate() : 1;
    },

    set currentTime(value) {
      if (player) {
        player.seekTo(value);
        setTimeout(function () {
          var event = new CustomEvent('timeupdate');
          element.dispatchEvent(event);
        }, 50);
      }
    },

    get currentTime() {
      if (player) {
        return player.getCurrentTime();
      }

      return 0;
    },

    get duration() {
      if (player) {
        return player.getDuration();
      }

      return 0;
    },

    get paused() {
      return _paused;
    },

    get ended() {
      return _ended;
    }

  });
};

if (OpenPlayerJS) {
  OpenPlayerJS.addMedia('youtube', 'video/x-youtube', function (url) {
    return /\/\/(www\.youtube|youtu\.?be)/i.test(url) ? 'video/x-youtube' : null;
  }, YouTube);
}
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});