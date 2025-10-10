import React ,{useState} from 'react';
import datos from './datos/matriculados.json';
import Discente from './Discente.jsx';
import Botones from './Botones.jsx';
import './matricula.css';

/**No sé si te parecerá bien lo que voy a hacer, pero preguntando a ChatGPT e investigando he visto que se podría crear un custom hook para gestionar la lista fuera del componente.
*Lo he hecho así para aprender, ya que uso la IA como una herramienta de apoyo para entender mejor cómo funcionan estas cosas. Espero que lo veas bien.
*/
const Matricula = () => {
    const matriculados = datos.discentes;
    const [lista, setLista] = useState(matriculados);
    //Entiendo que lo interesante sería que si desmatriculamos el alumno ya no aparezca a no ser que reiniciemos la lista, por eso voy a usar una lista auxiliar.
    const [matriculadosActuales, setMatriculadosActuales] = useState(matriculados)

    const desmatricularAlumno = (id) => {
        const listaActualizada = matriculadosActuales.filter(alumno => alumno.id !== id);
        setLista(listaActualizada);
        setMatriculadosActuales(listaActualizada);
    }
    

    return(
        <>
        {/** Solo hago spread cuando utilizo sort ya que filter y map generan copias del array original. 
         * El uso de dos listas distintas me permite ir aplicando los filtros sobre una lista que se va actualizando si se desmatriculan alumnos.
        */}
           <div className="matricula_botones">
                <Botones
                matriculados={datos.discentes}
                matriculadosActuales={matriculadosActuales}
                setLista={setLista}
                setMatriculadosActuales={setMatriculadosActuales}
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