"use strict";
import {cargarLocalStorage, guardarPlanetas, eliminarPlanetaPorNombre, filtrarPlanetasNombre, cargarResidentes, traerDatos, obtenerPlanetaPorNombre} from './biblioteca/datos.js';
import {obtenerDatosFormulario, validarFormulario, crearPlaneta, insertarContenedorInformacion, mostrarMensajeExito, mostrarErrores, resetearContenedorInformacion, limpiarFormulario, generarPlantilla, plantillaResidentes} from './biblioteca/formulario.js';

window.onload = () => {
    
    const formulario = document.forms.agregarPlaneta;
    const listaPlanetas = document.getElementsByTagName("script")[0].previousElementSibling;
    const contenedorOpciones = document.getElementsByTagName("fieldset")[0].nextElementSibling; 
    const contenedorInformacion = insertarContenedorInformacion(formulario);
    const urlPlanetas = "https://swapi.py4e.com/api/planets/";
    let planetas = [];
    if(typeof Storage !== "undefined"){

        const cargarPlanetas = async () => {
            try{
                planetas = await cargarLocalStorage(urlPlanetas);        
            }catch(error){
                document.body.innerHTML="<h1>No se puede cargar la api.</h1>";
            }

            formulario.addEventListener(
                "click",
                (evento)=> {
                    if(evento.target.type === "button" && evento.target.nextElementSibling){
                        if(evento.target.nextElementSibling.type === "button"){
                                resetearContenedorInformacion(contenedorInformacion);
                            let datos = obtenerDatosFormulario(formulario);
                            if(validarFormulario(datos)){
                                planetas = [...planetas, crearPlaneta(datos)];
                                guardarPlanetas(planetas);
                                mostrarMensajeExito(contenedorInformacion);
                                setTimeout(()=>{
                                    resetearContenedorInformacion(contenedorInformacion);
                                }, 2000)
                                limpiarFormulario(formulario);
                            }else{
                                mostrarErrores(contenedorInformacion);                                             
                            }
                        } 
                    }else if(evento.target.type === "button"){
                        listaPlanetas.classList.remove("ocultar");
                        listaPlanetas.innerHTML = generarPlantilla(planetas);
                    }

                } , false)
        }
            
        const resetearDatos = async () => {
            try{
                planetas = await traerDatos(urlPlanetas);
                guardarPlanetas(planetas);
                listaPlanetas.innerHTML = generarPlantilla(planetas);
            }catch(error){
                listaPlanetas.innerHTML = "<h3>No se han podido resetear los planetas</h3>";
            }
        }

        const obtenerResidentes = async (nombrePlaneta) => {
            const contenedorPlaneta = document.getElementById(nombrePlaneta);
            console.log(contenedorPlaneta);
            try{
                let residentes = [];
                let planetaBuscar = obtenerPlanetaPorNombre(planetas, nombrePlaneta);
                residentes = await cargarResidentes(planetaBuscar.residents);
                contenedorPlaneta.insertAdjacentHTML("afterend", plantillaResidentes(residentes));
            }catch(error){
                console.error(error);
            }
        }

        cargarPlanetas();
        contenedorOpciones.addEventListener(
            "click",
             (evento)=>{
                if(evento.target.tagName === "BUTTON" && evento.target.nextElementSibling){
                    if(evento.target.nextElementSibling.tagName === "BUTTON"){
                        let busqueda = evento.target.previousElementSibling.value;
                        let filtro = planetas;
                    if(busqueda !== ""){
                        filtro = filtrarPlanetasNombre(planetas, busqueda); 
                        
                    }
                     
                    if(filtro.length === 0){
                        listaPlanetas.innerHTML = "<h1>No hay planetas que coincidan con la búsqueda.</h1>"
                    }else{
                        listaPlanetas.innerHTML = generarPlantilla(filtro);
                    }
                    }
                    
                }else if(evento.target.tagName === "BUTTON"){
                    resetearDatos();
                    
                }
             },
              false);

        listaPlanetas.addEventListener(
            "click",
            (evento)=>{
                if(evento.target.value==="eliminar"){
                    planetas = eliminarPlanetaPorNombre(planetas, evento.target.id);
                    listaPlanetas.innerHTML = generarPlantilla(planetas);
                }

                if(evento.target.value==="residentes"){
                    obtenerResidentes(evento.target.id);
                }
            },
            false
            
        )
        
    }else{

    }
}//fin de window.onload