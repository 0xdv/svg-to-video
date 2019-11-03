export default config => {
    let {
        drawScene,
        width,
        height,
        fps = 60,
        bitrate = 50000000,
        videoFormat = "video/webm",
        outputContainer = document.querySelector('body'),
        autoplay = true,
    } = config

    let div = document.createElement('div')
    div.id = "videoContainer"

    outputContainer.appendChild(div)

    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    let context = canvas.getContext("2d")

    let data = [],
        stream = canvas.captureStream(),
        recorder = new MediaRecorder(stream, { mimeType: videoFormat, bitsPerSecond: bitrate });

    recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
            data.push(event.data);
        }
    }

    recorder.onstop = () => {
        let url = URL.createObjectURL(new Blob(data, { type: videoFormat }));

        div.innerHTML = ''

        let video = document.createElement('video')
        video.src = url
        video.controls = true
        video.autoplay = autoplay
        div.appendChild(video)
    }

    let timer = null
    let queue = null
    let frame = 0

    let status, recordBtn, stopBtn

    function menu() {
        let body = document.querySelector('body')

        let panel = document.createElement('div')
        panel.style.position = 'fixed'
        panel.style.right = '4px'
        panel.style.bottom = 0
        panel.style['background-color'] = '#21212121'
        panel.style['z-index'] = 42
        panel.style.margin = '5px'
        body.appendChild(panel)

        status = document.createElement('span')
        status.textContent = 'Ready'
        status.style.margin = '5px'
        panel.appendChild(status)

        recordBtn = document.createElement('button')
        recordBtn.textContent = 'Record'
        recordBtn.style.margin = '5px'
        panel.appendChild(recordBtn)

        stopBtn = document.createElement('button')
        stopBtn.textContent = 'Stop'
        stopBtn.style.margin = '5px'
        stopBtn.disabled = true
        panel.appendChild(stopBtn)
    }

    function drawImg(t, cb) {
        let domEl = drawScene(t)
        
        let serialized = new XMLSerializer().serializeToString(domEl)
        let blob = new Blob([serialized], {type: "image/svg+xml"})
        let url = URL.createObjectURL(blob)

        let img = new Image()
        img.src = url
        img.onload = function() {
            cb(null, img)
        }
    }

    function init() {
        console.log('init')
        menu()

        recordBtn.onclick = function(e) {
            status.textContent = 'Recording...'
            stopBtn.disabled = false
            this.disabled = true
            frame = 0

            timer = setInterval(() => {
                queue.defer(drawImg, frame++)
            }, 1000 / fps)
            queue = d3.queue(1)
        }

        stopBtn.onclick = function(e) {
            status.textContent = 'Rendering...'
            this.disabled = true

            clearInterval(timer)
            console.log("frames = ", frame)

            queue.awaitAll(function(err, frames) {
                if(err) throw err
    
                recorder.start()
    
                ;(function processFrame() {
                    if (frames.length) {
                        context.drawImage(frames.shift(), 0, 0, width, height);
                        requestAnimationFrame(processFrame)
                    } else {
                        recorder.stop()
                        status.textContent = 'Done'
                        recordBtn.disabled = false
                    }
                })()
    
            })
        }
        

    }

    init()
}