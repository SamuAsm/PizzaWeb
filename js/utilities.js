
//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); 
    }
};

//Remplaza todas las coincidencias en un String
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};