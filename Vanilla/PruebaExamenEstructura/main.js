"use strict";
import { traerDatos } from "./biblioteca/datos.js";
import { crearPlantillaPersonajes } from "./biblioteca/formulario.js";
window.onload = () => {
	if (typeof Storage !== "undefined") {
		const formulario = document.forms.agregarPlaneta;
		const listaPlanetas = document.getElementsByTagName("div")[1];
		let personajesCargados = false;
		let personajes = [];
		const url = "https://swapi.py4e.com/api/people/";

		const obtenerPersonajes = async () => {
			console.log("ejecuto método");
			try {
				personajes = await traerDatos(url);
				personajesCargados = true;
				let plantilla = crearPlantillaPersonajes(personajes);

				let datalist = document.createElement("datalist");
				datalist.innerHTML = plantilla;
				console.log(datalist);
				formulario[1].insertAdjacentElement("afterend", datalist);
			} catch (error) {
				formulario.innerHTML = "";
			}
		};

		obtenerPersonajes();

		formulario.addEventListener(
			"click",
			(evento) => {
				if (evento.target.type === "button") {
					if (
						evento.target.nextElementSibling &&
						evento.target.nextElementSibling.type === "button"
					) {
					} else {
						console.log(listaPlanetas);
						listaPlanetas.classList.remove("ocultar");
					}
				}
			},
			false
		);
	} else {
		console.error("Tu navegador no soporta local storage.");
	}
}; //fin de window.onload
