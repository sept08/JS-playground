/**
* function: Do not have to type 'prototype' characters when adding method for object.
*/
Function.prototype.method = function(name, func){
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
}

/**
* function: Round a number to the nearest integer. whether it is positive or negative.
*/
Number.method('integer', function(){
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

/**
* function: Romve string's blank of the header and the tail
*/
String.method('trim',function()){
	return this.replace(/^\s+|\s+$/g, '');
};