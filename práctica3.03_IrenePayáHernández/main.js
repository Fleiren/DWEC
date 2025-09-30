"use strict";
import { constructorCurso } from "./biblioteca/ejercicio1y4.js";
import { mostrarCurso } from "./biblioteca/ejercicio2.js";
import { mostrarObjeto } from "./biblioteca/ejercicio5.js";

//Ejercicio 1
console.log("- Ejercicio 1 -");
let curso2Daw = constructorCurso(
	"2DAW",
	2025,
	"Desarrollo de aplicaciones web."
);
//Pruebo que el objeto se ha creado correctamente.
console.log(JSON.stringify(curso2Daw));

//Ejercicio 2 (añado \n porque me estaba liando al ver los datos por consola).
console.log("\n\n- Ejercicio 2 -");
mostrarCurso(curso2Daw);

//Ejercicio 3.
console.log("\n\n- Ejercicio 3 -");
let discente = {
	id: 1,
	nombre: "Irene",
	apellidos: "Payá Hernández",
	aficiones: ["Leer", "Tocar el piano", "Cantar"],
	notas: {
		primera: 7,
		segunda: 8.2,
		tercera: 8.5,
	},
	//Uso funciones regulares porque le veo más sentido para poder referenciar al objeto mismo con el this, no se si es buena práctica o aquí también debo usar funciones flecha.
	calcularMedia: function () {
		//Lo convierto otra vez a number para que tenga sentido el dato que nos devuelve esta función.
		return Number(
			(
				(this.notas.primera + this.notas.segunda + this.notas.tercera) /
				3
			).toFixed(2)
		);
	},
	imprimirAficiones: function () {
		console.log(
			`Aficiones:\n${this.aficiones
				.map((aficion) => `- ${aficion}.`)
				.join("\n")}`
		);
	},
	imprimirInforme: function () {
		console.log("- Informe del discente -");
		console.log(`Id: ${this.id}, es un dato de tipo ${typeof this.id}.`);
		console.log(
			`Nombre: ${this.nombre}, es un dato de tipo ${typeof this.nombre}.`
		);
		console.log(
			`Apellidos: ${this.apellidos}, es un dato de tipo ${typeof this
				.apellidos}.`
		);
		this.imprimirAficiones();
		console.log(`Es un dato de tipo ${typeof this.aficiones}.`);
		//Con Object.entries() se convierte el objeto en un array de arrays, lo he usado para poder usar map y mostrar por consola el objeto de forma más clara (seguro que hay mejores formas).
		console.log(
			`Notas:\n${Object.entries(this.notas)
				.map(([key, value]) => `- ${key}: ${value.toLocaleString("es-ES")}`)
				.join("\n")} \nEs un dato de tipo ${typeof discente.notas}.`
		);
		//Aquí uso replace porque no me funcionaba bien el método toLocaleString.
		console.log(
			`Media: ${this.calcularMedia().toLocaleString(
				"es-ES"
			)} es un dato de tipo ${typeof this.calcularMedia()}.`
		);
	},
};
//Compruebo que el objeto se ha creado correctamente.
console.log(discente);
/*Muestro el informe por consola, de esta manera también compruebo las funciones del objeto,
 no se si se buscaba hacer esto de otra forma porque el array de aficiones o el objeto de notas aparece como que son objetos, sin tipos por lo que no se si debía ser más concreta.*/
discente.imprimirInforme();

//Ejercicio 4.
//Utilizo el objeto creado en el ejercicio 1 utilizando el método mostrarCurso para que se vea más bonito.
console.log("\n\n- Ejercicio 4- ");
console.log("\nClase de 2 DAW sin alumnos.");
mostrarCurso(curso2Daw);

//Añadimos el discente.
curso2Daw.matricular(discente);

//Comprobamos que se ha añadido correctamente.
console.log("\n\nEl alumno ha sido añadido en la lista de alumnado.");
mostrarCurso(curso2Daw);

//Ejercicio 5.
console.log("\n\n- Ejercicio 5 -");
//Creamos un objeto complejo para probar.
let objetoComplejo = {
	id: 1,
	nombre: "Elantris",
	autor: "Brandon Sanderson",
	sinopsis: `Elantris es la primera novela publicada de Brandon Sanderson, situada en un mundo llamado Arelon, donde existía una ciudad mágica llamada Elantris. Hace años, Elantris era famosa por sus habitantes que poseían habilidades sobrenaturales y una apariencia casi divina, gracias a una magia llamada AonDor.
	\nUn día, sin explicación aparente, los habitantes comenzaron a sufrir una transformación horrenda: su piel se volvió gris y marchita, sus poderes desaparecieron y quedaron atrapados en la ciudad, que se volvió decadente y sombría. Nadie sabe por qué ocurrió esto, y la ciudad pasó de ser gloriosa a maldita.
	\nLa historia sigue la vida de tres personajes cuyas vidas se entrelazan con los secretos de Elantris y sus misterios.`,
	temas: [
		"Redención y esperanza frente a la desesperación.",
		"Política y religión como herramientas de poder.",
		"Magia y sus limitaciones",
		"Superación personal y liderazgo",
	],
	personajes: [
		{
			nombre: "Raoden",
			posicion: "Príncipe de Arelon.",
			caracteristicas: ["Carismático", "Ingenioso", "Optimista", "Valiente"],
		},
		{
			nombre: "Sarene",
			posicion: "Princesa de Teod.",
			caracteristicas: ["Inteligente", "Fuerte", "Estratégica"],
		},
		{
			nombre: "Hrathen",
			posicion: "Sacerdote de Shu-Dereth.",
			caracteristicas: ["Ambicioso", "Manipulador", "Fuerte carisma"],
		},
	],
	paginas: 592,
	aptoMenores: true,
};

//Probamos el método para mostrar el objeto.
mostrarObjeto(objetoComplejo);
