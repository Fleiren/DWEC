import React, {useState} from 'react';
import './contadorLimite.css';

const ContadorLimite = () => {
    const [contador, setContador] = useState(0);
    //No se si soy yo, pero me parece precioso este ejercicio, da gusto ver como se coordina todo y entenderlo.
    return (
        <>
            <div className='contador limite'>
                <h1>Contador con límites</h1>
                <h2>Ejercicio 2</h2>
                <p>{contador}</p>
                <div className="botones">
                    <button disabled={contador === 0} onClick={() => (
                        setContador(contador-1)
                    )}>Decrementar</button>
                    <button disabled={contador === 10} onClick={()=>(
                        setContador(contador+1)
                    )}>Incrementar</button>
                </div>
                    
            </div>
            

        </>
    );

};

export default ContadorLimite;