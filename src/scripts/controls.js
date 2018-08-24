/*
Note: Every form is for ONE option
the form ID should match the initalizer CONTROLS.init.{name}
and the oninput callback CONTROLS.callback.{name}
*/

function CONTROLS() {}

CONTROLS.DOM = {
	// All the container form elements
	'forms': {
		'rotations': document.getElementById('rotations'),
		'dimension': document.getElementById('dimension'),
		'scaling': document.getElementById('scaling'),
		'isometric': document.getElementById('isometric'),
		'speed': document.getElementById('speed'),
		'distance': document.getElementById('distance'),
	},
	// The child values, for reference
	'children': {
	}
}

//
// Initalization
//

CONTROLS.init = function() {
	/*
	Note: Looping through all the individual initializers to call them all
	Also add the callbacks and disable form submission
	*/

	let forms = Object.keys(this.init)

	for (let i=0; i<forms.length; i++) {
		this.init[forms[i]].call(this)
		this.DOM.forms[forms[i]].oninput = this.callback[forms[i]].bind(this)
		// onchange is for the checkboxes on mobile touch devices
		this.DOM.forms[forms[i]].onchange = this.callback[forms[i]].bind(this)
		this.DOM.forms[forms[i]].onsubmit = function() { return false }
	}
}

CONTROLS.init.dimension = function() {
	/*
	Note: Create a number input for the dimension number
	*/
	
	let input = document.createElement('input')
	input.type = 'number'
	input.value = DIMENSION

	this.DOM.children.dimension = input
	this.DOM.forms.dimension.appendChild(input)
}

CONTROLS.init.scaling = function() {
	/*
	Note: Create a number input for the scaling
	*/
	
	let input = document.createElement('input')
	input.type = 'number'
	input.value = SCALING

	this.DOM.children.scaling = input
	this.DOM.forms.scaling.appendChild(input)
}

CONTROLS.init.speed = function() {
	/*
	Note: Create a number input for the scaling
	*/
	
	let input = document.createElement('input')
	input.type = 'number'
	input.value = SPEED
	input.step = 0.001

	this.DOM.children.speed = input
	this.DOM.forms.speed.appendChild(input)
}

CONTROLS.init.distance = function() {
	/*
	Note: Create a number input for the scaling
	*/
	
	let input = document.createElement('input')
	input.type = 'number'
	input.value = DISTANCE
	input.step = 0.1

	this.DOM.children.distance = input
	this.DOM.forms.distance.appendChild(input)
}

CONTROLS.init.isometric = function() {
	/*
	Note: Create a checkbox input for the isometric projection
	*/
	
	let checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.id = 'isometric-checkbox'
	if (ISOMETRIC) {
		checkbox.checked = true
	}

	let label = document.createElement('label')
	label.innerHTML = '' // Adding content with CSS, boi
	label.htmlFor = 'isometric-checkbox'

	this.DOM.children.isometric = checkbox
	this.DOM.forms.isometric.appendChild(checkbox)
	this.DOM.forms.isometric.appendChild(label)
}

CONTROLS.init.rotations = function() {
	/*
	Note: Here I'm creating the inputs for the rotation matrices
	The checkboxes are in a form which gets triggered when any input changes
	I'm creating checkboxes + label then appending it to the form innerHTML
	*/

	let rotations = Object.keys(getRotationMatrix[DIMENSION-1])
	let checkbox, label

	// Reset the form
	this.DOM.forms.rotations.innerHTML = ''
	// Reset the children
	this.DOM.children.rotations = []

	for (let i=0; i<rotations.length; i++) {
		checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.id = rotations[i]
		checkbox.value = rotations[i]
		if (ROTATIONS.indexOf(rotations[i]) !== -1) {
			checkbox.checked = true
		}
		
		label = document.createElement('label')
		label.htmlFor = rotations[i]
		label.innerHTML = rotations[i]

		this.DOM.children.rotations[i] = checkbox
		this.DOM.forms.rotations.appendChild(checkbox)
		this.DOM.forms.rotations.appendChild(label)
	}
}

//
// Callbacks
//

CONTROLS.callback = {}

CONTROLS.callback.dimension = function() {
	let value = parseInt(this.DOM.children.dimension.value)

	// If the value is not a number (NaN), quit
	if (isNaN(value)) {
		return false
	}

	// Take the value and clamp it between [2, 4]
	value = Math.min(4, Math.max(1, value))
	// Ka-bam, reset everything
	DIMENSION = value
	ROTATIONS = []
	init()
	// Update the rotation options for the new dimension 
	CONTROLS.init.rotations.call(this)
}

CONTROLS.callback.scaling = function() {
	let value = parseFloat(this.DOM.children.scaling.value)

	// If the value is not a number (NaN), quit
	if (isNaN(value)) {
		return false
	}
	
	SCALING = value
}

CONTROLS.callback.speed = function() {
	let value = parseFloat(this.DOM.children.speed.value)

	// If the value is not a number (NaN), quit
	if (isNaN(value)) {
		return false
	}

	
	SPEED = value
}

CONTROLS.callback.distance = function() {
	let value = parseFloat(this.DOM.children.distance.value)

	// If the value is not a number (NaN), quit
	if (isNaN(value)) {
		return false
	}

	// Take the value and clamp it between [0, Infinity]
	value = Math.max(0, value)
	
	DISTANCE = value
}

CONTROLS.callback.isometric = function() {
	ISOMETRIC = this.DOM.children.isometric.checked
}

CONTROLS.callback.rotations = function() {
	/*
	Note: Here I'm looping through all the rotation checkboxes
	If they are checked, add its rotation name (= elmt.value) to the global ROTATIONS variable
	*/
	
	ROTATIONS = []
	let checkbox
	
	for (let i=0; i<this.DOM.children.rotations.length; i++) {
		checkbox = this.DOM.children.rotations[i]
		if (checkbox.checked) {
			ROTATIONS.push(checkbox.value)
		}
	}
}

//
// Start everything
//

CONTROLS.init()
