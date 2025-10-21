import React from "react";
import "./pelicula.css";

const Pelicula = (props) => {
    const{ titulo, cartelera, direccion, sinopsis } = props;

    return(
        <>
            <h1>{titulo}</h1>
            <div className="pelicula_contenedor">
                <img src={cartelera} alt={`Cartel de la pelicula ${titulo}`} />
                <div className="pelicula_datos">
                    <h3>Dirección: {direccion}</h3>
                    <p>Sinopsis: {sinopsis}</p>
                </div>
            </div>
        </>
    )


}

export default Pelicula;