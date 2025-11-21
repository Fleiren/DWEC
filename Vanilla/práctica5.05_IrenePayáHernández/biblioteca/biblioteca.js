"use strict";
//Guardamos los patrones para que sean más accesibles (los nombres coinciden con el campo name de los input).
const patrones = {
	nombre: /.{5,}/,
	caratula: /^https?:\/\//, //No me iba por lo de escapar las barras (En la práctica dice que no es necesario validarlo pero por probar las expresiones lo he hecho).
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^ES-\d{3}[A-Z]{2}$/,
};

//Guardamos como hacemos con los patrones, un mensaje de error por input.
const errores = {
	nombre: "El nombre debe tener al menos 5 caracteres.",
	caratula: "La URL de la carátula debe ser válida.",
	grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
	anyo: "El año debe ser de 4 cifras.",
	genero: "Debes seleccionar un género.",
	localizacion: "La localización debe tener el formato ES-123AA. (ES, guión medio, tres números y dos letras mayúsculas).",
};
let discos = [];
//Damos un valor inicial si aún no está creado en localStorage el array de discos.
localStorage.getItem("discos") ? discos = JSON.parse(localStorage.getItem("discos")) : localStorage.setItem("discos", JSON.stringify(discos));

/**
 * Devuelve el año actual
 * @returns {Number} 
 */
const fechaActual = () => {
	const hoy = new Date();
	return hoy.getFullYear();
};

/**
 * Filtra los elementos de un formulario (para que sea un método genérico debería filtrarse todo tipo de elemento interactuable).
 * @param {HTMLElement} formulario 
 * @returns {Array} Devuelve solo los elementos del formulario que son tipo input o select.
 */
const obtenerInputs = (formulario) => {
	let elementos = formulario.elements;
	//Con inputs me refiero a secciones con las que el usuario interactua para realizar "inputs".
	let inputs = [];
	for (let i = 0; i < elementos.length; i++) {
		//Para este formulario en concreto solo necesitamos obtener los input y los select.
		if (elementos[i].tagName === "INPUT" || elementos[i].tagName === "SELECT") {
			inputs = [...inputs, elementos[i]];
		}
	}
	
	return inputs;
};

/**
 * Añade un mensaje de error en el código HTML tras cada input. 
 * @param {Array} inputs 
 */
const añadirErrores = (inputs) => {
	for (let i = 0; i < inputs.length; i++) {
		//Por si acaso hay algún null.
		if (inputs[i]) {
			const div = document.createElement("div");
			//Añadimos la clase que le dará diseño y la clase que lo mantendrá oculto ya que hasta que no se produzca un error no se muestra.
			div.classList.add("mensajeError", "ocultar");
			inputs[i].insertAdjacentElement("afterend", div);
		}
	}
};

/**
 * Recibe un campo y lo valida, es específico para el fomulario de los discos.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarCampo = (campo) => {
	//Este método lo utilizo para hacer las validaciones instantaneas, es el método que se activa en los eventos input y change.
	let valido = true;
	if (campo) {
		let nombreCampo = campo.name;
		//He usado un switch porque pienso que no lo usamos nunca y que para varias opciones como en este caso es para lo que está diseñado ¿Es así? es que no lo uso nunca.
		switch (nombreCampo) {
			case "nombre":
				valido = validarNombre(campo);
				break;
			case "caratula":
				valido = validarCaratula(campo);
				break;
			case "grupo":
				valido = validarGrupo(campo);
				break;
			case "anyo":
				valido = validarAnyo(campo);
				break;
			case "genero":
				valido = validarGenero(campo);
				break;
			case "localizacion":
				valido = validarLocalizacion(campo);
				break;
			default:
				valido = false;
				break;
		}
	}
	return valido;
};

/**
 * Recibe un formulario y revisa cada uno de los campos, devuelve un boolean indicando si es válido o no.
 * @param {HTMLElement} formulario 
 * @returns {boolean}
 */
