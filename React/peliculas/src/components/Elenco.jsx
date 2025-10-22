import React from "react";
import "./elenco.css";
import Interprete from "./Interprete.jsx";

const Elenco = (props) => {
    const { elenco } = props;
    //En este componente se recorren los actores y se pintan llamando al componente Interprete.
    return(
        <>
        
        <div className="elenco_contenedor">
            <h1>Elenco</h1>
            <div className="actores">
                {elenco.map((actor, indice) => {
                return <Interprete key={indice} nombre={actor.nombre} foto={actor.foto} biografia={actor.biografia}></Interprete>
            })} 
            </div>
        </div>
        
        </>
    )
}

export default Elenco;