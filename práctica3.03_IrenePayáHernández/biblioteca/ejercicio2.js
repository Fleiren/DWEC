"use strict";

export const mostrarCurso = (curso) => {
	console.log("Informe del curso:");
	for (let elemento in curso) {
		console.log(
			`- El ${elemento} es ${
				curso[elemento]
			} y el dato es de tipo ${typeof curso[elemento]}.`
		);
	}
};
