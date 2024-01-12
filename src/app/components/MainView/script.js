const volume = document.getElementById('volume')

const context = new AudioContext()

setupContext()

async function setupContext() {
    const mic = await getMicrophone()
    if (context.state === 'suspended') {
        await context.resume()
    }
    const source = context.createMediaStreamSource(mic)
    source.connect(context.destination)
}

function getMicrophone() {
    return navigator.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0,
        }
    })
}
