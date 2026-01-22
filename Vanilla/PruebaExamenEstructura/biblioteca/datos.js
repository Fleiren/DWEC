"use strict";


const cargarLocalStorage = async (urlPlanetas) => {
    try{
        
        let planetas = localStorage.getItem("planetas") ? 
            JSON.parse(localStorage.getItem("planetas")):
            [];

        if(planetas.length === 0){
            planetas = await traerDatos(urlPlanetas);
            guardarPlanetas(planetas);
        }
        return planetas;
    }catch(error){
        throw error;
    }

   
}

const traerDatos = async (url) => {
    try{
        let resultado = await fetch(url);
        if(resultado.ok){
            const datos =  await resultado.json();
            if(datos.results){
                return datos.results;

            }
            return datos;
        }else{
            throw new Error("Error al obtener los datos de la api.");
        }
    }catch(error){
        throw error;
    }   
    
}

const guardarPlanetas = (planetas) => {
    localStorage.setItem("planetas", JSON.stringify(planetas));
}

const filtrarPlanetasNombre = (planetas, busqueda) => {
    planetas = planetas.filter((planeta)=>{ return planeta.name === busqueda});
    return planetas;
    
}

const obtenerPlanetaPorNombre = (planetas, nombre) => {
    return planetas.find((planeta)=>{return planeta.name === nombre});
}


const eliminarPlanetaPorNombre = (planetas, nombre) => {
    planetas = planetas.filter((planeta) => {return planeta.name !== nombre});
    guardarPlanetas(planetas);
    return planetas;
}

const cargarResidentes = async (urls) => {
    let promesas = urls.map((url)=>{return traerDatos(url)});
    let residentes = await Promise.allSettled(promesas);
    residentes = residentes.map((residente)=>{return residente.value});
    return residentes;
}

export {cargarLocalStorage, guardarPlanetas, filtrarPlanetasNombre, eliminarPlanetaPorNombre, cargarResidentes, traerDatos, obtenerPlanetaPorNombre}