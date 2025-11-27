"use strict";
import {obtenerDatos, pintarTitulosPelicula, obtenerPeliculaPorId, pintarDatosPelicula} from "./biblioteca/biblioteca.js";
window.onload = () => {
const peliculas = document.getElementById("peliculas");
const contenedorInformacion = document.getElementById("informacion");
const url = "https://swapi.info/api/films";
const tipoDeDato = "json";
let datos = [];
    //Hay una opción que me ha dicho la IA que se llama Async IIFE que básicamente es una función que se ejecuta automaticamente sin llamarla.
    const cargarPagina = async () => {
        try{
            datos = await obtenerDatos(url, tipoDeDato);
            console.log(datos);          
            peliculas.innerHTML = pintarTitulosPelicula(datos);       
        }catch(error){
            contenedorInformacion.innerHTML=`<h1>${error.message}</h1>`
        }
        
    }
    cargarPagina();
    
    peliculas.addEventListener("click", (evento) => {
        console.log(datos);
        if(datos && datos.length !== 0 && evento.target.classList.contains("tituloPelicula")){
            let pelicula = obtenerPeliculaPorId(datos, evento.target.id);
            contenedorInformacion.innerHTML = pintarDatosPelicula(pelicula);
        }
    }, false);
    
    

    

} //Fin de window.onload