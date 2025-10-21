"use strict";

/** Ejercicio 1 (constructor básico) y Ejercicio 4 (Añadir el método matricular). */

/**
 * 
 * @param {string} nombre 
 * @param {number} anyo 
 * @param {string} descripcion 
 * @returns {Object}
 */
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
		//Utilizo una función regular porque veo más lógico referirnos al objeto con this y no llamándolo desde fuera.
		matricular: function(discente) {
			this.alumnado = [...this.alumnado, discente];
		}
		/*¿Con un push (que se que no debo usar), en este caso no sería mejor ya que no estaríamos generando nuevos arrays constantemente? 
		Es decir, ¿Nos dices de hacerlo así por acostumbrarnos a trabajar con copias que es más seguro, pero en realidad en casos así es mejor un push o nunca será buena idea el push?*/
	};
};