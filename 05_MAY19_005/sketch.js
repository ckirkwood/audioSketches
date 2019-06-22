var song;
var amp;

// set UI values
var textR = 143;
var textG = 164;
var textB = 204;
var opacity = 255;
var textOpacity = 255;
var setPause = true;

function preload() {
  song = loadSound('005_master_2.mp3');
  song.setVolume(0.4);
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);

  textAlign(CENTER, CENTER);

  amp = new p5.Amplitude();
}

function draw() {
  //background(15);
  noStroke();

  // UI - if paused, draw over the frame and write a help message
  if (!setPause) {
    fill(231, 223, 223, opacity); // remove opacity to hide sketch when paused
    rect(0, 0, windowWidth, windowHeight)
    textOpacity = 0;

  } else {
    textOpacity = 255;
    opacity = 255;
 }

  textFont('Futura');
  fill(textR, textG, textB, textOpacity);
  textSize(18);

  text('TAP TO PLAY / PAUSE', width / 2, height / 2);



  vol = amp.getLevel();

  var c = map(vol, 0, 1, 255, 0);
  var w = map(vol, 0, 1, 0, 600);
  var h = map(vol, 0, 1, 0, 1000);
  var l = map(vol, 0, 1, 30, 0);

  // set grid layout (i think?)
  for (let x = width/35; x <= width; x += 10) {
    for (let y = height/35;  y <= height; y += 10) {
      fill(x, y+20, c-l*2, c-220); // surprise 4-colour gradient!
      rect(x, height/2, w, h); // draw shapes in grid
      rotate(c/(y*2));

    }
  }
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    setPause = true;
  } else {
    song.loop();
    setPause = false;
  }
}
