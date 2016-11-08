// Originally written by Felix Turner @felixturner
// Modified by Matthew Chiang


var LissajousControlsHandler = function() {

	var AX, a, delta, BX, b, x, y;

	var params = {
		AX          : 200,
		BX          : 200,
		a           : 3,
		b           : 2,
		delta       : 100, // phase slowing factor (visually affects spin speed)
		t           : 1000, // iteration count (lower makes the curve look spacious, higher makes it look filled)
		mouseOn     : false,
		useVertex     : false
	};

	function init() {

		// Init DAT GUI control panel
		gui = new dat.GUI({autoPlace: false});
		$('#controls').append(gui.domElement);

		// Folder for parameters of parametric equation #1
		var f1 = gui.addFolder('Parametric Equation 1');
		var amp1 = f1.add(params, 'AX', 0, 500).step(10);
		var freq1 = f1.add(params, 'a', 1, 10).step(1);
		var delta = f1.add(params, 'delta', 10, 500).step(25);
		f1.open();

		// Folder for parameters of parametric equation #2
		var f2 = gui.addFolder('Parametric Equation 2');
		var amp2 = f2.add(params, 'BX', 0, 500).step(10);
		var freq2 = f2.add(params, 'b', 1, 10).step(1);
		f2.open();

		// Folder for general parameters
		var f3 = gui.addFolder('General Parameters');
		var iterationCount = f3.add(params, 't', 100, 5000).name("particles").step(100);
		var mouseOn = f3.add(params, 'mouseOn');
		var useVertex = f3.add(params, 'useVertex');
		f3.open();

		// setListeners(waveSelection, ampSelection, freqSelection);
	}

	/**
	 * @param {waveCtrl} control handler for wave function
	 * @param {ampCtrl} control handler for amplitude
	 * @param {freqCtrl} control handler for frequency
	 */
	function setListeners(waveCtrl, ampCtrl, freqCtrl) {
	// Fires on every change, drag, keypress, etc
		waveCtrl.onChange(function(value) {
			osc.setType(params.wave);
		});
		ampCtrl.onChange(function(value) {
			osc.amp(params.amplitude);
		})
		freqCtrl.onChange(function(value) {
			osc.freq(params.frequency);
		})
	}

	return {
		init:init,
		params: params
	};
};