"use strict";

const traerDatos = async (url) => {
    try{
        let respuesta = await fetch(url);
        if(respuesta.ok){
            let datos = await respuesta.json();
            return datos;
        }else{
            throw new Error("No se han podido cargar los datos de la api.");
        }
    }catch(error){
        throw error
    }
}

const traerDatosUrls = async (urls) => {
    try{
        let promesas = urls.map((url)=>{return traerDatos(url)});
        let datos = await Promise.allSettled(promesas);
        datos =  datos.map((dato)=>{return dato.value});
        return datos;
    }catch(error){
        throw error;
    }
}

const cargarMisionesLocalStorage = () => {
    let misiones = localStorage.getItem("misiones") ?
        JSON.parse(localStorage.getItem("misiones")):
        [];   
    return misiones;    
}

const actualizarMisionesLocalStorage = (misiones) => {
    localStorage.setItem("misiones", JSON.stringify(misiones));
}

const buscarPeliculaPorId = (id, peliculas) => {
    let pelicula =  peliculas.find((pelicula)=> {return id === pelicula.id});
    return pelicula;
}
export {cargarMisionesLocalStorage, actualizarMisionesLocalStorage, traerDatos, traerDatosUrls, buscarPeliculaPorId}