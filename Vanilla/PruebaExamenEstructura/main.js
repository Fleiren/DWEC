"use strict";
import {traerDatos} from './biblioteca/datos.js';
window.onload = () => {

    if(typeof Storage !== "undefined"){
        const formulario = document.forms.agregarPlaneta;
        console.log(formulario);
        const opciones = document.getElementById("opciones");
        const listaPlanetas = document.getElementsByTagName("div")[1];
        let personajes = [];
        const url = "http://swapi.py4e.com/api/people";
        
        const obtenerPersonajes = async (url) => {
            try{
                personajes = await traerDatos(url);
            }catch(error){
                console.log(error.message);

            }
        }

        obtenerPersonajes(url);

        formulario.addEventListener("click", (evento)=>{
            if(evento.target.type === "button"){
                if(evento.target.nextElementSibling &&  evento.target.nextElementSibling.type === "button"){
                    let datosFormulario = recogerDatos(formulario);
                    validarDatos(datosFormulario) ? 
                        agregarPlaneta() :
                        mostrarError()
                }else{
                    console.log(listaPlanetas);
                    listaPlanetas.classList.remove("ocultar");
                }
            }
        }, false);
        

    }else{
        console.error("Tu navegador no soporta local storage.");
    }
}//fin de window.onload