// SET UI VALUES
// website powder blue - 143, 164, 204
// website background - 231, 223, 223
var textR = 143;
var textG = 164;
var textB = 204;
var bgR = 231;
var bgG = 223;
var bgB = 223;
var opacity = 255;
var textOpacity = 255;
var freqResolution = 128; // must be a power of 2; higher number = easier to pinpoint frequencies
var setPause = true;

var moveH;
var lastPosH;
var moveV;
var lastPosV;

function preload() {
  sound = loadSound('007_master.mp3');
}

function setup() {
  // Set up properly for tap-to-playback
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);

  textAlign(CENTER, CENTER);

  fft = new p5.FFT();
}


function draw() {
  noStroke();

  // UI - if paused, draw over the frame and write a help message
  if (!setPause) {
    fill(bgR, bgG, bgB, opacity); // remove opacity to hide sketch when paused
    rect(0, 0, width, height)
    textOpacity = 0;
  } else {
    textOpacity = 255;
    opacity = 255;
 }
  // UI - Place text
  textFont('Futura');
  fill(textR, textG, textB, textOpacity);
  textSize(18);
  text('TAP TO PLAY / PAUSE', width / 2, height / 2);

  // END OF UI MAIN TEMPLATE


  var spectrum = fft.analyze(freqResolution);
  //moveV
  moveH = map(spectrum[40], 0, 1024, 0, width/2);
  moveV = map(spectrum[20], 0, 1024, 0, height/8);

  for (let x = 0; x <= width; x += width/8.33) {
    for (let y = 0;  y <= height; y += width/8.33) {

      fill(x, 98, 131+(spectrum[40]/4));
      rect(x, y, (width/60), (width/60)+lastPosV+moveV);
      lastPosV = moveV;

      fill(0, spectrum[40]);
      ellipse(x+moveH*1.4, y, width/30, width/30);
     // lastPosH = moveH;

    }
  }
}


// tap-to-playback template
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    setPause = true;
  } else {
    sound.loop();
    setPause = false;
  }
}
