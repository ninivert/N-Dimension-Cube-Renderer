"use strict";

//
// Projection
//

function getProjectionMatrix(dimension, perspective) {
	/*
 Return a simple projection matrix that depends on p (perspective)
 [p, 0, ..., 0, 0]
 [0, p, ..., 0, 0]
 [      ...      ]
 [0, 0, ..., p, 0]
 [0, 0, ..., 0, 0]
 But we are excluding the last line because we want (x, y, z) --> (x, y) and not (x, y, 0)
 If the dimension is 2, we don't need to project it to dimension 1 --> identity matix
 If the dimension is 1, we need to project into 2 dimensions (add a dimension) --> [[1], [0]] matrix
 */

	/*
 I won't need 1D projections because in draw.js projections only happen
 for dimensions strictly higher than 2
 But for reference purposes, here it is 
 if (dimensions === 1) {
 	matrix = Matrix.from([[1], [0]])
 }
 */

	var matrix = void 0;

	if (dimension === 2) {
		matrix = Matrix.identity(2);
	} else {
		matrix = Matrix.new(dimension - 1, dimension);

		for (var i = 0; i < dimension - 1; i++) {
			matrix[i][i] = perspective;
		}
	}

	return matrix;
}
//# sourceMappingURL=projection.js.map