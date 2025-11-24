"use strict";

console.log("doiasoijdaosijdaosijdasd");
const promesa = new Promise((resolver, rechazar) => {
	console.log("Comprobando datos...");
	setTimeout(() => {
		let numero = Math.floor(Math.random() * 101);
		if (numero % 2 === 0) {
			resolver(numero);
		} else {
			rechazar(new Error("El número es impar"));
		}
	}, 2000);
});

promesa
	.then((resultado) => {
		console.log(resultado);
	})
	.catch((error) => {
		console.log(error.menssage);
	});
