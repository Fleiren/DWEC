import React from 'react';
import BotonInicio from '../components/BotonInicio';
import './contacto.css';

const Contacto = () => {
    return (
        <>
        <div className='contacto_contenido'>
            <h1>Contacto</h1>
            <img src="/src/assets/img/gumballContacto.jpg" alt="Darwin feliz" />
        </div>
            
            <BotonInicio />
        </>
    )
}

export default Contacto;