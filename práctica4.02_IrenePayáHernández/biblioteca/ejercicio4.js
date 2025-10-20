"use strict";


//Como parámetro de entrada recibimos la ruta de la imagen, si quisieramos que fuera reutilizable podría ser buena idea que reciba también por parámetro 
//el nombre de la clase y el contenido de la etiqueta, si se hiciera así podrías reutilizarlo para insertar un div con lo que quieras dentro bastante fácil
//no se si eso sería buena práctica o es generalizar demasiado la función. 
const insertarImagen = (ruta) => {
    let contenedor = document.createElement('div');
    contenedor.classList.add("contenedorFotos");
    contenedor.innerHTML = `<h1>Carrusel</h1><img class="transicion" id="carrusel" src="${ruta}" alt="Un patito"></img>`;
    document.body.appendChild(contenedor);
}

//Recibimos la variable contador y las rutas de las imágenes, como la variable contador se actualiza fuera de éste método, tendrá cada vez un valor diferente.
//No se puede manejar dentro del método porque tendría siempre el mismo valor, habría que buscar que imagen hay ahora y la ruta del src cuando la llamas desde
//el body es diferente a la que tenemos en el array por lo que es poco fiable hacerlo así.
const carruselFotos = (contador, rutas) => {
	let elemento = document.getElementById("carrusel");
    elemento.classList.remove("transicion");
    elemento.classList.add("salida");

    //Para que se vea la transición necesito colocar aquí un timeout ya que al navegador no le da tiempo a hacer la transición (aún no controlo el css, seguro que se puede hacer de otra manera).
    //Para que se aprecien las transiciones hay que trastear con los tiempos del timeout.
    setTimeout(() => {
        elemento.src = rutas[contador];
        elemento.classList.remove("salida");
        elemento.classList.add("entrada");
        setTimeout(()=>{
            elemento.classList.remove("entrada");
            elemento.classList.add("transicion");
        }, 250);
    }, 500);
	
    
    
};

export { carruselFotos, insertarImagen };

