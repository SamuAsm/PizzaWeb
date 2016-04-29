
var claw = {
	srchArray : function(queryArray){
		var doms = []
		if(!(queryArray instanceof Array)) throw new TypeError((typeof this) + " isn´t an Array, it needs a queryArray.");
		queryArray.each(function(i,o){
			doms[i] = claw.grlsrch(o)
		})
		return doms;
	},
	srchAll : function(query){
		return document.querySelectorAll(query);
	},
	srch : function(query){
		return document.querySelector(query);
	},
	grlsrch : function(query){
		if(query instanceof Array)
		{
			var doms = [];
			var index = 0;
			query.each(function(i,o){
				var it = claw.grlsrch(o);
				if(it instanceof Array){
					it.each(function(i2,item){
						doms[index++] = item;
					})
				}
				else{
					doms[index++] = it;
				}
			});
			return doms;
		}

		var item = document.querySelectorAll(query);
		if(item.length == 1) item = item[0];
		return item;
	},
	//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
	/*//EJEMPLO DE USO
	var area = document.querySelectorAll("a")
	forEach(area, function (index, input) {
		if(input.value){
			if(input.value < 0) input.value *= -1;
				sum += parseFloat(input.value)
		}
	});
	*/
	forEach : function (array, callback, scope) {
	    for (var i = 0; i < array.length; i++) {
	        callback.call(scope, i, array[i]); 
	    }
	},
	//Crea un rango entre el "primero" y el "ultimo" convirtiendolos a codigo ASCII para luego iterar entre sus posiciones
	/* // EJEMPLO DE USO
	var a = claw.range(1, 7)
		=> [1,2,3,4,5,6,7]
	a.each(...) <- tambien podemos iterar sobre el con el metodo each o claw.forEach
	*/
	range : function(first, last){
		var f = String(first);
		var l = String(last);
		if(f.length != 1 || l.length != 1){
			if(!this.length) throw new TypeError((typeof this) + " is an Array, it no supports more than 1 of density.");
		}
		else{
			var fr = f.charCodeAt(0);
			var la = l.charCodeAt(0);
			var a = new Array();
			var index = 0;
			for(var i = fr; i <= la; i++){
				a[index++] = String.fromCharCode(i);
			}
			return a;
		}
	}
	
}

//// MODIFICACIONES A PROTOTIPOS


//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
//EJEMPLO DE USO
/*
var all_a = document.querySelectorAll("a")
all_a.each(function(ind, obj){
	console.log(obj);
	console.log(ind)
});
*/
Object.prototype.each = function(callback, scope){
	if(!this.length) throw new TypeError((typeof this) + " isn't an Array, it is not possible to iterate.");
	for (var i = 0; i < this.length; i++){
		callback.call(scope, i, this[i])
	}
}

//Remplaza todas las coincidencias en un String
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

///// Instancias a los metodos

///Busqueda
var _S = claw.srch
var _SLL = claw.srchAll
var _SAR = claw.srchArray
///BUSQUEDA GENERAL
var $C = claw.grlsrch
