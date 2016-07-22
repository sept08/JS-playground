/**
* function: Do not have to type 'prototype' characters when adding method for object.
*/
Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
}

/**
* function: Round a number to the nearest integer. whether it is positive or negative.
*/
Number.method('integer', function(){
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});