import loadScript from 'simple-load-script';

const YouTube = (element, media, autoplay = false, options = {}) => {
    let player;
    let interval;
    let _volume = 1;
    let _ended = false;
    let _paused = true;

    const promise = new Promise(resolve => {
        resolve();
    });
    const id = `op-yt__${element.id || new Date().getTime()}`;
    const isAudio = element.tagName === 'AUDIO';
    const opts = {
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
        // custom to inject `-nocookie` element in URL
        nocookie: false,
    };
    const playerVars = { ...opts, ...options };
    const { url: library, nocookie: noCookies } = playerVars;

    delete playerVars.url;
    delete playerVars.nocookie;

    /**
     * Formats:
     * - http://www.youtube.com/watch?feature=player_embedded&v=VIDEO_ID
     * - http://www.youtube.com/v/VIDEO_ID?version=3
     * - http://youtu.be/VIDEO_ID
     * - http://www.youtube-nocookie.com/watch?feature=player_embedded&v=VIDEO_ID
     * - https://youtube.com/watch?v=VIDEO_ID
     * @param {string} url
     * @returns {string}
     */
    function _getYouTubeId(url) {
        return url.match(/(?:(?:youtu\.be\/)|(?:v=)|(?:\/v\/))(\w+)/)[1];
    }

    function _startInterval() {
        // create timer
        interval = setInterval(() => {
            const event = new CustomEvent('timeupdate');
            element.dispatchEvent(event);
        }, 250);
    }
    function _stopInterval() {
        if (interval) {
            clearInterval(interval);
        }
    }

    const playerSettings = {
        id,
        videoId: _getYouTubeId(media.src),
        height: isAudio ? 1 : element.offsetHeight,
        width: isAudio ? 1 : element.offsetWidth,
        playerVars,
        origin: window.location.host,
        events: {
            onReady: e => {
                player = e.target;
                const iframe = player.getIframe();

                // Check for `muted` attribute to start video without sound
                if (element.muted) {
                    player.mute();
                }

                ['mouseover', 'mouseout'].forEach(event => {
                    iframe.addEventListener(event, ev => {
                        const newEvent = new CustomEvent(ev.type);
                        element.dispatchEvent(newEvent);
                    });
                });

                ['loadedmetadata', 'loadeddata', 'canplay'].forEach(event => {
                    const ev = new CustomEvent(event);
                    element.dispatchEvent(ev);
                });
            },
            onStateChange: e => {
                let events = [];

                switch (e.data) {
                    case 0: // YT.PlayerState.ENDED
                        events = ['ended'];
                        _paused = false;
                        _ended = !playerVars.loop;
                        if (!playerVars.loop) {
                            _stopInterval();
                        }
                        break;
                    case 1: // YT.PlayerState.PLAYING
                        events = ['play', 'playing'];
                        _paused = false;
                        _ended = false;
                        _startInterval();
                        break;
                    case 2: // YT.PlayerState.PAUSED
                        events = ['pause'];
                        _paused = true;
                        _ended = false;
                        _stopInterval();
                        break;
                    case 3: // YT.PlayerState.BUFFERING
                        events = ['progress'];
                        _ended = false;
                        break;
                    case 5: // YT.PlayerState.CUED
                        events = ['loadeddata', 'loadedmetadata', 'canplay'];
                        _paused = true;
                        _ended = false;
                        break;
                    default: // not started
                        events = ['loadedmetadata'];
                        _paused = true;
                        _ended = false;
                        break;
                }

                for (let i = 0, total = events.length; i < total; i++) {
                    const event = new CustomEvent(events[i]);
                    element.dispatchEvent(event);
                }
            },
            // @see https://developers.google.com/youtube/iframe_api_reference#onError
            onError: e => {
                let message = '';
                switch (e.data) {
                    case 2:
                        message = `The request contains an invalid parameter value. Verify that video ID has 11 
                            characters and that contains no invalid characters, such as exclamation points or asterisks.`;
                        break;
                    case 5:
                        message = `The requested content cannot be played in an HTML5 player or another error 
                            related to the HTML5 player has occurred.`;
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
                console.error(`YouTube Error: ${message}`);
            }
        }
    };

    function create() {
        if (document.getElementById(id)) {
            return;
        }
        const container = document.createElement('div');
        container.id = id;

        // If `noCookies` feature was enabled, modify original URL
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

        if ((playerVars.loop === 1 || media.src.indexOf('loop=') > -1)
            && !playerVars.playlist && media.src.indexOf('playlist=') === -1) {
            playerVars.playlist = _getYouTubeId(media.src);
        }

        playerVars.controls = 0;
        playerVars.enablejsapi = 1;

        if (typeof YT === 'undefined' || !YT.loaded) {
            loadScript(library);
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

    // @see https://developers.google.com/youtube/iframe_api_reference#Requirements
    window.onYouTubeIframeAPIReady = () => {
        create();
        return new YT.Player(id, playerSettings);
    };

    return Object.freeze({
        promise,
        create,
        load,
        canPlayType,
        play,
        pause,
        destroy,
        set src(source) {
            _source = typeof source === 'string' ? source : source[0].src;

            if (player) {
                const videoId = _getYouTubeId(_source);
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
                setTimeout(() => {
                    const event = new CustomEvent('volumechange');
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
                setTimeout(() => {
                    const event = new CustomEvent('volumechange');
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
                setTimeout(() => {
                    const event = new CustomEvent('timeupdate');
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
    OpenPlayer.addMedia(
        'youtube',
        'video/x-youtube',
        url => (/\/\/(www\.youtube|youtu\.?be)/i.test(url) ? 'video/x-youtube' : null),
        YouTube
    );
}
