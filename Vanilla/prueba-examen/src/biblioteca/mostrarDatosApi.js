"use strict";
const mostrarPeliculas = (contenedor, peliculas) => {
    let contenido = generarPlantillaPeliculas(peliculas);
    if(contenido === ""){
        contenedor.innerHTML = "<p>No hay peliculas para mostrar.</p>";
    }else{
        contenedor.innerHTML = contenido;
    }
}

const generarPlantillaPeliculas = (peliculas) => {
    let plantilla = "";
    for(let pelicula of peliculas){
        plantilla += `<p class="pelicula" id="${pelicula.id}">${pelicula.titulo}</p>`
    }
    return plantilla;
}


const generarPlantillaDetalles = (pelicula) => {
    return `
    <div>
        <h3>${pelicula.titulo}</h3>
        <p>Año: ${pelicula.año}</p>
        <button id="personajes" value="${pelicula.id}">Cargar personajes</button>
    </div>
    `;
}

const mostrarDetalles = (contenedor, pelicula) => {
    contenedor.innerHTML = generarPlantillaDetalles(pelicula);
}

const mostrarPersonajes = (contenedor, personajes) => {
    let plantilla = "";
    for (let personaje of personajes){
        plantilla += `<p>${personaje.nombre}</p>`
    }
    contenedor.insertAdjacentHTML("beforeend", plantilla);
} 


export {mostrarPeliculas, generarPlantillaDetalles, generarPlantillaPeliculas, mostrarDetalles, mostrarPersonajes}