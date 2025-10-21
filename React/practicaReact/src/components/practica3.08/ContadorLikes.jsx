import React, {useState} from 'react';
import './contadorLikes.css';

const ContadorLikes = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislakes] = useState(0);
    
    return (
        <>
            <div className='contador likes'>
                <h1>Contador de "likes"</h1>
                <h2>Ejercicio 3</h2>
                <div className="botones">
                    <button onClick={()=>(
                        setLikes(likes+1)
                    )}>Like: {likes}</button>
                
                    <button onClick={()=>(
                        setDislakes(dislikes+1)
                    )}>Dislike: {dislikes}</button>

                </div>
                
            </div>
            
        </>
    );
};

export default ContadorLikes;