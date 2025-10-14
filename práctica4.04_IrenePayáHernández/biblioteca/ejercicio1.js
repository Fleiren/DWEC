"use strict";

const bloquearContenido = () => {
	let cuerpo = document.body;
	let nuevo = document.body.innerHTML;
	let palabrasSensibles = [
		"sexo",
		"Sexo",
		"SEXO",
		"sexual",
		"Sexual",
		"SEXUAL",
		"sexuales",
		"Sexuales",
		"SEXUALES",
	];

	for (const palabra of palabrasSensibles) {
		nuevo = nuevo.replaceAll(
			palabra,
			'<strong class="contenidoBloqueado">contenido bloqueado</strong>'
		);
	}
	cuerpo.innerHTML = nuevo;
};
export { bloquearContenido };
