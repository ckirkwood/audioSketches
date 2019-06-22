var drums;
var bass;
var synth;
var guitar;
var drumAmp;
var bassAmp;
var synthAmp;
var guitarAmp;
var r = 0;

// set UI values
var textR = 143;
var textG = 164;
var textB = 204;
var opacity = 255;
var textOpacity = 255;
var setPause = true;


function preload() {
  drums = loadSound('drums_60sec.mp3');
  bass = loadSound('bass_60sec.mp3');
  synth = loadSound('synth_60sec.mp3');
  guitar = loadSound('guitar.mp3');
}


function setup() {

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);

  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  drumAmp = new p5.Amplitude();
  drumAmp.setInput(drums);

  bassAmp = new p5.Amplitude(0.4);
  bassAmp.setInput(bass);

  synthAmp = new p5.Amplitude();
  synthAmp.setInput(synth);

  guitarAmp = new p5.Amplitude();
  guitarAmp.setInput(guitar);
}


function draw() {
  background(231, 223, 223);
  noStroke();

  // UI - if paused, draw over the frame and write a help message
  if (!setPause) {
    textOpacity = 0;

  } else {
    textOpacity = 255;
    opacity = 255;
  }

  //get current amplitude and add to array
  var drumVol = drumAmp.getLevel();
  var bassVol = bassAmp.getLevel();
  var synthVol = synthAmp.getLevel();
  var guitarVol = guitarAmp.getLevel();


  translate(width / 2, height / 2);

  bv = map(bassVol, 0, 1, 10, 1000);
  gv = map(guitarVol, 0, 1, 0, 255);
  sv = map(guitarVol, 0, 1, 0, 255);

  push();
  // set grid layout (i think?)
  if (width < 400) {
    for (let x = width / 70; x <= width * 2; x += 50) {
      for (let y = height / 70; y <= height * 2; y += 50) {
        fill(x, gv, y); // surprise 4-colour gradient!
        rotate(r, height / 233); // rotate by current amplitude
        rect(x, y, bv, height * 10); // draw shapes in grid
        r += drumVol / 4; // update rotation amplitude
      }
    }
  } else {
    for (let x = width / 70; x <= width / 2; x += 50) {
      for (let y = height / 70; y <= height / 2; y += 50) {
        fill(x, gv, y); // surprise 4-colour gradient!
        rotate(r, height / 233); // rotate by current amplitude
        rect(x, y, bv, height * 10); // draw shapes in grid
        r += drumVol / 4; // update rotation amplitude
      }
    }
  }
  pop();

  textFont('Futura');
  fill(textR, textG, textB, textOpacity);
  textSize(18);

  text('TAP TO PLAY / PAUSE', 0, 0);
}


// toggle playback by clicking sketch window
function togglePlay() {
  if (drums.isPlaying()) {
    drums.pause();
    bass.pause();
    synth.pause();
    guitar.pause();
    setPause = true;
  } else {
    drums.play();
    bass.play();
    synth.play();
    guitar.play();
    setPause = false;
  }
}
