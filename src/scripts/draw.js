//
// Rendering
//

function draw() {
	// Clear the screen
	ctx.fillStyle = '#fff'
	ctx.fillRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT)

	// Matrices
	let point, rotated, projected
	// Scalars and indices
	let perspective, rotation
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
			rotation = ROTATIONS[j]
			rotated = Matrix.dot(rotated, getRotationMatrix(rotation[0], rotation[1], DIMENSION, ANGLE))
		}
		rotated = Matrix.dot(rotated, point)
		
		/*
		Note: for every dimension strictly higher than 2
		we are projecting {rotated} from dimension n to n-1, and repeat until we hit 2D 
		*/

		projected = Matrix.from(rotated)
		for (let j=DIMENSION; j>2; j--) {
			if (ISOMETRIC) {
				perspective = 1
			} else {
				perspective = getPerspectiveScalar(projected[j-1][0])
			}
			projected = Matrix.dot(getProjectionMatrix(j, perspective), projected)
		}
		projected = Matrix.scale(projected, SCALING)

		points[i] = [projected[0][0], projected[1][0]]
	}

	drawVertices(points)
	connectVertices(points)

	ANGLE += SPEED

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


function getPerspectiveScalar(scalar) {
	return 1/(DISTANCE + scalar)
}