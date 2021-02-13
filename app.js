const radius = 150;
const bars = 100;
let rotationDegree = 0;

navigator.mediaDevices.enumerateDevices().then(devices => {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: devices[1].deviceId
      }
    })
  .then(stream => {
    const audioCtx = new AudioContext();
    this.audioAnalyser = audioCtx.createAnalyser();
    const audioCtxSource = audioCtx.createMediaStreamSource(stream);
    audioCtxSource.connect(this.audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);

    this.dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
  })
})
 
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0);
  
  if (this.audioAnalyser) {
    this.audioAnalyser.getByteFrequencyData(this.dataArray);
    
    circle(innerWidth / 2, innerHeight / 2, radius * 2);
  
    for (let i = 0; i < radius; i++) {
      const radians = (Math.PI * 2) / bars;
      fill('#000')
      
      const x = innerWidth / 2 + Math.cos(radians * i + rotationDegree) * radius;
      const y = innerHeight / 2 + Math.sin(radians * i + rotationDegree) * radius;
      const x_end = innerWidth / 2 + Math.cos(radians * i + rotationDegree) * (radius + this.dataArray[i]);
      const y_end = innerHeight / 2 + Math.sin(radians * i + rotationDegree) * (radius + this.dataArray[i]);

      line(x, y, x_end, y_end);
      stroke(`hsl(${i}, 100%, 50%)`);
    }
    
    if (rotationDegree > 6.23) {
      rotationDegree = 0;
    }
    rotationDegree += .01
  }
}
