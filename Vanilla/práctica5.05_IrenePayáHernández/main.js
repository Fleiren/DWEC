"use strict";
import {
	validarCampo,
	validarFormulario,
	añadirErrores,
	obtenerInputs,
	crearDiscoJSON,
	guardarDisco,
	mostrarDiscos,
	buscarDisco,
	mostrarBusqueda,
	mostrarErrorBusqueda,
	eliminarDiscoPorId,
	
} from "./biblioteca/biblioteca.js";
//Me habría gustado darle más vueltas a esta práctica, creo que se puede hacer mucho mejor.
window.onload = () => {
	//Comprobamos que el navegador soporta localStorage para ejecutar el código.
	if(typeof Storage !== "undefined"){
	const formularioDisco = document.forms.agregarDisco;
	const contenedorDiscos = document.getElementById("discos");
	const opciones = document.getElementById("opciones");
	const inputBuscar = document.getElementById("inputBuscar");
	//Para que si mostrar está activado se actualice la lista al añadir un nuevo disco.
	let mostrar = false;
	//Lo mismo que con mostrar, si la lista que se muestra está ahora mismo queremos que se actualice pero con el filtro.
	let buscar = false;
	//Al colocarla fuera del evento puedo utilizar esa busqueda en otro evento, no se si es buena práctica.
	let busquedaActual = [];
	//Obtenemos todos los elementos interactuables del formulario para aplicar de forma más comoda los elementos div de error (Podría haberlos puesto directamente en el html la verdad).
	const inputs = obtenerInputs(formularioDisco);
	añadirErrores(inputs);
	//Lo he separado en dos eventos porque los select no funcionan bien con input y si pongo los input en el evento change se ponen en rojo solo cuando pierden el foco y no es lo que quiero.
	formularioDisco.addEventListener(
		"input",
		(evento) => {
			//Para que no se aplique al checkbox
			if (
				evento.target.tagName === "INPUT" &&
				evento.target.id !== "inputPrestado"
			) {
				//Cada vez que se realice un cambio se valida el campo y se activa la clase de error hasta que el campo sea válido.
				validarCampo(evento.target)
					? evento.target.classList.remove("error")
					: evento.target.classList.add("error");
			}
		},
		false
	);
	formularioDisco.addEventListener(
		"change",
		(evento) => {
			if (evento.target.tagName === "SELECT") {
				//Le colocamos la clase de error si no es válido.
				validarCampo(evento.target)
					? evento.target.classList.remove("error")
					: evento.target.classList.add("error");
			}
		},
		false
	);

	formularioDisco.addEventListener(
		"click",
		(evento) => {
			if (evento.target.id === "guardar") {
				//Si el formulario es válido convertimos los datos del formulario en un objeto JSON y lo guardamos en localStorage.
				if (validarFormulario(formularioDisco)) {
					guardarDisco(crearDiscoJSON(formularioDisco));
					//Reseteamos el contenido del formulario.
					formularioDisco.reset();
					
					//Si se están mostrando los discos pero sin filtro se actualizará la lista.
					if(mostrar && !buscar){
						mostrarDiscos(contenedorDiscos);
					//Si se está mostrando la lista pero con un filtro entonces se actualizará el filtro y como el resultado está guardado en una variable que está fuera del eventListener puedo evitar declararla otra vez y buscar el filtro.
					}else if(mostrar && buscar){
						mostrarBusqueda(contenedorDiscos, busquedaActual);
					}
				}
			}
			if (evento.target.id === "mostrar"){
				mostrar = true; //Así puedo actualizar los datos en tiempo real cuando se guarda un disco nuevo si está la opción de mostrar activada.
				mostrarDiscos(contenedorDiscos);
			} 
				
			
		},
		false
	);

	opciones.addEventListener(
		"click",
		(evento) => {
			if(evento.target.id === "buscar"){
				buscar = true;//Activamos la acción de buscar.
				//La busqueda es por nombre, género, grupo/interprete, fecha y localización.
				busquedaActual = buscarDisco(inputBuscar.value);
				//Se podría aprovechar mostrarDiscos seguro.
				resultado.length !== 0 ? mostrarBusqueda(contenedorDiscos, busquedaActual) : mostrarErrorBusqueda(contenedorDiscos);
				
			}
			//Entiendo que limpiar hace que se muestren todos los discos sin ningún filtro ya que el enunciado dice que debe hacer que tenga su formato original (es que me suena haber escuchado de gente que borra todos los discos, supongo que he oido mal).
			if(evento.target.id === "limpiar"){
				buscar = false;//Ahora no hay un filtro activado.
				mostrarDiscos(contenedorDiscos);
			}
		},
		false
	);

	contenedorDiscos.addEventListener(
		"click",
		(evento) => {
			if(evento.target.id === "botonEliminar"){
				//El valor de cada botón es el valor del id del disco.
				eliminarDiscoPorId(evento.target.value);
				//Actualizamos la vista de los discos.
				mostrarDiscos(contenedorDiscos);
			}
		},
		false
	)
	}else{
		console.error("El navegador no soporta la API localStorage.");
	}
}; //fin de window onload.
