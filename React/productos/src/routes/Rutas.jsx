import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Contacto from '../pages/Contacto.jsx';
import AcercaDe from '../pages/AcercaDe.jsx';
import Productos from '../pages/Productos.jsx';

const Rutas = () => {
    return(
        <>
        {/*Pasamos al componente Routes todas las rutas, indicando en el atributo path a que ruta del navegador se corresponde y el atributo element a que componente queremos que se muestre.
        Esto pertenece al ejercicio 1 donde se pide que haga las rutas y los componentes comprobando que funcionan.*/}
            <Routes>
                <Route path="/" element={<Inicio />}></Route>
                <Route path="/contacto" element={<Contacto />}></Route>
                <Route path="/acercaDe" element={<AcercaDe />}></Route>
                <Route path="/productos" element={<Productos />}></Route>
            </Routes>
        </>
    )
}

export default Rutas;