import './discente.css';
const Discente = ({alumno, desmatricularAlumno}) => {

    return (
        <>
            <div className="discente_contenedor">
                <p>{alumno.nombre} {alumno.apellidos}.</p>
                <p>Curso: {alumno.curso}</p>
                <p>Aficiones: {alumno.aficiones.join(', ')}.</p>
                <p>Comida favorita: {alumno.comida}.</p>
                <button onClick={desmatricularAlumno}>Desmatricular</button>
            </div>
        </>
    );
};

export default Discente;