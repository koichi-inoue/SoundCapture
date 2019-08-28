// Global Variable
const width = 480;
const height = 360
let fft;
let figureMode;

// SetUp
function setup() {
  var cv=createCanvas(width, height);
  cv.parent("screen");
  noFill();

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  figureMode = "waveform";
}

 // DrawLoop
function draw() {

  background(200);

  if( figureMode == "waveform" ){

    var waveform = fft.waveform();
    beginShape();
    for(i=0; i<waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, width);
      var y = map(waveform[i], -1.0, 1.0, height, 0);
      vertex(x,y);
    }
    endShape();

  } else {

    var spectrum = fft.analyze();
    beginShape();
    for (i = 0; i<spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0) );
    }
    endShape();

  }

}

// Functions

function SetWaveForm(){
  figureMode = "waveform";
}

function SetAnalyze(){
  figureMode = "analyze";
}
