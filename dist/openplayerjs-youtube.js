(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function () {
  var undef;

  function deleteFromGlobal(name) {
    try {
      delete window[name];
    } catch (e) {
      window[name] = null;
    }
  }

  function getScript(url, options) {
    return new Promise(function (resolve, reject) {
      if (typeof url === 'object') {
        options = url;
        url = options.url;
      }
      if (!options) options = {};
      if (!url) {
        reject('Error: no script url');
        return;
      }
      var script = document.createElement('script');
      var where = (function () {
        if (options.insertInto) {
          return document.querySelector(options.insertInto);
        }
        return options.inBody ? document.body : document.head;
      }());
      if (!where) {
        reject('Error: no DOM element to append script');
        return;
      }
      var attrs = options.attrs;
      var removeScript = options.removeScript;
      var callBackName = options.callBackName;
      for (var attr in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
          script.setAttribute(attr, attrs[attr]);
        }
      }
      if (!callBackName) {
        script.addEventListener('load', function () {
          if (removeScript) where.removeChild(script);
          resolve(removeScript ? undef : script);
        });
      } else {
        window[callBackName] = function (res) {
          if (!res) res = removeScript ? undef : script;
          if (!options.dontRemoveCallBack) deleteFromGlobal(callBackName);
          if (removeScript) where.removeChild(script);
          resolve(res || removeScript ? undef : script);
        };
      }
      script.addEventListener('error', function () {
        where.removeChild(script);
        reject('Error: loading script');
      });
      script.src = url;
      where.appendChild(script);
    });
  }

  // array of urls or array of objects
  function all() {
    if (!arguments.length) return Promise.reject(new Error('No files or no file configs'));
    return Promise.all(Array.prototype.slice.call(arguments).map(function (e) {
      return Array.isArray(e) ? getScript.apply(null, e) : getScript(e);
    }));
  }

  getScript.deleteFromGlobal = deleteFromGlobal;
  getScript.all = all;

  return getScript;
}));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simple_load_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var simple_load_script__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simple_load_script__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



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
    url: 'https://www.youtube.com/player_api',
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

  var playerVars = _objectSpread({}, opts, options);

  var library = playerVars.url,
      noCookies = playerVars.nocookie;
  delete playerVars.url;
  delete playerVars.nocookie;

  function _getYouTubeId(url) {
    return url.match(/(?:(?:youtu\.be\/)|(?:v=)|(?:\/v\/))(\w+)/)[1];
  }

  function _startInterval() {
    interval = setInterval(function () {
      var event = new CustomEvent('timeupdate');
      element.dispatchEvent(event);
    }, 250);
  }

  function _stopInterval() {
    if (interval) {
      clearInterval(interval);
    }
  }

  var playerSettings = {
    id: id,
    videoId: _getYouTubeId(media.src),
    height: isAudio ? 1 : element.offsetHeight,
    width: isAudio ? 1 : element.offsetWidth,
    playerVars: playerVars,
    origin: window.location.host,
    events: {
      onReady: function onReady(e) {
        player = e.target;
        var iframe = player.getIframe();

        if (element.muted) {
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
      simple_load_script__WEBPACK_IMPORTED_MODULE_0___default()(library);
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
      player.setPlaybackRate(value);
    },

    get playbackRate() {
      return player.getPlaybackRate();
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

if (OpenPlayer) {
  OpenPlayer.addMedia('youtube', 'video/x-youtube', function (url) {
    return /\/\/(www\.youtube|youtu\.?be)/i.test(url) ? 'video/x-youtube' : null;
  }, YouTube);
}

/***/ })
/******/ ])["default"];
});