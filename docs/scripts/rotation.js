"use strict";

//
// Rotation
//

/*
Note: 
Rotation is the rotation of a plane, defined by 2 orthogonal vectors
So when I say XY rotation, it's the plane defined by the X and Y axes
rotating around the other axes (Z for 3D, ZW for 4D)
https://www.fourthdimensionapp.com/4dmanip/ has a great explanation on rotation
*/

function getRotationMatrix(axis1, axis2, dimension, angle) {
	/*
 Note:
 Looking at rotations matrices for 2D, 3D and 4D, we can extrapolate a general formula for them
 Each axis has a vertical matrix index corresponding to it
 	- X --> 0 (1D) ; X_0 --> 0 (1D)
 	- Y --> 1 (2D) ; X_1 --> 1 (2D)
 	- Z --> 2 (3D) ; X_2 --> 2 (3D)
 	- W --> 3 (4D) ; X_3 --> 3 (4D)
 	- ...
 	- X_{n} --> {n} ({n+1}D)
 Algorithm:
 	- Generate an identity matrix with dimension {dimension}
 	- Replace the following coordinates with the following values
 		- [axis1, axis1] --> cos(a)
 		- [axis1, axis2] --> -sin(a)
 		- [axis2, axis1] --> sin(a)
 		- [axis2, axis2] --> cos(a)
 */

	var matrix = Matrix.identity(dimension);

	matrix[axis1][axis1] = Math.cos(angle);
	matrix[axis1][axis2] = -Math.sin(angle);
	matrix[axis2][axis1] = Math.sin(angle);
	matrix[axis2][axis2] = Math.cos(angle);

	return matrix;
}

function getAxisName(index) {
	/*
 Note:
 Take the index of the axis and get the associated letter
 Unicode caps alphabet start at 65, 'X' char is at index 65+23 = 88
 'W' (axis index 3) is at 65+25-3 = 90-3 = 87
 So we have X, Y, Z as 0, 1, 2 ; then we do the alphabet in reverse from 'W'
 I'm not really caring about dimensions larger than 25 because
 	- Such a dimension is very laggy
 	- String.fromCharCode() doesn't throw an error for negative/large values
 	- They will just have weird axis names
 */

	if (index < 3) {
		return String.fromCharCode(index + 88);
	}

	return String.fromCharCode(90 - index);
}

function getListOfRotations(dimension) {
	/*
 Note:
 Return a list of all the planes you can rotate for a given dimension
 0D --> []
 1D --> []
 2D --> [0 1] --> ['XY']
 3D --> [0 1, 0 2, 1 2] --> ['XY', 'XZ', 'YZ']
 4D --> [0 1, 0 2, 0 3, 1 2, 1 3, 2 3] --> ['XY', 'XZ', 'XW', 'YZ', 'YW', 'ZW']
 Pattern:
 	- The first digit goes from 0 to dimension-2
 	- The last digit goes from the first digit + 1 to dimension-1
 Combine these two in a loop and BAM!
 */

	var list = [];
	var first = void 0,
	    last = void 0;

	for (first = 0; first < dimension - 1; first++) {
		for (last = first + 1; last < dimension; last++) {
			list.push([first, last]);
		}
	}

	return list;
}

/*
Fun fact:
The number of rotations per dimension is given by (n-1)*n/2
Observation:
	- 0D has no rotation possible
	  (because to rotate you need at least 2 orthogonal vectors (2 axes) that define a plane)
	- 1D gets the number of rotations for 0D (so 0) and still no rotation possible,
	  so a total of 0 rotations
	- 2D gets the number of rotations for 1D (0) + 1 (2 axes = 1 plane)
	- 3D gets 1 + 2 = 3
	- 4D gets 3 + 3 = 6
	- 5D gets 6 + 4 = 10
	- 6D gets 10 + 5 = 15
	- Hopefully you see some kind of pattern here
Generalization:
	- Every higher dimension {n} gets
		- The rotation planes from the previous dimension {n-1} (obviously)
	  	- The number of axes from the previous dimension (so {n-1} axes)
	  	  that each can be combined with the new axis to create {n} rotation planes
	- That translates to a well-know progression:
		- 0, 0, 1, 3, 6, 10, 15, ...
		- u(n) = u(n-1) + n - 1
		- These are the triangular numbers, of general formula
			- n(n+1)/2
			- 2 choose n+1 (binomial coefficients)
		- We only shift everything over by 1 to correspond with the dimension number
		- More on them: https://en.wikipedia.org/wiki/Triangular_number
Proof (copied from http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/runsums/triNbProof.html):
	T(n) + T(n) = 1 + 2 + 3 + ... + (n-1) + n
	            + n + (n-1) + ... + 3 + 2 + 1
	            = (1+n) + (2+[n-1]) + (3+[n-2]) + ... + ([n-1]+2) + (n+1)
	            = (n+1) + (n+1) + ... + (n+1) + (n+1)
	            = n*(n+1)
	T(n) = (T(n) + T(n)) / 2 = n*(n+1)/2
*/
//# sourceMappingURL=rotation.js.map