const validarFormulario = (formulario) => {
	let valido = true;
	//Así evito que los errores se mantengan aunque esté bien el campo o que se acumulen.
	limpiarErrores(formulario);
	//No me gusta que se repita tanto el código, le daré vueltas si tengo tiempo ya que al tenerlo todo super generalizarlo y tener que cambiarlo ahora me hace tener tiempo justo.
	if (!validarNombre(formulario.nombre)) {
		mostrarError(formulario.nombre);
		valido = false;
	}
	if (!validarCaratula(formulario.caratula)) {
		mostrarError(formulario.caratula);
		valido = false;
	}
	if (!validarGrupo(formulario.grupo)) {
		mostrarError(formulario.grupo);
		valido = false;
	}
	if (!validarAnyo(formulario.anyo)) {
		mostrarError(formulario.anyo);
		valido = false;
	}
	if (!validarGenero(formulario.genero)) {
		//Te pido disculpas ya de antemano porque llevo una hora peleandome con el input number que siempre me daba error y con la validación del año y todo daba error por culpa de que aquí tenía mostrarError(formulario.anyo),
		//por lo que si el género daba error se mostraba el mensaje del año, yo pensaba que el error era en la validación del año y no, era aquí pero no me da tiempo a poner otra vez el input como tipo number y cambiar las validaciones y todo otra vez.
		mostrarError(formulario.genero);
		valido = false;
	}
	if (!validarLocalizacion(formulario.localizacion)) {
		mostrarError(formulario.localizacion);
		valido = false;
	}
	return valido;
};

//No me convence esto de tanto método con prácticamente lo mismo... ¿luego los métodos se generalizan un poco de alguna manera en la vida real no?
/**
 * Valida el campo nombre.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarNombre = (campo) => {
	let patron = patrones.nombre;
	//Con dos métodos extraigo código que se iba a repetir en todos los métodos siguientes.
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Valida el campo carátula.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarCaratula = (campo) => {
	let patron = patrones.caratula;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Valida el campo grupo/intérprete.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarGrupo = (campo) => {
	let patron = patrones.grupo;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Valida el campo año.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarAnyo = (campo) => {
	//Esta validación no ha quedado bien al final por el problema que he mencionado antes.
	let valido = true;
	let patron = patrones.anyo;

	//Dejo mi comentario de desesperación:
	//Curioso, para los input type number al usar validity si está vacío da error siempre sea required o no, llevo una hora sin exagerar intentando arreglarlo pero la única solución es convertir el input number en uno de tipo texto,
	//me da rabia porque si tenemos un input de tipo number es para usarlo en estos casos, si este problema tiene solución me gustaría saberlo.
	//Creo que esto ha quedado muy feo, si me da tiempo le daré otra vuelta, llevo mucho tiempo con esto y con que funcione ahora mismo me sobra.
	if (campo.value === "" && campo.required) valido = false;

	if (campo.value !== "") {
		const valor = parseInt(campo.value);
		if (isNaN(valor)) valido = false;
		if (!validarPatron(campo.value, patron)) valido = false;
		if (valor > fechaActual() || valor < 1850) valido = false;
	}

	return valido;
};

/**
 * Valida el campo género musical.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarGenero = (campo) => {
	//Este no tiene patrón ya que no se valida mediante patrón, con la validación básica nos sobra.
	return validarBasico(campo);
};

/**
 * Valida el campo localización.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarLocalizacion = (campo) => {
	let patron = patrones.localizacion;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Hace una validación básica del campo que recibe por parámetro de entrada.
 * @param {HTMLElement} campo 
 * @returns {boolean}
 */
const validarBasico = (campo) => {
	let valido = true;
	//De forma genérica validamos lo básico, que cumpla las normas del propio elemento con validity y que si es required que contenga valor.
	if (campo.required && !campo.value) valido = false;
	//Añado validación del propio input para reforzar la validación.
	//Suponía que de alguna forma se podía acceder a las validaciones propias del input de alguna manera y como no encontraba nada (y soy cabezona) le he preguntado a la IA si se podía y me ha enseñado el método validity de los inputs.
	//Es difícil de encontrar porque cuando haces console.log hay muchas propiedades, es una locura.
	//Supongo que cuantas más cosas se puedan validar mejor.
	if (campo.value !== "" && !campo.validity.valid) valido = false;
	return valido;
};

/**
 * Valida si el string pasado por parámetro cumple el patrón.
 * @param {string} valor 
 * @param {RegExp} patron 
 * @returns 
 */
