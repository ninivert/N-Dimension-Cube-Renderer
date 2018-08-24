/*



THIS FILE HAS BEEN REPLACED WITH MATRIX.JS
BECAUSE USING STATIC METHODS AND ARRAYS IS MORE EFFICIENT THAN CREATING MATRIX OBJECTS EACH TIME



*/

/*
Note:
According to https://jsperf.com/js-nested-vs-flat-array-retrieve-values/
It is faster to use nested 2D arrays than flattened 2D arrays, even with TypedArrays
So I'll be using [Float32Array(n), ..., Float32Array(n)] rather than Float32Array(n*n)
*/

//
// High-perf matrix library
//
function Matrix(input) {
	this.matrix = Matrix.from(input)
	this.height = this.matrix.length
	this.width = this.matrix[0].length
}

// Mathods (get it ??? coz it does math ???

Matrix.prototype.add = function(input) {
	if (this.width !== input.width || this.height !== input.height) {
		throw 'Incompatible matrices'
	}

	let y, x
	for (y=0; y<this.height; y++) {
		for (x=0; x<this.width; x++) {
			this.matrix[y][x] += input.matrix[y][x]
		}
	}
}

Matrix.prototype.subtract = function(input) {
	if (this.width !== input.width || this.height !== input.height) {
		throw 'Incompatible matrices'
	}

	let y, x
	for (y=0; y<this.height; y++) {
		for (x=0; x<this.width; x++) {
			this.matrix[y][x] -= input.matrix[y][x]
		}
	}
}

Matrix.prototype.scale = function(factor) {
	let y, x
	for (y=0; y<this.height; y++) {
		for (x=0; x<this.width; x++) {
			this.matrix[y][x] *= factor
		}
	}
}

Matrix.prototype.dot = function(input) {
	if (this.width !== input.height) {
		throw 'Incompatible matrices'
	}

	let result = Matrix.new(this.height, input.width)
	let size = this.width

	let y, x, n, sum
	for (y=0; y<this.height; y++) {
		for (x=0; x<input.width; x++) {
			sum = 0
			for (n=0; n<size; n++) {
				sum += this.matrix[y][n] * input.matrix[n][x]
			}
			result[y][x] = sum
		}
	}

	this.matrix = result
	this.width = input.width
}

Matrix.prototype.transpose = function() {
	let result = Matrix.new(this.width, this.height)

	let y, x
	for (y=0; y<this.width; y++) {
		for (x=0; x<this.height; x++) {
			result[y][x] = this.matrix[x][y]
		}
	}

	let height = this.height // Temp variable
	
	this.matrix = result
	this.height = this.width
	this.width = height
}



// Static methods

Matrix.from = function(input) {
	// I'm assuming the user did not make any mistakes inputting the array
	// Normally each layer should have the same length
	const height = input.length
	const width = input[0].length

	// Create a new high-perf matrix
	let matrix = new Array(height)
	
	// Init the matrix with the input values
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



//
// Test units
//

// const matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]])
// matrix1.scale(2)
// const matrix2 = new Matrix([[1, 2], [1, 2], [1, 2]])
// matrix2.scale(-1)

// const matrix3 = new Matrix(matrix1.matrix)
// matrix3.dot(matrix2)

// console.log(matrix1.matrix, matrix2.matrix, matrix3.matrix)