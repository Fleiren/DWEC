"use strict";

const fechaActual = (elementoAnyo) =>{
	if(elementoAnyo.tagName === "INPUT" || elementoAnyo.type === "number"){
		const hoy = new Date();
		elementoAnyo.max = hoy.getFullYear();
	}
}

const validarCampo = (campo) => {
	let valido = true;
	//Si tiene el atributo required y no tiene valor no es válido.
	if(campo.required && campo.value === "") valido = false;
	//Si tiene patrón y ya tiene el input algún valor comprobamos que lo cumple.
	if(campo.pattern && campo.value !== ""){
		//Si lo hago directamente con el string del pattern no funciona bien.
		const patron = new RegExp(campo.pattern);
		patron.test(campo.value) ? valido = true : valido = false;
	}
	//Los tipo input tienen un objeto que se llama validity que ayuda a comprobar si es válido, lo voy a usar solo para los input que validan ya de por si.
	if(campo.validity.typeMismatch) valido = false;
	return valido;
	
}

const validarFormulario = (campos) => {
	//En vez de devolver un booleano, devuelvo un array con los errores, si está vacío es porque el formulario es válido.
	let errores = [];
    for (let i = 0; i < campos.length; i++) {
        let campoActual = campos[i];
        // Validar solo si es obligatorio o tiene algún valor
        if (campoActual.required || campoActual.value !== "") { 
			if (!validarCampo(campoActual)){
				errores = [...errores, mensajeError(campoActual)];			
			} 
        }
    }	
    return errores;
}

const mensajeError = (campo) => {
	//Si me da tiempo añadiré todos los tipos de input, de momento solo colocaré los que necesito en este ejercicio.
	let mensaje = "";
	//Los elementos input cuentan con la propiedad label que devuelve los labels asociados, lo uso para que apraezca bien formateado el error.
	let label = campo.labels[0].innerText;
	label = label.substring(0, label.length - 1); //Le quito los dos puntos del final.

	if(campo.type === "number"){
		mensaje = `El campo ${label} debe ser un número.`;
	}
	else if(campo.type === "url"){
		mensaje = `El campo ${label} debe ser una URL válida.`;
	}
	else if(campo.required && campo.value === ""){
		mensaje=`El campo ${label} es obligatorio.`;
	}
	else if(campo.pattern){
		mensaje = `El campo ${label} no cumple los requisitos de formato.`;
	} else {
		mensaje = `El campo ${label} no es válido.`;
	}

	return mensaje;
}

const mostrarErrores = (errores, elementoError) => {
	let innerHTML = "";
	if(!(errores.length === 0) && elementoError){
		for (let i = 0; i < errores.length; i++) {
			innerHTML += `<p>${errores[i]}</p>`;
		}
	}
	elementoError.innerHTML = innerHTML;
}
export {fechaActual, validarCampo, validarFormulario, mostrarErrores};