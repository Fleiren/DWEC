"use strict";

import {
	minusculaMayuscula,
	nombresOrdenadosAlReves,
	convertirStringsAObjetos,
} from "./biblioteca/ejercicio1.js";
import {
	mayorQueCinco,
	generarArrayDiezNumerosAleatorios,
} from "./biblioteca/ejercicio2.js";
import {añadirApellidos, añadirCodigoDireccion, insertarUsuario, usuariosEspañaMayorEdadTemaClaro, usuariosMayoresEdad, usuarioYahoo, usuariosIncompletos} from "./biblioteca/ejercicio3.js";
import {mostrarObjeto} from "./biblioteca/utilObjetos.js";

//Ejercicio 1.
console.log("- Ejercicio 1 -");
let nombres = ["Irene", "Luis", "Aarón", "Carolina", "Francisco"];

//Utilizo map para que el array se muestre por pantalla más bonito.
//Nombres en mayúscula.
console.log("Nombres en mayúscula:");
console.log(minusculaMayuscula(nombres).map((nombre) => `- ${nombre}`).join("\n"));

//Nombres ordenados alfabéticamente en orden inverso.
console.log("Nombres ordenados alfabéticamente al revés:");
console.log(nombresOrdenadosAlReves(nombres).map((nombre) => `- ${nombre}`).join("\n"));

//convertir los nombres en objetos con id y nombre.
console.log("Nombres convertidos a objetos:");
console.log(
	convertirStringsAObjetos(nombres).map(
		(objeto) => `- id: ${objeto.id}, nombre: ${objeto.nombre}`
	).join("\n")
);

//Ejercicio 2.
console.log("\n- Ejercicio 2 -");
let numeros1 = generarArrayDiezNumerosAleatorios();
let numeros2 = generarArrayDiezNumerosAleatorios();
let numeros3 = generarArrayDiezNumerosAleatorios();

console.log("Números generados mayores que 5:");
//con join se muestra el array como una cadena de texto separada por comas.
console.log(mayorQueCinco([...numeros1, ...numeros2, ...numeros3]).join(", "));

//Ejercicio 3.

//Insertar usuario
const usuario = {
	nombre: "Aarón",
	preferencias: {tema: "oscuro", idioma: "español", edad: 19},
	contacto: {
		direccion: {
			calle: "Calle bonita, 15",
			localidad: "Petrer",
			pais: "España",
		},
		correoelectronico: "correodeaaron@gmail.com",
		telefono: "123456789",
	},
}

console.log("\n- Ejercicio 3 -");
//He usado el reduce porque quería probarlo la verdad, creo que he liado mucho la parte de formatear la salida.
console.log("- USUARIO NUEVO -");
console.log(insertarUsuario(usuario).reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS MAYORES DE EDAD -");
console.log(usuariosMayoresEdad().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS CON YAHOO -");
console.log(usuarioYahoo().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS ESPAÑOLES CON TEMA BLANCO Y MAYORES DE EDAD -");
console.log(usuariosEspañaMayorEdadTemaClaro().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS INCOMPLETOS -");
console.log(usuariosIncompletos().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS CON APELLIDO -");
console.log(añadirApellidos().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));
console.log("- USUARIOS CON CÓDIGO -");
console.log(añadirCodigoDireccion().reduce((string, usu) => string + `${mostrarObjeto(usu)}\n`, ""));



