//
// Canvas setup
//

console.clear()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// User-set options
let DISTANCE = 3
let DIMENSION = 4
let SCALING = 200
let SPEED = 0.01
let ISOMETRIC = false
let ROTATIONS = ['YW', 'XZ']

// Settings and constants
const HEIGHT = 400, WIDTH = 400
let FIGURE
let NEXTFRAME

function init() {
	// Stop animation if there is one
	cancelAnimationFrame(NEXTFRAME)

	// Set canvas dimensions
	canvas.width = WIDTH
	canvas.height = HEIGHT

	// Center the canvas
	ctx.setTransform(1, 0, 0, 1, WIDTH/2, HEIGHT/2);
	
	// Init the global FIGURE variable
	FIGURE = getVertices(DIMENSION)

	draw()
}

// Start everything
init()