const validarPatron = (valor, patron) => {
	//Si el valor está vacío se da como válido porque los campos opcionales no deben dar error si se comprueba el patrón estando vacíos, por ello se hace antes una validación básica comprobando si pueden o no estar vacíos.
	//Solo se comprueba el patrón si el campo tiene contenido ya que si llega hasta aquí vacío se entiende que es por ser opcional.
	let valido = true;
	if (valor !== "") valido = patron.test(valor);
	return valido;
};

/**
 * Activa el elemento de error de ese campo que se ha pasado por parámetro de entrada.
 * @param {HTMLElement} campo 
 */
const mostrarError = (campo) => {
	//Por si acaso no se ha creado bien el div de error y hay un elemento inesperado comprobamos que tenga la clase mensajeError.
	if (campo.nextSibling.classList.contains("mensajeError")) {
		//Se añade la clase de error también al campo.
		campo.classList.add("error");
		//Obtenemos el contenedor error.
		let error = campo.nextSibling;
		error.classList.remove("ocultar");
		//Añadimos el error correspondiente del objeto errores, los nombres de los campos coinciden con el de los objetos errores y patrones.
		error.innerHTML = errores[campo.name];
	}
};

/**
 * Obtiene todos los contenedores de error del formulario y los reinicia.
 * @param {HTMLElement} formulario 
 */
const limpiarErrores = (formulario) => {
	//Lo convertimos a Array para poder aplicar un filter.
	let arrayFormulario = Array.from(formulario.children);
	//Obtenemos solo los contenedores.
	let divErrores = arrayFormulario.filter((elemento) =>
		elemento.classList.contains("mensajeError")
	);

	//Vaciamos y ocultamos todos los contenedores de error.
	for (const div of divErrores) {
		div.classList.add("ocultar");
		div.innerHTML = "";
	}
};

/**
 * Recoge los datos del formulario y los convierte en un objeto tipo JSON.
 * @param {HTMLElement} formulario 
 * @returns {Object}
 */
const crearDiscoJSON = (formulario) => {
	//Generamos la id.
	let idDisco = generarId();
	return {
		id: idDisco,
		nombre: formulario.nombre.value,
		caratula: formulario.caratula.value,
		grupo: formulario.grupo.value,
		anyo: formulario.anyo.value,
		genero: formulario.genero.value,
		localizacion: formulario.localizacion.value,
		prestado: formulario.prestado.checked,
	};
};

/**
 * Actualiza el Array de discos y el localStorage con el disco nuevo que se pasa por parámetro.
 * @param {Object} discoJSON 
 */
const guardarDisco = (discoJSON) => {
	//Llamar a un método para comprobar que la balda no esté ocupada o que coincidan todos los campos antes de guardarlo (si me da tiempo).
	discos = [...discos, discoJSON];
	actualizarLocalStorage();

	
};

/**
 * Obtiene el id del último disco para saber cual debe ser el siguiente.
 * @returns {Number} 
 */
const generarId = () => {
	//Podría haber buscado un generador de id o algo más profesional.
	//Por defecto la id vale 1 ya que si no hay discos aún, ese es el valor que debe tener la id.
	let id = 1;
	if(discos.length !== 0){
		let ultDisco = discos[discos.length-1];
		id = parseInt(ultDisco.id) + 1
	}	
	return id;
}

/**
 * Muestra en el contenedor que recibe por parámetro todos los discos almacenados.
 * @param {HTMLElement} contenedorMostrar 
 */
const mostrarDiscos = (contenedorMostrar) => {
	//Limpiamos el contenido del contenedor para que no se repitan.
	contenedorMostrar.innerHTML = "";
	//Uso forEach porque solo voy a mostrar los datos, no necesito que me devuelva algo.
	discos.forEach((disco) => {
		imprimirDisco(contenedorMostrar, disco);
	});
};

/**
 * Añade al contenedor donde se van a mostrar todos los discos el disco pasado por parámetro.
 * @param {HTMLElement} contenedorMostrar 
 * @param {Object} disco 
 */
const imprimirDisco = (contenedorMostrar, disco) => {
	const discoHtml = generarHTMLDisco(disco);
	contenedorMostrar.appendChild(discoHtml);
};

