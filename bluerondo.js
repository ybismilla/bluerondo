console.log("bluerondo");

let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 0;
    sourceNode.loopEnd = 2.7;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    sourceNode.start();
}


fetch('bluerondo.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        startLoop(audioBuffer,-1);
        startLoop(audioBuffer,1, 1.002);
    })
    .catch(e =>console.error(e));