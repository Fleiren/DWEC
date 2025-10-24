import React from 'react';
import {Route, Routes} from 'react-router-dom';

const Rutas = () => {

    return(
        <>
            <Routes>
                <Route path='/' element={<Inicio />}></Route>
                <Route path='/*' element={<Error />}></Route>
                <Route path='/peliculas' element={<Peliculas />}></Route>
                <Route path='/interpretes' element={<Interpretes />}></Route>
                <Route path='/galeria' element={<Carteleras />}></Route>
                <Route path='/acercaDe' element={<AcercaDe />}></Route>
            </Routes>
        </>
        
    );
}

export default Rutas;