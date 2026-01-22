"use strict";
import {actualizarMisionesLocalStorage, cargarMisionesLocalStorage, traerDatos, buscarPeliculaPorId, traerDatosUrls} from './biblioteca/datos.js';
import {generarContenedorInformacion, recogerDatosFormulario, crearMision, validarFormulario, mostrarError, mostrarExito, resetearInformacion, mostrarMisiones, filtrarMisionesPorNombre, eliminarMisionPorId} from './biblioteca/formulario.js';
import {mostrarPeliculas, mostrarDetalles, mostrarPersonajes} from './biblioteca/mostrarDatosApi.js';
window.onload = () => {
    const formulario = document.forms.formMision;
    const contenedorInformacion = generarContenedorInformacion(document.getElementsByClassName("botones")[0]);
    const inputBusqueda = document.getElementById("inputBusqueda");
    const contenedorMisiones = document.getElementById("contenedorMisiones");
    const seccionApi = document.getElementById("api-section");
    const listaPeliculas = document.getElementById("listaPeliculas");
    const detallePelicula = document.getElementById("detallePelicula");
    const urlPeliculas = "http://localhost:3000/peliculas";
    let peliculas = [];
    if(typeof Storage !== "undefined"){
        let misiones = cargarMisionesLocalStorage();   
        mostrarMisiones(contenedorMisiones, misiones); 
        formulario.addEventListener("click", (evento)=>{
            if(evento.target.type === "button"){
                
                if(evento.target.nextElementSibling && evento.target.nextElementSibling.type === "button"){
                    let datos = recogerDatosFormulario(formulario);
                    if(validarFormulario(datos)){
                        let mision = crearMision(datos);
                        misiones = [...misiones, mision];
                        actualizarMisionesLocalStorage(misiones);
                        mostrarExito(contenedorInformacion);
                        setTimeout(()=>{
                            resetearInformacion(contenedorInformacion);
                        }, 2000);
                        formulario.reset();
                        mostrarMisiones(contenedorMisiones, misiones);
                    }else{
                        mostrarError(contenedorInformacion);
                    }
                }else{
                    //por si acaso reseteamos el formulario y la información.
                    resetearInformacion(contenedorInformacion);
                    formulario.reset();
                    misiones = [];
                    actualizarMisionesLocalStorage(misiones);
                }
            }
        }, false);
let formato = Intl.NumberFormat("es-ES");
formato.format(45.4);
        contenedorMisiones.addEventListener("click", (evento)=>{
            if(evento.target.value === "eliminar"){
                let misionesActualizadas = eliminarMisionPorId(evento.target.id, misiones);
                misiones = misionesActualizadas;
                actualizarMisionesLocalStorage(misiones);
                mostrarMisiones(contenedorMisiones, misiones);
            }

        }, false);

        inputBusqueda.addEventListener("input", (evento)=>{
            if(evento.target.value === ""){
                mostrarMisiones(contenedorMisiones, misiones);
            }else{
                let resultadoBusqueda = filtrarMisionesPorNombre(evento.target.value, misiones);
                mostrarMisiones(contenedorMisiones, resultadoBusqueda);
            }
        }, false);

        //APARTADO API

        const obtenerPeliculas = async () => {
            try{
                peliculas = await traerDatos(urlPeliculas);
                if(peliculas.length !== 0){
                    mostrarPeliculas(listaPeliculas,peliculas);
                }else{
                    listaPeliculas.innerHTML="<p>No hay peliculas para mostrar.</p>";
                }
            }catch(error){
                listaPeliculas.innerHTML=`<p>${error.message}</p>`;
            }
        }

        const traerPersonajes = async (pelicula) => {
            try{
                let personajes = await traerDatosUrls(pelicula.personajes);
                mostrarPersonajes(detallePelicula, personajes);
            }catch(error){
                detallePelicula.innerHTML=`<p>${error.message}</p>`;
            }
        }
       
        seccionApi.addEventListener("click", (evento)=>{
            if(evento.target.id === "btnCargarAPI"){
                obtenerPeliculas();
            }
            if(evento.target.classList.contains("pelicula")){
                let pelicula = buscarPeliculaPorId(evento.target.id, peliculas);
                mostrarDetalles(detallePelicula ,pelicula);
                
            }
            if(evento.target.id === "personajes"){
                let pelicula = buscarPeliculaPorId(evento.target.value, peliculas);
                traerPersonajes(pelicula);
                
            }
        }, false);
    }else{
        console.error("Tu navegador no soporta localStorage")
         
    }
}//fin de window.onload