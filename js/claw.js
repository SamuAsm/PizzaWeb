var claw = {
	$$CLAW_PAGES$$ : [],
	$$HISTORY_CLAW_PAGES$$ : [],
	$$CLAW_MODULES$$ : [],
	$$404_RETURN_FUNCTION$$ : undefined,
	//Arreglo de modulos
	modules : function(name){
		if(claw.$$CLAW_MODULES$$[name] == undefined) throw "The module <"+name+"> doesn't exist"; 
		return claw.$$CLAW_MODULES$$[name];
	},
	//Crea un modulo
	module : function(name, callback){
		if(!(callback instanceof Function)) throw new TypeError("'"+callback+ "' is a <" + (typeof callback) + ">, it need a <Function> to create a module.");
		claw.$$CLAW_MODULES$$[name] = callback;
	},
	//Define la consecuencia de un error 404 del hash, este se ejecutara solo si se ha definido alguna pagina con anterioridad
	/*
	claw.pageError404(function(){});
	*/
	pageError404 : function(callback){
		$$404_RETURN_FUNCTION$$ = callback;
	},
	//CHECA si la pagina existe, en su defecto manda un mensaje de error (o la funcion definido por el usuario en caso de haber utilizado pageError404)
	check404 : function(){
		function e404() {
			if(claw.$$HISTORY_CLAW_PAGES$$[location.hash.replace("#","")] === undefined && claw.$$CLAW_PAGES$$.length > 0){
				//$$404_RETURN_FUNCTION$$.call() | console.log("ERROR404: "+location.hash.replace("#","")+" is not founded");
				if(claw.$$404_RETURN_FUNCTION$$ === undefined && !($$404_RETURN_FUNCTION$$ instanceof Function)){
					console.log("ERROR404: "+location.hash.replace("#","")+" is not founded") 
				}
				else{
					$$404_RETURN_FUNCTION$$.call();
				}
				$claw.$$CLAW_PAGES$$.iterate(function(index, $PAGE_ITERATION_OBJECT_9823){
					$claw.$$HISTORY_CLAW_PAGES$$[$PAGE_ITERATION_OBJECT_9823] = false;
				});
			}
		}
		window.onhashchange = e404;
	},
	getPages : function(){
		return $W.$$CLAW_PAGES$$
	},
	//Paginas sencibles a los hash de la url
	page : function(hash, modules, callback){
		if($claw.$$HISTORY_CLAW_PAGES$$[hash] != undefined ) {
			throw hash+" it's already in use";
		}
		if(modules === null || modules === undefined || modules == false || modules == true){
			modules = []
		}
		var localhash = location.hash.replace("#","");
		var newhash = hash;
		var scope = [];
		$claw.$$CLAW_PAGES$$[claw.$$CLAW_PAGES$$.length] = newhash;
		$claw.$$HISTORY_CLAW_PAGES$$[hash] = false;

		var validhash = function(){
			localhash = location.hash.replace("#","");
			//console.log("actual hash: "+localhash+"\nbut we search: "+newhash);
			if( localhash == newhash && $claw.$$HISTORY_CLAW_PAGES$$[newhash] == false) {

				if(modules.length == 0) {
					if(modules instanceof Function) modules.call(this);
				}
				else {
					modules.iterate(function(i, module){
						if(module instanceof Function) module.call(this);
					});
				}
				callback.call(this);

				$claw.$$CLAW_PAGES$$.iterate(function(index, $PAGE_ITERATION_OBJECT_9823){
					$claw.$$HISTORY_CLAW_PAGES$$[$PAGE_ITERATION_OBJECT_9823] = false;
				});
				$claw.$$HISTORY_CLAW_PAGES$$[newhash] = true;

			}
		}
		setInterval(validhash, 200);
	},
	//OBTENER TODOS LOS PARAMETROS DEL GET
	GETS : function(){
		var loc = document.location.href;
		var getString = loc.split('?')[1];
		var GET = getString.split('&');
		var get = {};//this object will be filled with the key-value pairs and returned.

		for(var i = 0, l = GET.length; i < l; i++){
	    	var tmp = GET[i].split('=');
	    	get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	},
	//obtener parametros del GET
	//claw.GET(parametro) obtiene los valores del parametro indicado
	GET : function(parametro){
		parametro = parametro.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + parametro + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	//Obtener api desde url externa. El resourse debe tener los encabezados
	/*
	ENCABEZADOS:
		header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
	    header("Access-Control-Allow-Credentials: true");
	    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	*/
	/*
	var json = claw.getApi("url");
	*/
	getApi : function(src){
		xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
		xhr.send();
		apiResponse = eval(xhr.responseText);
		return apiResponse;
	},
	//Se agrega css al html especificando la ruta del archivo
	//claw.embedCSS(src) => <style>...</style>
	embedCSS : function(src){
		claw.search("body").innerHTML += "<style>"+claw.embedTXT(src)+"</style>";
	},
	//Obtiene un HTML externo regresando un DOM listo para agregar a nuestro html
	embedHTML : function(src){
		return (new DOMParser()).parseFromString(claw.embedTXT(src), "text/html");
	},
	//Obtienes un texto externo
	embedTXT : function(src){
		xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
		xhr.send();
		return xhr.responseText;
	},
	//INCLUIR JAVASCRIPT: inclute javascript dentro de otro con un alias
	$include : function(library){
		src = $$LIBRARY_CONFIG_URL$$[library]
		if(src.indexOf(".js") == -1) src += ".js"
		xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
		xhr.send();
		eval(xhr.responseText);
	},
	//INCLUIR JAVASCRIPT: incluye javascript dentro de otro
	//claw.include("http://..."), $W.include("http://...")
	include : function(src){
		if(src.indexOf(".js") == -1) src += ".js"
		xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
		xhr.send();
		eval(xhr.responseText);
	},
	//BUSQUEDA EN EL DOM
	srchAll : function(query){
		return document.querySelectorAll(query);
	},
	searchAll : function(query){return claw.srchAll(query);},
	srch : function(query){
		return document.querySelector(query);
	},
	search : function(query){ return claw.srch(query); },
	grlsrch : function(query){
		if(query instanceof Array)
		{
			var doms = [];
			var index = 0;
			query.iterate(function(i,o){
				var it = claw.grlsrch(o);
				if(it instanceof Array){
					it.iterate(function(i2,item){
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
	generalSearch : function(query){return claw.grlsrch(query);},
	grlSearch : function(query){return claw.grlsrch(query);},
	gSearch : function(query){return claw.grlsrch(query);},
	//AJAX
	/* claw.ajax(
			"http://example.com/",
			{data:{"hola":"adios"}},
			//callback. La respuesta es "response" devuelve un texto cualquiera y success te regresa true o false si la conexion fue establecida o no
			function(response, success){
				if(success){
					console.log("success");
					console.log(response)
				}
				else{
					console.log(success);
				}
			}
		)
	*/
	ajax2 : function (url, json_request, callback){
		var ajax_request = new XMLHttpRequest();
		// Definimos una función a ejecutar cuándo la solicitud Ajax tiene alguna información
      	ajax_request.onreadystatechange = function() {
	        // see readyState es 4, proseguir
	        if (ajax_request.readyState == 4 ) {
				callback.call(ajax_request.responseText, ajax_request.success);
			}
		}
		ajax_request.open( "POST", url, true );
		// Establecer la cabecera Content-Type apropiada
		ajax_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		// Enviar la solicitud
		ajax_request.send( JSON.stringify(json_request) );
	},
	///
	/* claw.ajax({
		"url" : "http://example.com/",
		"data" : {
			"hola" : "adios",
			"ahora" : "luego",
			"six" : 6,
			"array" : [1,2,9,"aló"]
		},
		"start" : function(){
	
		},
		"success" : function(response){
	
		},
		"end" : function(){
	
		}
	});
	*/
	ajax : function (request){
		var ajax_request = new XMLHttpRequest();
		if(request.start) request.start.call();
		// Definimos una función a ejecutar cuándo la solicitud Ajax tiene alguna información
      	ajax_request.onreadystatechange = function() {
	        // see readyState es 4, proseguir
	        if (ajax_request.readyState == 4 ) {
				request.success.call(ajax_request.responseText, ajax_request.success);
			}
		}
		ajax_request.open( "POST", request.url, true );
		// Establecer la cabecera Content-Type apropiada
		ajax_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		// Enviar la solicitud
		ajax_request.send( JSON.stringify(request.data) );
		setTimeout(function(){if(request.end) request.end.call()},1500);
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
	a.iterate(...) <- tambien podemos iterar sobre el con el metodo iterate o claw.forEach
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
	},
	nothing : function(){
		throw "I told you, this function do nothing"
	},
	claw_config : function(src){
		if(src.indexOf(".claw") == -1) throw "NO .CLAW FOUNDED"
		xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
		xhr.send();
		eval(xhr.responseText);
	}
	
}

//// MODIFICACIONES A PROTOTIPOS


//Itera en un array incluidos los arreglos compuestos por nodos obtenidos del DOM
//EJEMPLO DE USO
/*
var all_a = document.querySelectorAll("a")
all_a.iterate(function(ind, obj){
	console.log(obj);
	console.log(ind)
});
*/
Object.prototype.iterate = function(callback, scope){
	if(!this.length) throw new TypeError((typeof this) + " isn't an Array, it is not possible to iterate.");
	for (var i = 0; i < this.length; i++){
		callback.call(scope, i, this[i])
	}
}

//Remplaza todas las coincidencias en un String
//"hola amigo".replaceAll("a","o")  =>  holo omigo
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

//Remueve el "nodo" del array que se especifique
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

///// Instancias a los metodos


///Objeto claw
$W = $CLAW = $claw = CLAW = claw;


//ESTADOS INICIALES
$CLAW.check404.call();
console.log("You are using ClawJS. Enjoy it!")
