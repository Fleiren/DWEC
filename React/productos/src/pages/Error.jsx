import React from 'react';
import BotonInicio from '../components/BotonInicio';
import './error.css';

const Error = () => {
    return(
        <>
            <div className="error_imagenes">
                <img id="gumball" src="/src/assets/img/gumballError.jpg" alt="Gumball enfadado" />
                <img src="/src/assets/img/Error.jpg" alt="ERROR" />
            </div>
            
            <BotonInicio />
        </>
    )
}

export default Error;