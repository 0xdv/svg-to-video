export default config => {
    let {
        drawScene,
        width,
        height
    } = config

    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    let context = canvas.getContext("2d")

    let data = [],
        stream = canvas.captureStream(),
        recorder = new MediaRecorder(stream, { mimeType: "video/webm", bitsPerSecond: 50000000 });

    recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
            data.push(event.data);
        }
    }

    recorder.onstop = () => {
        var url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
        d3.select("body")
            .append("video")
            .attr("src", url)
            .attr("controls", true)
            .attr("autoplay", true);
    }

    function record() {
        var queue = d3.queue(1)

        let frameCount = 120

        d3.range(frameCount).forEach(function(frame){
            queue.defer(drawImg, frame / frameCount)
        })

        queue.awaitAll(function(err, frames) {
            if(err) throw err

            recorder.start()

            ;(function processFrame() {
                if (frames.length) {
                    context.drawImage(frames.shift(), 0, 0, width, height);
                    requestAnimationFrame(processFrame)
                } else {
                    recorder.stop()
                }
            })()

        })
    }


    let i = 0

    function drawImg(t, cb) {
        let domEl = drawScene(t)
        
        let serialized = new XMLSerializer().serializeToString(domEl)
        let blob = new Blob([serialized], {type: "image/svg+xml"})
        let url = URL.createObjectURL(blob)
        let img = new Image()
       // download(`tmp/${i++}.svg`, [serialized])

        img.src = url
        img.onload = function() {
            cb(null, img)
        }
    }

    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
    
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    return record
}