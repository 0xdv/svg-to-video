# svg-to-video
This is tool for capturing interations on svg images to videos in the browser.

It based on `MediaRecorder API` and provides UI on page.

## [live demo](https://0xdv.github.io/svg-to-video/)

## Usage
1. load script on page
```html
<script src="https://unpkg.com/svg-to-video"></script>
```
2. select element to capture and init recorder
```html
<script>
    let svg = document.querySelector('svg')

    svgToVideo.init({
        drawScene: () => svg,
        width: 600,
        height: 200,
    })
</script>
```
[See full example](https://github.com/0xC0FFEEC0DE/svg-to-video/blob/master/demo/index.html)
