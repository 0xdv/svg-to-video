export default Recorder

function Recorder(options) {
    this.options = options
    this.timer = null
    this.queue = null
    this.frame = 0
    this.container = options.container

    let canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height

    this.context = canvas.getContext('2d')

    let stream = canvas.captureStream()
    this.recorder = new MediaRecorder(stream, {
        mimeType: options.videoFormat,
        bitsPerSecond: options.bitrate,
    })

    let data = []

    this.recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
            data.push(event.data)
        }
    }

    this.recorder.onstop = () => {
        let url = URL.createObjectURL(new Blob(data, { type: options.videoFormat }))

        this.container.innerHTML = ''

        let video = document.createElement('video')
        video.src = url
        video.controls = true
        video.autoplay = options.autoplay
        this.container.appendChild(video)
    }

    this.drawImg = (t, cb) => {
        let el = this && this.options.drawScene(t)
        let serialized = new XMLSerializer().serializeToString(el)
        let blob = new Blob([serialized], {type: 'image/svg+xml'})
        let url = URL.createObjectURL(blob)

        let img = new Image()
        img.src = url
        img.onload = function() {
            cb(null, img)
        }
    }

    return this
}

Recorder.prototype.record = function() {
    this.queue = window.d3.queue(1)
    this.timer = setInterval(() => {
        this.queue.defer(this.drawImg, this.frame++)
    }, 1000 / this.options.fps)
}

Recorder.prototype.stop = function(cb) {
    clearInterval(this.timer)
    console.log('frames = ', this.frame)

    this.queue.awaitAll((err, frames) => {
        if (err) throw err

        let width = this.options.width
        let height = this.options.height
        let context = this.context
        let recorder = this.recorder

        recorder.start()

        ;(function processFrame() {
            if (frames.length) {
                context.drawImage(frames.shift(), 0, 0, width, height)
                requestAnimationFrame(processFrame)
            } else {
                recorder.stop()
                cb(null)
            }
        })()

    })
}
