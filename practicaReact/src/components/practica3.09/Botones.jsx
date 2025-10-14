import React, { useState } from 'react';

const Botones = ({ matriculados, matriculadosActuales, setLista, setMatriculadosActuales, ordenarLista }) => {

    //No se si habría sido buena práctica pero se podría añadir todas las funciones de filtrado, es decir , todos los setters en el custom hook para que aquí solo se llame a la función
    //ya que parece que quedaría más limpio y claro si se llama a funciones como en el caso de ordenarLista pero son funciones tan simples que no se si merece la pena.
    return(
        <div className="botones_botones">
                <button onClick={()=>
                setLista(matriculadosActuales.filter(alumno => alumno.curso === "2DAW"))
                }>
                    2DAW
                </button>
                <button onClick={()=>
                    setLista(matriculadosActuales.filter(alumno => alumno.curso.startsWith("1")))
                }>
                    Primero
                </button>
                <button onClick={()=>
                    setLista(matriculadosActuales.filter(alumno => alumno.curso.endsWith("DAM")))
                }>
                    DAM
                </button>
                <button onClick={()=>
                    setLista(matriculadosActuales.filter(alumno => alumno.aficiones.includes("lectura")))
                }>
                    Lectores
                </button>
                <button  onClick={()=>{            
                    ordenarLista();
                }}>
                    Ordenar
                </button>
                <button onClick={()=>{
                    setLista([...matriculados]);
                    setMatriculadosActuales([...matriculados]);
                }}>
                    Reiniciar
                </button>
           </div>
    )
    
    
}

export default Botones;