'use strict';

//
// Vertices
// 

/*
Note:
Generating all the vertices is similar to counting up in binary
By incrementing the binary number by 1 each time until 2^{dimensions},
we are sure to hit every possible combinations of 1's and 0's in {dimensions} places
Example:
0 --> 00 --> -1, -1, -1
1 --> 01 --> -1, -1, 1
2 --> 10 --> -1, 1, -1
3 --> 11 --> -1, 1, 1
*/

function getVertices(dimension) {

	var n = Math.pow(2, dimension);
	var vertices = new Array(n);
	var vertex = void 0;

	for (var i = 0; i < Math.pow(2, dimension); i++) {
		// Generate binary number
		vertex = i.toString(2);

		// Add leading 0's
		/*
  Note:
  In base 2, the number of digits we need to encode the number is log2(n)
  Here, we have log2(2^{dimensions}) = {dimensions}
  */
		while (vertex.length < dimension) {
			vertex = '0' + vertex;
		}

		// Generate the vertex by splitting then substituting 0 --> -1, 1 --> 1
		// I could use array.forEach, but that's not supported in all browsers...
		vertex = vertex.split('');
		for (var j = 0; j < vertex.length; j++) {
			vertex[j] = parseInt(vertex[j]) === 0 ? -1 : 1;
		}

		// Add the vertex to the list of vertices
		vertices[i] = vertex;
	}

	// Convert to matrix
	return Matrix.from(vertices);
}
//# sourceMappingURL=vertex.js.map