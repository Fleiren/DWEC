import React from 'react';
import BotonInicio from '../components/BotonInicio';
import './productos.css';

const Productos = () => {
    return (
        <>
        <div className='productos_contenido'>
            <h1>Productos</h1>
            <img src="/src/assets/img/gumballProductos.jpg" alt="Gumball feliz" />
        </div>
            
            <BotonInicio />
        </>
    );
};

export default Productos;