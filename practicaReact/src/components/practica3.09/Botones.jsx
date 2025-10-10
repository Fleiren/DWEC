import React, { useState } from 'react';

const Botones = ({ matriculados, matriculadosActuales, setLista, setMatriculadosActuales }) => {
    let ordenAsc = true;

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
                    ordenAsc ? 
                    setLista([...matriculadosActuales].sort((a,b) => a.apellidos.localeCompare(b.apellidos))) :
                    setLista([...matriculadosActuales].sort((a,b) => b.apellidos.localeCompare(a.apellidos)));
                    ordenAsc = !ordenAsc;
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