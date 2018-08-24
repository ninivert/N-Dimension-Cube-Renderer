//
// Rotation
//

let angle = 0

/*
Note: 
Rotation is the rotation of a plane, defined by 2 orthogonal vectors
So when I say XY rotation, it's the plane defined by the X and Y axes
rotating around the other axes (Z for 3D, ZW for 4D)
https://www.fourthdimensionapp.com/4dmanip/ has a great explanation on rotation
*/

const getRotationMatrix = [
	{
		// Can't really rotate something that is 1D, right ? 
	},
	{
		'XY': function() {
			return Matrix.from([
				[Math.cos(angle), -Math.sin(angle)],
				[Math.sin(angle), Math.cos(angle)],
			])
		},
	},
	{
		'XY': function() {
			return Matrix.from([
				[Math.cos(angle), -Math.sin(angle), 0],
				[Math.sin(angle), Math.cos(angle), 0],
				[0, 0, 1]
			])
		},
		'XZ': function() {
			return Matrix.from([
				[Math.cos(angle), 0, -Math.sin(angle)],
				[0, 1, 0],
				[Math.sin(angle), 0, Math.cos(angle)]
			])
		},
		'YZ': function() {
			return Matrix.from([
				[1, 0, 0],
				[0, Math.cos(angle), -Math.sin(angle)],
				[0, Math.sin(angle), Math.cos(angle)]
			])
		},
	},
	{
		'XY': function() {
			return Matrix.from([
				[Math.cos(angle), Math.sin(angle), 0, 0],
				[-Math.sin(angle), Math.cos(angle), 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			])
		},
		'XZ': function() {
			return Matrix.from([
				[Math.cos(angle), 0, -Math.sin(angle), 0],
				[0, 1, 0, 0],
				[-Math.sin(angle), Math.cos(angle), 0, 0],
				[0, 0, 0, 1]
			])
		},
		'XW': function() {
			return Matrix.from([
				[Math.cos(angle), 0, 0, -Math.sin(angle)],
				[0, 1, 0, 0],
				[0, 0, 1, 1],
				[Math.sin(angle), 0, 0, Math.cos(angle)]
			])
		},
		'YZ': function() {
			return Matrix.from([
				[1, 0, 0, 0],
				[0, Math.cos(angle), Math.sin(angle), 0],
				[0, -Math.sin(angle), Math.cos(angle), 0],
				[0, 0, 0, 1]
			])
		},
		'YW': function() {
			return Matrix.from([
				[1, 0, 0, 0],
				[0, Math.cos(angle), 0, -Math.sin(angle)],
				[0, 0, 1, 0],
				[0, Math.sin(angle), 0, Math.cos(angle)],
			])
		},
		'ZW': function() {
			return Matrix.from([
				[1, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 0, Math.cos(angle), -Math.sin(angle)],
				[0, 0, Math.sin(angle), Math.cos(angle)]
			])
		}
	}
]