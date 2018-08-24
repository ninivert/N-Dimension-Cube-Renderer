//
// Projection
//

function getProjectionMatrix(dimensions, perspective) {
	/*
	Return a simple projection matrix that depends on p (perspective)
	[p, 0, ..., 0, 0]
	[0, p, ..., 0, 0]
	[      ...      ]
	[0, 0, ..., p, 0]
	[0, 0, ..., 0, 0]
	If the dimension is 2, we don't need to project it to dimension 1 --> identity matix
	If the dimension is 1, we need to project into 2 dimensions (add a dimension) --> [[1], [0]] matrix
	*/

	let matrix

	if (dimensions === 1) {
		matrix = Matrix.from([[1], [0]])
	}
	else if (dimensions === 2) {
		matrix = Matrix.identity(2)
	} else {
		matrix = Matrix.new(dimensions, dimensions)

		for (let i=0; i<dimensions-1; i++) {
			matrix[i][i] = perspective
		}
	}

	return matrix
}