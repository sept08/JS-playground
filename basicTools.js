/**
* function: Do not have to type 'prototype' characters when adding method for object.
*/
Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
}