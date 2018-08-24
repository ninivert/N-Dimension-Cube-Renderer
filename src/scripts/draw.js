/*
Project from any dimension in 2D using perspective
*/

//
// Rendering
//

function draw() {
	// Clear the screen
	ctx.fillStyle = '#fff'
	ctx.fillRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT)

	let point, rotated, projected
	let points = new Array(FIGURE.length)

	// Rotating, projecting the vertices, and storing them
	for (let i=0; i<FIGURE.length; i++) {
		point = Matrix.from([FIGURE[i]])
		point = Matrix.transpose(point)

		/*
		Note: Here I'm combining the rotation matrices by dotting them
		Starting out with the identity matrix, this has the effect of leaving the point intact
		if there are no rotations
		*/

		rotated = Matrix.identity(DIMENSION)
		for (let j=0; j<ROTATIONS.length; j++) {
			rotated = Matrix.dot(rotated, getRotationMatrix[DIMENSION-1][ROTATIONS[j]](angle))
		}
		rotated = Matrix.dot(rotated, point)
		
		/*
		Note: If you are using more sophisticated projection matrices,
		you'll need to do 2D · 3D · ... · nD all the way
		Because we are only using identity matrices (of which one is scaled),
		we can ignore these steps
		We are projecting
			- from 4D into 3D with perspective
			- from 3D into 2D orthogonally
		*/

		let perspective
		if (ISOMETRIC) {
			perspective = 1 
		} else {
			perspective = 1/(DISTANCE - rotated[DIMENSION-1][0])
		}
		projected = getProjectionMatrix(DIMENSION, perspective)
		projected = Matrix.dot(projected, rotated)
		projected = Matrix.scale(projected, SCALING)

		points[i] = [projected[0][0], projected[1][0]]
	}

	drawVertices(points)
	connectVertices(points)

	angle += SPEED

	NEXTFRAME = requestAnimationFrame(draw)
}


function drawVertices(points) {
	// Pretty self-explanatory
	for (let i=0; i<points.length; i++) {
		ctx.beginPath()
		ctx.arc(points[i][0], points[i][1], 3, 0, 2*Math.PI)
		ctx.fillStyle = '#000'
		ctx.fill()
	}
}


function connectVertices(points) {
	/*
	Here is the pattern to connect the vertices correctly
	This works for every dimension starting from 1D (2 vertices, connect them together)
		- every 2 points (i%2 === 0): for the next 1 point: connect i and i+1
		- every 4 points (i%4 === 0): for the next 2 points: connect i and i+2
		- every 8 points (i%8 === 0): for the next 4 points: connect i and i+4
		- every 16 points (i%16 === 0): for the next 8 points: connect i and i+8
		- ...
		- every 2^{dimensions}: for the next 2^{dimensions+!}: connect i and i+2^{dimensions-1}
	I'm calling the every ... points the step, and the number points each step the size  
	*/

	ctx.beginPath()

	for (let dimension=1; dimension<DIMENSION+1; dimension++) {
		let step = Math.pow(2, dimension)
		let size = Math.pow(2, dimension-1)
		for (let i=0; i<points.length; i+=step) {
			for (let j=0; j<size; j++) {
				connect(i+j, i+j+size)
			}
		}
	}

	function connect(i1, i2) {
		ctx.moveTo(points[i1][0], points[i1][1])
		ctx.lineTo(points[i2][0], points[i2][1])
	}

	ctx.strokeStyle = '#000'
	ctx.stroke()
}