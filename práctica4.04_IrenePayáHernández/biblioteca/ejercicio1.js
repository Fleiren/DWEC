"use strict";

const bloquearContenido = () => {
	let cuerpo = document.body;
	//La variable nuevo guardará todo el string del contenido del docucmento para modificarlo.
	let nuevo = document.body.innerHTML;

	//El orden de las palabras en el array es importante ya que si coloco primero "sexual" todas las que sean "sexuales" se cambian dejando el es, es decir, quedaba "contenido bloqueadoes"
	//creo que son detalles que hay que tener en cuenta porque no nos damos cuenta.
	let palabrasSensibles = [
		"sexo",
		"Sexo",
		"SEXO",
		"sexuales",
		"Sexuales",
		"SEXUALES",
		"sexual",
		"Sexual",
		"SEXUAL",
	];

	//Vamos sustituyendo todas las palabras, lo hago dentro de una etiqueta strong ya que hay que aplicar una clase y aprovecho que hace negrita la letra para que resalte.
	for (const palabra of palabrasSensibles) {
		nuevo = nuevo.replaceAll(
			palabra,
			'<strong class="contenidoBloqueado">contenido bloqueado</strong>'
		);
	}
	cuerpo.innerHTML = nuevo;
};

export { bloquearContenido };
