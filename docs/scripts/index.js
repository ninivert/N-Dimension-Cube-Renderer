'use strict';

//
// Canvas setup
//

console.clear();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// User-set options
var DISTANCE = 3;
var DIMENSION = 4;
var SCALING = 500;
var SPEED = 0.01;
var ISOMETRIC = false;
var ROTATIONS = [[0, 3], [1, 2]];

// Settings and constants
var HEIGHT = 400,
    WIDTH = 400;
var FIGURE = void 0;
var NEXTFRAME = void 0;
var ANGLE = void 0;
// I needed a list of all the rotation planes (2 axes) indices
// to avoid generating it every time the user changed the rotation
var ALLROTATIONS = void 0;

// Figure stats, the code doesn't need it, but it's nice to have
var NAMES = ['Square', 'Cube', 'Tesseract', 'Penteract', 'Hexeract', 'Hepteract', 'Octeract', 'Enneract', 'Dekeract'];
var VERTICES = void 0,
    EDGES = void 0;

// The init function assumes the 
function init() {
	// Stop animation if there is one
	cancelAnimationFrame(NEXTFRAME);

	// Set canvas dimensions
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Center the canvas
	ctx.setTransform(1, 0, 0, 1, WIDTH / 2, HEIGHT / 2);

	// Init global variable
	FIGURE = getVertices(DIMENSION);
	ALLROTATIONS = getListOfRotations(DIMENSION);
	ANGLE = 0;

	// Update the info text
	VERTICES = Math.pow(2, DIMENSION);
	EDGES = DIMENSION * Math.pow(2, DIMENSION - 1);
	document.getElementById('name').innerHTML = NAMES[DIMENSION - 2];
	document.getElementById('info').innerHTML = VERTICES + ' vertices, ' + EDGES + ' edges';

	// Dräw, bröther
	draw();
}

// Start everything
init();
//# sourceMappingURL=index.js.map