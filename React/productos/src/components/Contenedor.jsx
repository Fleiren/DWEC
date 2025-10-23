import React from 'react';
import './contenedor.css';

const Contenedor = (props) => {
    return(
        <div className="contenedor_contenedor">{props.children}</div>
    )
}

export default Contenedor;