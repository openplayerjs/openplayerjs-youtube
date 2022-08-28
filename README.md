![openplayer](https://user-images.githubusercontent.com/910829/46182430-d4c0f380-c299-11e8-89a8-c7554a70b66c.png)

# [OpenPlayer.js - YouTube](https://www.openplayerjs.com)

[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/openplayerjs-youtube/badge)](https://www.jsdelivr.com/package/npm/openplayerjs-youtube)

Now you can play any YouTube videos using the awesome OpenPlayerJS!

## Installation

1. Set the video/audio as indicated in the [OpenPlayerJS installation](https://github.com/openplayerjs/openplayerjs#installation).
2. Set the `type` of your source as `video/x-youtube`.
3. Load this package library right after [OpenPlayerJS](https://github.com/openplayerjs/openplayerjs).
4. And voilá!

## Configuration

It allows you to override YouTube's configuration by using the `youtube` object in the settings. Check [Supported parameters section](https://developers.google.com/youtube/player_parameters#Parameters) for more details.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <video class="op-player__media" id="video" controls playsinline>
        <source src="https://www.youtube.com/watch?v=xcJtL7QggTI" type="video/x-youtube">
    </video>
    <script src="https://cdn.jsdelivr.net/npm/openplayerjs@latest/dist/openplayer.min.js"></script>
    <script src="/path/to/openplayerjs-youtube.min.js"></script>
    <script>
        var player = new OpenPlayer('video', {
            youtube: {
                // config
            }
        });
        player.init();
    </script>
</body>
</html>
```
