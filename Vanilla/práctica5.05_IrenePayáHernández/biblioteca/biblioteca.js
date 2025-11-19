"use strict";
const patrones = {
	nombre: /.{5,}/,
	caratula: /^https?:\/\//, //No me iba por lo de escapar las barras.
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^ES-\d{3}[A-Z]{2}$/,
};

const errores = {
	nombre: "El nombre debe tener al menos 5 caracteres.",
	caratula: "La URL de la carátula debe ser válida.",
	grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
	anyo: "El año debe ser de 4 cifras.",
	genero: "Debes seleccionar un género.",
	localizacion:
		"La localización debe tener el formato ES-123AA. (ES, guión medio, tres números y dos letras mayúsculas).",
};

let discos = [];

const fechaActual = () => {
	const hoy = new Date();
	return hoy.getFullYear();
};
const añadirErrores = (inputs) => {
	for (let i = 0; i < inputs.length; i++) {
		//Por si acaso hay algún null.
		if (inputs[i]) {
			const div = document.createElement("div");
			div.classList.add("mensajeError", "ocultar");
			inputs[i].insertAdjacentElement("afterend", div);
		}
	}
};

const obtenerInputs = (formulario) => {
	let elementos = formulario.elements;
	let inputs = [];
	for (let i = 0; i < elementos.length; i++) {
		if (elementos[i].tagName === "INPUT" || elementos[i].tagName === "SELECT") {
			inputs = [...inputs, elementos[i]];
		}
	}

	return inputs;
};
const validarCampo = (campo) => {
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
		//por lo que si el género daba error se mostraba el mensaje del año por lo que yo pensaba que el error era en la validación del año y no, era aquí.
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
const validarNombre = (campo) => {
	let patron = patrones.nombre;
	//Con dos métodos extraigo código que se iba a repetir en todos los métodos siguientes.
	return validarBasico(campo) && validarPatron(campo.value, patron);
};
const validarCaratula = (campo) => {
	let patron = patrones.caratula;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};
const validarGrupo = (campo) => {
	let patron = patrones.grupo;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};
const validarAnyo = (campo) => {
	let valido = true;
	let patron = patrones.anyo;
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
const validarGenero = (campo) => {
	//Este no tiene patrón ya que no se valida mediante patrón, con la validación básica nos sobra.
	return validarBasico(campo);
};
const validarLocalizacion = (campo) => {
	let patron = patrones.localizacion;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

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

const validarPatron = (valor, patron) => {
	//Si el valor está vacío se da como válido porque los campos opcionales no deben dar error si se comprueba el patrón estando vacíos, por ello se hace antes una validación básica comprobando si pueden o no estar vacíos.
	//Solo se comprueba el patrón si el campo tiene contenido ya que si llega hasta aquí vacío se entiende que es por ser opcional.
	let valido = true;
	if (valor !== "") valido = patron.test(valor);
	return valido;
};

const mostrarError = (campo) => {
	if (campo.nextSibling.classList.contains("mensajeError")) {
		campo.classList.add("error");
		let error = campo.nextSibling;
		error.classList.remove("ocultar");
		error.innerHTML = errores[campo.name];
	}
};

const limpiarErrores = (formulario) => {
	let arrayFormulario = Array.from(formulario.children);
	let divErrores = arrayFormulario.filter((elemento) =>
		elemento.classList.contains("mensajeError")
	);
	for (const div of divErrores) {
		div.classList.add("ocultar");
		div.innerHTML = "";
	}
};

const crearDiscoJSON = (formulario) => {
	return {
		nombre: formulario.nombre.value,
		caratula: formulario.caratula.value,
		grupo: formulario.grupo.value,
		anyo: formulario.anyo.value,
		genero: formulario.genero.value,
		localizacion: formulario.localizacion.value,
		prestado: formulario.prestado.checked,
	};
};
const guardarDisco = (discoJSON) => {
	//Llamar a un método para comprobar que la balda no esté ocupada o que coincidan todos los campos antes de guardarlo (si me da tiempo).
	discos = [...discos, discoJSON];
	console.log(discos);
};

const mostrarDiscos = (contenedorMostrar) => {
	//Limpiamos el contenido del contenedor para que no se repitan.
	contenedorMostrar.innerHTML = "";
	//Uso forEach porque solo voy a mostrar los datos, no necesito que me devuelva algo.
	discos.forEach((disco) => {
		imprimirDisco(contenedorMostrar, disco);
	});
};
const imprimirDisco = (contenedorMostrar, disco) => {
	const discoHtml = generarHTMLDisco(disco);
	contenedorMostrar.appendChild(discoHtml);
};

const generarHTMLDisco = (disco) => {
	//Voy a prerarar el html por partes con varias variables para que se entienda el código.
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

	contenedorDisco.appendChild(datosPrincipales);
	contenedorDisco.appendChild(informacionAdicional);
	return contenedorDisco;
};

export {
	validarCampo,
	validarFormulario,
	añadirErrores,
	fechaActual,
	obtenerInputs,
	crearDiscoJSON,
	guardarDisco,
	mostrarDiscos,
};
