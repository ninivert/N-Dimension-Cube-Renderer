/*
Note:
According to https://jsperf.com/js-nested-vs-flat-array-retrieve-values/
It is faster to use nested 2D arrays than flattened 2D arrays, even with TypedArrays
So I'll be using [Float32Array(n), ..., Float32Array(n)] rather than Float32Array(n*n)
*/

/*
This library is NOT robust, at all
I'm assuming the user did not make any mistakes inputting the array
Normally each layer should have the same length
That way I can read the matrix dimensions from m.length and m[0].length
*/

/*
TODO:
- Make a vector class that ties in neatly with the matrix class
*/

//
// High-perf static matrix library
//

function Matrix(input) { return Matrix.from(input) }


Matrix.add = function(m1, m2) {
	const m1height = m1.length, m1width = m1[0].length
	const m2height = m2.length, m2width = m2[0].length

	if (m1width !== m2width || m1height !== m2height) {
		throw 'Incompatible matrices'
	}

	let result = Matrix.new(m1height, m1width)
	let y, x

	for (y=0; y<m1height; y++) {
		for (x=0; x<m1width; x++) {
			result[y][x] = m1[y][x] + m2[y][x]
		}
	}

	return result
}


Matrix.subtract = function(m1, m2) {
	const m1height = m1.length, m1width = m1[0].length
	const m2height = m2.length, m2width = m2[0].length

	if (m1width !== m2width || m1height !== m2height) {
		throw 'Incompatible matrices'
	}

	let result = Matrix.new(m1height, m1width)
	let y, x

	for (y=0; y<m1height; y++) {
		for (x=0; x<m1width; x++) {
			result[y][x] = m1[y][x] - m2[y][x]
		}
	}

	return result
}


Matrix.dot = function(m1, m2) {
	const m1height = m1.length, m1width = m1[0].length
	const m2height = m2.length, m2width = m2[0].length

	if (m1width !== m2height) {
		throw 'Incompatible matrices'
	}

	let result = Matrix.new(m1height, m2width)
	let size = m1width
	let y, x, n, sum

	for (y=0; y<m1height; y++) {
		for (x=0; x<m2width; x++) {
			sum = 0
			for (n=0; n<size; n++) {
				sum += m1[y][n] * m2[n][x]
			}
			result[y][x] = sum
		}
	}

	return result
}


Matrix.scale = function(m, factor) {
	const mheight = m.length, mwidth = m[0].length

	let result = Matrix.new(mheight, mwidth)
	let y, x

	for (y=0; y<mheight; y++) {
		for (x=0; x<mwidth; x++) {
			result[y][x] = m[y][x] * factor
		}
	}

	return result
}


Matrix.transpose = function(m) {
	const height = m.length, width = m[0].length

	let result = Matrix.new(width, height)
	let y, x

	for (y=0; y<width; y++) {
		for (x=0; x<height; x++) {
			result[y][x] = m[x][y]
		}
	}

	return result
}


Matrix.from = function(input) {
	const height = input.length
	const width = input[0].length

	let matrix = new Array(height)
	let y, x

	for (y=0; y<height; y++) {
		matrix[y] = Float32Array.from(input[y])
	}

	// Return the result
	return matrix
}


Matrix.new = function(height, width) {
	let matrix = new Array(height)
	let y

	for (y=0; y<height; y++) {
		matrix[y] = new Float32Array(width)
	}

	return matrix
}


Matrix.identity = function(dimension) {
	let matrix = new Array(dimension)
	let y

	for (y=0; y<dimension; y++) {
		matrix[y] = new Float32Array(dimension)
		matrix[y][y] = 1
	}

	return matrix
}