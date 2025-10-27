"use strict";

const extraerActores = (peliculas) => {
    //Gracias a usar un Map puedo evitar actores repetidos ya que el key será el nombre del actor.
    const actores = new Map();

    for (const pelicula of peliculas) {
        for (const actor of pelicula.elenco) {
            if(!actores.has(actor.nombre)){
                actores.set(actor.nombre, {
                "nombre": actor.nombre,
                "foto": actor.foto,
                "biografia": actor.biografia,
                "peliculas":[
                    {"titulo":pelicula.titulo, "cartelera":pelicula.cartelera}
                ]
                });
            }else{
                const datosActor = actores.get(actor.nombre);
                datosActor.peliculas = [...datosActor.peliculas, {"titulo":pelicula.titulo, "cartelera":pelicula.cartelera}]
            }
            
        }

    }

    //Gracias a esto he conseguido evitar actores repetidos y de paso prácticar con los array de objetos.
        return Array.from(actores.values());
}

export {extraerActores}