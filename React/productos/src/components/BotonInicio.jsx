import React from 'react';
import {useNavigate} from 'react-router-dom';
import './botonInicio.css';
const BotonInicio = () => {
    //Gracias a navigate podemos movernos por las rutas sin neceesidad de usar Link, en este caso usamos un botón.
    const navigate = useNavigate();
    const volverInicio = () => {
        navigate("/");
    }
    return(
        <>
            <button onClick={() => {
                volverInicio();
            }}>
            Inicio
            </button>
        </>
    );
};

export default BotonInicio;