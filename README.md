# OpenPlayerJS - YouTube extension

Play YouTube videos using OpenPlayerJS.

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
        var player = new OpenPlayer('video', null, false, {
            youtube: {
                // config
            }
        });
        player.init();
    </script>
</body>
</html>
```
