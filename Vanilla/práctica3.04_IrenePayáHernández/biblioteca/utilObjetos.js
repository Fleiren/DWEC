"use strict";

//Reutilizo un método de la práctica 3.03 modificado para que se muestren bien los objetos, devuelve un String con el formato bonito.
/**
 * 
 * @param {Object} objeto 
 * @returns {string}
 */
export const mostrarObjeto = (objeto) => {
    let objetoFormateado = "";
    for (const elemento in objeto) {
       let valor = objeto[elemento];
       let tipo = typeof valor;
       switch(tipo){
        case "string":
        case "boolean":
        case "number":
            objetoFormateado += `\t- ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n\t\t${valor}\n`;
            break;
        case "function":
            objetoFormateado += `\t- ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n\t\tfunction\n`;
            break;
        case "object":
            if(Array.isArray(valor)){
                objetoFormateado += `\t* ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n`;
                valor.map(elem => typeof elem === "object" ? objetoFormateado += mostrarObjeto(elem) : objetoFormateado`\t\t- ${elem}`).join("\n");
            }else{     
                objetoFormateado += `* ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n`       
                objetoFormateado += mostrarObjeto(valor);
            }
            break;
            
       }
        
    }

    return objetoFormateado;
   
}