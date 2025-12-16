"use strict";

let planetasPropios = [];
localStorage.getItem("planetas") ? JSON.parse(localStorage.getItem("planetas")) : JSON.stringify(localStorage.setItem("planetas", planetasPropios));

const traerDatos = async (url) => {
    try{
        let respuesta = await fetch(url);
        
        if(respuesta.ok){
            respuesta = await respuesta.json();
            return respuesta.results;
        }else{
            throw new Error("Se ha producido un error al traer los datos");
        }
    }catch(error){
        throw error;
    }

}





export {traerDatos}