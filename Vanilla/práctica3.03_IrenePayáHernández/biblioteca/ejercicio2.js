"use strict";

//Perdón, me he emocionado con este ejercicio.

/**
 * 
 * @param {Object} curso 
 */
export const mostrarCurso = (curso) => {
    console.log("Informe del curso:");
    for (let elemento in curso) {
        let valor = curso[elemento];
        let tipo = typeof valor;
		//Perdón por todo este lío de código, quería que se viera bonito y claro por pantalla, he tardado media vida en hacerlo y que quedara bien (voy a explicar lo que hace).
        //Si es de tipo function aparecera la palabra function en vez del contenido de la función.
		if(tipo === "function"){
            valor = "function";
		/*Si el contenido es un array iniciamos la transformación con map para que se vea bonito, dentro del array tenemos objetos
		por lo que usamos Object.entries para recorrerlos y darle un formato bonito, como no quiero que se vuelva a repetir lo de mostrar
		todo el contenido de la función, si dentro del objeto hay algún elemento que es una función evitamos como antes que aparezca el contenido
		en cambio si dentro hay un objeto devolvemos el objeto bonito con JSON.stringfy y por último se muestra la clave y valor para elementos normales.*/
        } else if (Array.isArray(valor)) {
            valor = valor
                .map(alumno =>
                    Object.entries(alumno)
                        .map(([key, value]) => {
                            if (typeof value === "function") return `  - ${key}: function`;
                            if (typeof value === "object" && value !== null) return `  - ${key}: ${JSON.stringify(value)}`;
                            return `  - ${key}: ${value}`;
                        })
                        .join("\n")
                )
                .join("\n");
        }

		//Lo del uso de charAt y slice creo que lo comento en otra ocasión, pero es para que se vea por pantalla con la primera letra en mayúsucla.
        console.log(
            `- ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n${valor}\nEl dato es de tipo ${tipo}.`
        );
    }
};
