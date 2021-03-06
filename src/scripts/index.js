//
// Canvas setup
//

console.clear()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// User-set options
let DISTANCE = 3
let DIMENSION = 4
let SCALING = 500
let SPEED = 0.01
let ISOMETRIC = false
let ROTATIONS = [[0, 3], [1, 2]]

// Settings and constants
const HEIGHT = 400, WIDTH = 400
let FIGURE
let NEXTFRAME
let ANGLE
// I needed a list of all the rotation planes (2 axes) indices
// to avoid generating it every time the user changed the rotation
let ALLROTATIONS

// Figure stats, the code doesn't need it, but it's nice to have
const NAMES = ['Square', 'Cube', 'Tesseract', 'Penteract', 'Hexeract', 'Hepteract', 'Octeract', 'Enneract', 'Dekeract']
let VERTICES, EDGES

// The init function assumes the 
function init() {
	// Stop animation if there is one
	cancelAnimationFrame(NEXTFRAME)

	// Set canvas dimensions
	canvas.width = WIDTH
	canvas.height = HEIGHT

	// Center the canvas
	ctx.setTransform(1, 0, 0, 1, WIDTH/2, HEIGHT/2);
	
	// Init global variable
	FIGURE = getVertices(DIMENSION)
	ALLROTATIONS = getListOfRotations(DIMENSION)
	ANGLE = 0

	// Update the info text
	VERTICES = Math.pow(2, DIMENSION)
	EDGES = DIMENSION * Math.pow(2, DIMENSION-1)
	document.getElementById('name').innerHTML = NAMES[DIMENSION-2]
	document.getElementById('info').innerHTML = `${VERTICES} vertices, ${EDGES} edges`

	// Dräw, bröther
	draw()
}

// Start everything
init()