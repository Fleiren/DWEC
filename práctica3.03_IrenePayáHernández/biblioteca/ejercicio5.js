"use strict";

/**
 * 
 * @param {Object} objeto 
 */
export const mostrarObjeto = (objeto) => {
     //¿Quedaría más bonito en consola que esto devolviera un string formateado bonito, no?¿Sería mala práctica?
    for (const elemento in objeto) {
       let valor = objeto[elemento];
       let tipo = typeof valor;
       switch(tipo){
        //Apilo estos tipos para reutilizar el código y no repetirme, pensaba que se podía hacer usando en un case distintas opciones separadas por comas pero por lo visto no se puede.
        case "string":
        case "boolean":
        case "number":
            console.log(`* ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\n${valor}\nEs de tipo ${tipo}\n\n`);
            break;
        case "function":
            console.log(`* ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)}:\nfunction\nEs de tipo ${tipo}\n\n`);
            break;
        case "object":
            if(Array.isArray(valor)){
                console.log(`* ${elemento.charAt(0).toUpperCase()}${elemento.slice(1)} (Array):\n`)
                //Uso una ternaria para comprobar si dentro del array hay objetos, si encuentra alguno que lo sea llamará de forma recursiva a la función.
                valor.map(elem => typeof elem === "object" ? mostrarObjeto(elem) : console.log(`- ${elem}\nEs de tipo ${typeof elem}`)).join("\n");
            }else{            
                mostrarObjeto(valor);
            }
            break;
            
       }
        
    }
   
}