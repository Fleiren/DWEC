"use strict";

//He querido hacerlo en dos métodos distintos sin que se relacionen pero no he podido ya que al ser asincrono se cargaba primero el método que carga las imágenes
// y luego el que insertaba el div en el html por lo que el getElementById apuntaba a null, he decidido por ello separar todo en dos métodos para que no haya
//mucha lógica en uno pero que estén relacionados.

const carruselFotos = (contador, rutas) => {
	let elemento = document.getElementById("carrusel");
	elemento.src = rutas[contador];
};

export { carruselFotos };

/*
let contador = 0;
		//Lo ideal es hacer imagen.ssrc = imagenes[contador] pero haciendo console.log todo funcionaba perfecto pero no se mostraba en el navegador por lo que he decidido crear
		//un nuevo nodo cada vez, se que no es lo ideal. Hacer un nodo cada vez tamnpoco funciona por lo que voy a convertir las rutas en imágenes (no sabía que se podía hacer eso)
		//por lo visto al tener las imágenes precargadas si las carga (spoiler, no funciona). He dejado todo el desarrollo de las pruebas escrito para que se vea la evolución de este ejercicio
		//y también para que mi yo del futuro sepa todo lo que ya he probado. Ahora voy a probar recargando el div entero en cada intervalo, espero que sea la última prueba y funcione.
		//Sigue sin funcionar por lo que voy a volver a generar un array de imagenes para que ya estén precargadas(tampoco funciona), voy a probar que contador se calcule con el módulo.
		//Como sigue sin funcionar voy a añadirle la fecha a las imágenes para que sean tratadas como nuevas ya que según chatGPT puede ser que el navegador no las pinta al ver que ya se han usado.
		//Yo pensando que iba a funcionar jajajajaja.
		elemento.innerHTML = `<img id="imagen" src="${rutas[contador].src}" alt="un patito">`;
*/
