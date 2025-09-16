"use strict";

//Ejercicio 1, Estás gordo
/*
    He colocado como validación que sea mayor a cero porque no se que limites colocar 
    como altura válida y peso válido.
*/
export const imc = (masa, altura) => {
    if(isNaN(masa) || masa <= 0){
        return "Debe ser una masa válida.";
    }else if(isNaN(altura) || altura <= 0){
        return "Debe ser una altura válida.";
    }
    return (masa/(altura*altura));
}

//Ejercicio 2, Juego mejor que tú


export const calcularMedia = (equipo) => {
    let totalPuntos = 0;
    if(!Array.isArray(equipo)){
        return "Necesito una lista de puntuaciones";
    }
    equipo.forEach(element => {
        totalPuntos += element;
    });
    return totalPuntos / equipo.length;
}

export const resultadoEquipos = (mediaEquipoJuan, mediaEquipoMiguel) => {
    if(mediaEquipoJuan === mediaEquipoMiguel){
        return `Hay empate, la media de puntos del equipo de Juan es de ${mediaEquipoJuan} y la media de puntos del equipo de Miguel es de ${mediaEquipoMiguel} `;
    }else if(mediaEquipoJuan > mediaEquipoMiguel){
        return `Ha ganado el equipo de Juan con ${mediaEquipoJuan} puntos` 
    }else if(mediaEquipoMiguel > mediaEquipoJuan){
        return `Ha ganado el equipo de Miguel con ${mediaEquipoMiguel} puntos`

    }else{
        return `Necesito que me pases las medias`;
    }
}

//rediseño para que también acepte a María, voy a probar con arguments y así podrían participar todas las personas que quieran

export function resultadosEquiposIndefinidos(){
    //los parámetros de entrada serán arrays, se comprueba en el método calcularMedia
    arguments.forEach(equipo => {
        equipo = calcularMedia(equipo);
    })
    let equipoGanador = 0;
    arguments.forEach(media => {
        if(media > equipoGanador) equipoGanador = media; 
    })

    let empate = 0;
    arguments.forEach(media => {
        if(media == equipoGanador){
            empate++;
        }
    })

    if(empate >= 2){
        return `Hay empate en ${empate} equipos con ${equipoGanador} puntos`;
    }
    return `Ha ganado el equipo que tiene ${equipoGanador}`;

    //lo ideal sería tener un array bidimensional para manejar los nombres.

}