/**
 * Convierte un objeto tipo JSON en un elemento de HTML bien estructurado para poder añadirlo al HTML.
 * @param {Object} disco 
 * @returns 
 */
const generarHTMLDisco = (disco) => {
	//Voy a prerarar el html por partes con varias variables para que se entienda el código (Es una locura de método, lo siento).
	const contenedorDisco = document.createElement("div");
	const datosPrincipales = document.createElement("div");
	const informacionAdicional = document.createElement("div");
	contenedorDisco.classList.add("disco");
	datosPrincipales.classList.add("contenidoPrincipal");
	informacionAdicional.classList.add("infoAdicional");
	if (disco.caratula) {
		const caratula = document.createElement("img");
		caratula.src = disco.caratula;
		caratula.alt = "Carátula del disco";
		datosPrincipales.appendChild(caratula);
	}
	const nombre = document.createElement("h2");
	nombre.innerText = disco.nombre;
	datosPrincipales.appendChild(nombre);
	const grupo = document.createElement("h3");
	grupo.innerText = disco.grupo;
	datosPrincipales.appendChild(grupo);
	if (disco.anyo) {
		const anyo = document.createElement("p");
		anyo.innerText = `Año: ${disco.anyo}`;
		informacionAdicional.appendChild(anyo);
	}
	const genero = document.createElement("p");
	genero.innerText = `Género musical: ${disco.genero}`;
	informacionAdicional.appendChild(genero);
	if (disco.localizacion) {
		const localizacion = document.createElement("d");
		localizacion.innerText = `Localización en la estantería: ${disco.localizacion}`;
		informacionAdicional.appendChild(localizacion);
	}
	const prestado = document.createElement("p");
	let mensajePrestado = "";
	disco.prestado
		? (mensajePrestado = "El disco es prestado")
		: (mensajePrestado = "El disco es nuevo");
	prestado.innerText = mensajePrestado;
	informacionAdicional.appendChild(prestado);

	const botonEliminar = document.createElement("input");
	botonEliminar.id = "botonEliminar";
	botonEliminar.value = disco.id;
	botonEliminar.type = "image";
	botonEliminar.src  = "./biblioteca/basura.png";
	botonEliminar.alt = "Eliminar";
	informacionAdicional.appendChild(botonEliminar);
	contenedorDisco.appendChild(datosPrincipales);
	contenedorDisco.appendChild(informacionAdicional);
	return contenedorDisco;
};

//A partir de aquí no me ha dado tiempo a terminar el javaDoc porque son las 23:55, debería dejar de ser tan perfeccionista porque tardo demasiado.
/**
 * 
 * @param {*} dato 
 * @returns 
 */
const buscarDisco = (dato) => {
	let resultado = [];
	resultado = discos.filter((disco) => disco.nombre === dato || disco.genero === dato || disco.localizacion === dato || disco.anyo === dato || disco.grupo === dato);
	return resultado;
}

/**
 * 
 * @param {*} contenedor 
 * @param {*} resultado 
 */
const mostrarBusqueda = (contenedor, resultado) =>{
	contenedor.innerHTML = "";
	resultado.forEach((disco) => {
		imprimirDisco(contenedor, disco);
	});
}

/**
 * 
 * @param {*} contenedor 
 */
const mostrarErrorBusqueda = (contenedor) => {
	contenedor.innerHTML = "<h1>No hay resultados para esa busqueda</h1>";
}

/**
 * 
 * @param {*} id 
 */
const eliminarDiscoPorId = (id) => {
	//Si tengo tiempo el confirm lo haré yo con un div.
	confirm("¿Estás seguro de que quieres eliminar el disco?") && (discos = discos.filter((disco) => disco.id !== parseInt(id)));
	actualizarLocalStorage();
	
}

/**
 * 
 */
const actualizarLocalStorage = () => {
	localStorage.setItem("discos", JSON.stringify(discos));
}
export {
	validarCampo,
	validarFormulario,
	añadirErrores,
	fechaActual,
	obtenerInputs,
	crearDiscoJSON,
	guardarDisco,
	mostrarDiscos,
	buscarDisco,
	mostrarBusqueda,
	mostrarErrorBusqueda,
	eliminarDiscoPorId,
	
};
