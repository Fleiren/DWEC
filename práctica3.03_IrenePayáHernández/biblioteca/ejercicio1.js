"use strict";

export const constructorCurso = (
	nombre,
	anyo,
	descripcion = "Sin descripción."
) => {
	return {
		nombre: nombre,
		anyo: anyo,
		descripcion: descripcion,
		alumnado: [],
	};
};
