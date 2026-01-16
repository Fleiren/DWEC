import { useEffect, useContext } from "react";
import { ContextoPeliculas } from "./../context/ProveedorPeliculas.jsx";
import { ContextoPersonajes } from "./../context/ProveedorPersonajes.jsx";
import { ContextoVehiculos } from "./../context/ProveedorVehiculos.jsx";
import DetallesPersonaje from "./../components/DetallesPersonaje.jsx";
import { useParams } from "react-router-dom";
import Personajes from "../components/Personajes.jsx";
import "./pelicula.css";
const Pelicula = () => {
	const { id } = useParams();

	const { obtenerPeliculaPorId } = useContext(ContextoPeliculas);

	const {
		cargarPersonajes,
		vaciarPersonajes,
		personajes,
		personajeSeleccionado,
		eliminarPersonajeSeleccionado,
	} = useContext(ContextoPersonajes);

	const { vaciarVehiculos, ocultarVehiculos } = useContext(ContextoVehiculos);

	const pelicula = obtenerPeliculaPorId(id);

	//Cada vez que cambie el id de la película, vuelvo a obtener los personajes y limpio los datos de los vehículos y el personaje seleccionado.
	useEffect(() => {
		if (pelicula) {
			vaciarPersonajes();
			cargarPersonajes(pelicula.characters);
			eliminarPersonajeSeleccionado();
			vaciarVehiculos();
			ocultarVehiculos();
		}
	}, [id]);

	return (
		<>
			{/**Si no se han cargado la película o los personajes saldrá el símbolo de cargando. */}
			{!pelicula || personajes.length === 0 ? (
				<div className="contenedor_pelicula">
					<img
						src="https://pagos.puertovallarta.gob.mx:83/Resources/Images/loading.gif"
						alt="Cargando..."
					/>
				</div>
			) : (
				<div className="contenedor_pelicula">
					<h1>{pelicula.title}</h1>
					<div className="contenedor_contenido">
						<div className="contenedor_resumen">
							<h3>Resumen</h3>
							<p>{pelicula.opening_crawl}</p>
						</div>
						<div className="contenedor_datos_adicionales">
							<h3>Personajes</h3>
							<div className="contenedor_detalles">
								<div className="info_pelicula">
									<Personajes />
								</div>
								<div className="detalles_personaje">
									{/**Si se ha seleccionado algún personaje entonces se mostrará el componente para mostrar sus detalles. */}
									{personajeSeleccionado && <DetallesPersonaje />}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Pelicula;
