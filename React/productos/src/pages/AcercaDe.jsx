import React from 'react';
import BotonInicio from '../components/BotonInicio';
import './acercaDe.css';

const AcercaDe= () => {
    return(
        <>
        <div className='acercaDe_contenido'>
            <h1>Acerca De</h1>
            <img src="/src/assets/img/gumballAcercaDe.jpg" alt="Gumball y Darwin dudando." />
        </div>
        <BotonInicio />
        </>
    )
}

export default AcercaDe;