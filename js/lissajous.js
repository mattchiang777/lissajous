var osc, fft1, fft2;

var sound1, sound2;

var controller = LissajousControlsHandler();
controller.init();

// Parametric equation-related variables
var AX, a, delta, BX, b, x, y, numParticles;

// Mouse on/off, use vertex/ellipse 
var mouseOn, useVertex;

function preload() {
	// sound1 = loadSound('0001.mp3');
}

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	// cnv.mouseClicked(togglePlay);

	// frameRate(30);

	// sound2 = new p5.AudioIn();
	// sound1.play();
	// sound2.start();

	fft1 = new p5.FFT();
	fft1.setInput(sound1);
	fft2 = new p5.FFT();
	fft2.setInput(sound2);
}

function draw() {
	background(255);

	updateParams();

	// a = fft1.waveform();
	// b = fft2.waveform();
	// console.log(a[600]);
	// // x = drawLissajousX(mouseX, 10*abs(a[600]), millis(), delta) + mouseX;

	beginShape();
	strokeWeight(0);
	for (var i = 0; i < numParticles; i++) {
		// use switch case here
		if (mouseOn) {

			// Replace amplitudes
			x = drawLissajousX(mouseX, a, i, millis()/delta) + windowWidth/2;
			y = drawLissajousY(mouseY, b, i) + windowHeight/2;		

		} else {

			// Use control parameters
			x = drawLissajousX(AX, a, i, millis()/delta) + windowWidth/2;
			y = drawLissajousY(BX, b, i) + windowHeight/2;		
		
		}
		
		fill(0, 0, 0);
		if (useVertex) {
			vertex(x, y);
		} else {
			ellipse(x, y, 10, 10);
		}
	}
	endShape();
}

function updateParams() {
	AX = controller.params.AX;
	BX = controller.params.BX;
	a = controller.params.a;
	b = controller.params.b;
	numParticles = controller.params.t;
	delta = controller.params.delta;
	mouseOn = controller.params.mouseOn;
	useVertex = controller.params.useVertex;
}

/**
 * Get the correct X point value for the curve
 * x = Asin(at + delta)
 * @param  {float} A is the amplitude
 * @param  {float} a is the frequency of this song
 * @param {float} t is time
 * @param {float} delta is the phase shift
 * @return {float} x is the Lissajous curve coordinate
 */
function drawLissajousX(A, a, t, delta) {
	return A * sin(a * t + delta);
}

/**
 * Get the correct Y point value for the curve
 * y = Bsin(bt)
 * @param  {float} B is the amplitude
 * @param  {float} b is the frequency of this song
 * @param {float} t is time
 * @return {float} y is the Lissajous curve coordinate
 */
function drawLissajousY(B, b, t) {
	return B * sin(b * t);
}

// fade sound if mouse is over canvas
function togglePlay() {
	if (sound1.isPlaying()) {
		sound1.pause();
	} else {
		sound1.play();
	}
}