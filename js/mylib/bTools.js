define(function(){
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
	String.method('trim',function(){
		return this.replace(/^\s+|\s+$/g, '');
	});

	/**
	* To replace a special string 
	*/
	String.method('deentityify',function(){
		// word table
		var entity = {
			quot : '"',
			lt : '<',
			gt : '>'
		};

		return function(){
			return this.replace(/&([^&;]+);/g, function(a,b){
				debugger;
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			});
		};
	}());
});
