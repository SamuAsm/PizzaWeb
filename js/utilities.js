
//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); 
    }
};
//EJEMPLO DE USO
/*
var area = document.querySelectorAll("a")
forEach(area, function (index, input) {
	if(input.value){
		if(input.value < 0) input.value *= -1;
			sum += parseFloat(input.value)
	}
});
*/

//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
Object.prototype.each = function(callback, scope){
	if(!this.length) throw new TypeError((typeof this) + " isn't an Array, it is not possible to iterate.");
	for (var i = 0; i < this.length; i++){
		callback.call(scope, i, this[i]);
	}
}
//EJEMPLO DE USO
/*
var all_a = document.querySelectorAll("a")
all_a.each(function(ind, obj){
	console.log(obj);
	console.log(ind)
});
*/

//Remplaza todas las coincidencias en un String
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};


var range = function(first, last){
	if(typeof first == typeof "string" || typeof last == typeof "string"){
		if(first.length != 1 || last.length != 1){
			if(!this.length) throw new TypeError((typeof this) + " is an Array, it no supports more than 1 of density.");
		}
		else{
			var f = first.charCodeAt(0);
			var l = last.charCodeAt(0);
			var a = new Array();
			var index = 0;
			for(var i = f; i <= l; i++){
				a[index++] = String.fromCharCode(i);
			}
			return a;
		}
	}
	else if(typeof first == typeof 5 || typeof first == typeof 5){
	}
}
String.fromCharCode(("a".charCodeAt(0)) + 1);
