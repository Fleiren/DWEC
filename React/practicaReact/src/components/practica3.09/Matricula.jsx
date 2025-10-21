import React ,{useState} from 'react';
import datos from './datos/matriculados.json';
import { useMatriculados } from './hooks/useMatriculados.js';
import Discente from './Discente.jsx';
import Botones from './Botones.jsx';
import './matricula.css';

/**No sé si te parecerá bien lo que voy a hacer, pero preguntando a ChatGPT e investigando he visto que se podría crear un custom hook para gestionar la lista fuera del componente.
*Lo he hecho así para aprender, ya que uso la IA como una herramienta de apoyo para entender mejor cómo funcionan estas cosas. Espero que lo veas bien.
*/
const Matricula = () => {
    //Gracias al custom hook podemos dejar el componente más limpio y separar la lógica de la vista.
    //Al custom hook le pasamos los datos que vamos a usar y devuelve lo que necesitamos.
    const {matriculados, lista, setLista, matriculadosActuales, setMatriculadosActuales, desmatricularAlumno, ordenarLista} = useMatriculados(datos.discentes);

    return(
        <>
        {/** Solo hago spread cuando utilizo sort ya que filter y map generan copias del array original. 
         * El uso de dos listas distintas me permite ir aplicando los filtros sobre una lista que se va actualizando si se desmatriculan alumnos.
        */}
           <div className="matricula_botones">
                <Botones
                matriculados={matriculados}
                matriculadosActuales={matriculadosActuales}
                setLista={setLista}
                setMatriculadosActuales={setMatriculadosActuales}
                ordenarLista={ordenarLista}
                ></Botones>
           </div>
            
            <div className="matricula_discentes">
                {
                    lista.map(alumno => <Discente key={alumno.id} alumno={alumno} desmatricularAlumno={()=> desmatricularAlumno(alumno.id)}></Discente>)
                }
            </div>
            
        </>
    );
};

export default Matricula;