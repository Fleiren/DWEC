import React from "react";
import "./interprete.css";

const Interprete = (props) => {
    //Este componente muestrá la información de cada actor.
    return (
        <>
            <div className="interprete_contenedor">
                <img
                    className="interprete_foto"
                    src={props.foto}
                    alt={props.nombre}
                ></img>
                <div className="interprete_datos">
                    <h2>{props.nombre}</h2>
                    <p>{props.biografia}</p>
                </div>
                
            </div>
        </>
    );
};

export default Interprete;