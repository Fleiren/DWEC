import React from "react";
import "./interprete.css";

const Interprete = (props) => {
    return (
        <>
            <div className="interprete_contenedor">
                <img
                    className="interprete_foto"
                    src={props.foto}
                    alt={props.nombre}
                ></img>
                <h2>{props.nombre}</h2>
                <p>{props.children}</p>
            </div>
        </>
    );
};

export default Interprete;