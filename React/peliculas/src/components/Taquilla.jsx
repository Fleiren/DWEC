import React from "react";
import "./taquilla.css";

const Taquilla = (props) => {
    const { taquilla } = props;
    return (
        <>
            <div className="taquilla_contenedor">
                <h1>Precio: {taquilla}</h1>
            </div>
                
                
            
        </>
    )
}

export default Taquilla;