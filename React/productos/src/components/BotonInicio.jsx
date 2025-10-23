import React from 'react';
import {useNavigate} from 'react-router-dom';
import './botonInicio.css';
const BotonInicio = () => {
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