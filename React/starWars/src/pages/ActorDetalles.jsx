import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerDatos } from "./../libraries/datosApi.js";
import "./actorDetalles.css";
const ActorDetalles = () => {
	const { id } = useParams();
	//Estas son las dos urls de las apis que uso para obtener los datos de cada actor usando el id que extraemos de la url en el componente Pelicula.jsx.
	const url1 = `http://swapi.py4e.com/api/people/${id}`;
	const url2 = `http://swapi.dev/api/people/${id}`;
	const navigate = useNavigate();
	const [actor, setActor] = useState({});
	const navegarAtras = () => {
		//Esto me lo ha dicho la IA ya que quería ver como se puede volver a la página anterior con useNavigate.
		navigate(-1);
	};
	const traerActor = async () => {
		try {
			const datos = await Promise.any([
				obtenerDatos(url1, "json"),
				obtenerDatos(url2, "json"),
			]);
			setActor(datos);
		} catch (error) {
			//Si hay error, navego a la página de error.
			setActor({});
			navigate("/*");
		}
	};

	useEffect(() => {
		traerActor();
	}, []);
	return (
		<>
			<div className="contenedor_actorDetalles">
				<h1>{actor.name}</h1>
				<p>Altura: {actor.height}</p>
				<p>Peso: {actor.mass}</p>
				<p>Color de pelo: {actor.hair_color}</p>
				<p>Color de piel: {actor.skin_color}</p>
				<p>Color de ojos: {actor.eye_color}</p>
				<p>Año de nacimiento: {actor.birth_year}</p>
				<p>Género: {actor.gender}</p>
				<button onClick={navegarAtras}>Atrás</button>
			</div>
		</>
	);
};

export default ActorDetalles;
