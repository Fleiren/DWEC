//Voy a comentar bien esto ya que es una prueba que he hecho para aprender a usar custom hooks.
import React, {useState} from 'react';

export const useMatriculados = (matriculados) => {

    const [lista, setLista] = useState(matriculados);
    //Entiendo que lo interesante sería que si desmatriculamos el alumno ya no aparezca a no ser que reiniciemos la lista, por eso voy a usar una lista auxiliar.
    const [matriculadosActuales, setMatriculadosActuales] = useState(matriculados);

    //Es necesario ya que si queremos saber si esta ordenado desc o asc no podemos usar una variable normal porque se reiniciaría cada vez que se renderiza el componente.
    const [ordenAsc, setOrdenAsc] = useState(true);

    const desmatricularAlumno = (id) => {
        const listaActualizada = matriculadosActuales.filter(alumno => alumno.id !== id);
        setMatriculadosActuales(listaActualizada);

        // Actualizo la vista para que cuando le de al botón desmatricular se mantenga la vista seleccionada, ya que si no lo hago se reinicia la vista de alumnos y se muestran todos, en vez de por ejemplo los de DAM.
        const vistaActualizada = lista.filter(alumno => alumno.id !== id);
        setLista(vistaActualizada);

    }

    const ordenarLista = () => {
        if(ordenAsc){
            setLista([...lista].sort((a,b) => b.apellidos.localeCompare(a.apellidos)));
            setOrdenAsc(false);
        }else{
            setLista([...lista].sort((a,b) => a.apellidos.localeCompare(b.apellidos)));
            setOrdenAsc(true);
        }
    }

    //Devolvemos todo lo que vamos a usar en el componente.
    return {matriculados, lista, setLista, matriculadosActuales, setMatriculadosActuales, desmatricularAlumno, ordenarLista};
}
