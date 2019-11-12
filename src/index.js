import Recorder from './recorder'

export function init(options) {
    let {
        drawScene,
        width,
        height,
        fps = 60,
        bitrate = 50000000,
        videoFormat = 'video/webm',
        outputContainer = document.querySelector('body'),
        autoplay = true,
    } = options

    let div = document.createElement('div')
    div.id = 'videoContainer'

    outputContainer.appendChild(div)

    let status, recordBtn, stopBtn

    (function init() {
        ui()

        let r

        recordBtn.onclick = function() {
            status.textContent = 'Recording...'
            stopBtn.disabled = false
            this.disabled = true

            r = new Recorder({
                container: div,
                width,
                height,
                videoFormat,
                bitrate,
                fps,
                drawScene,
                autoplay,
            })

            r.record()
        }

        stopBtn.onclick = function() {
            status.textContent = 'Rendering...'
            this.disabled = true

            r.stop((err) => {
                if (err) throw err

                status.textContent = 'Done'
                recordBtn.disabled = false
            })
        }
    })()

    function ui() {
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
}
