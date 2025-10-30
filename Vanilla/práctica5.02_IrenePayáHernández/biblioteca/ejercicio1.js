"use strict"

const crearAcordeon = () => {
    let elemento = 1;
    const acordeon = document.createElement("div");
    for(let i=1 ; i <= 6 ; i++){
        if(i%2===0){
            const div = document.createElement("div");
            div.innerHTML=`Contenido del elemento ${elemento-1}`;
            div.classList.add("ocultar");
            acordeon.appendChild(div);
            
            
        }else{
            const div = document.createElement("div");
            div.innerHTML=`Elemento ${elemento}`;
            acordeon.appendChild(div);
            elemento++;
        }
    }

    document.body.appendChild(acordeon);
}

const mostrarContenido = (div) => {
    div.classList.toggle("ocultar");
}

const contarPosicion = (elemento) => {
    let anterior = elemento.previousElementSibling;
    let posicion = 1;
        while(anterior){
            posicion++;
            anterior = anterior.previousElementSibling;
        }
    return posicion; 
}


export {crearAcordeon, mostrarContenido, contarPosicion}