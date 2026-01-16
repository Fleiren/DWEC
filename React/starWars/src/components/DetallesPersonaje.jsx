import { useContext, useEffect } from "react";
import { ContextoPersonajes } from "../context/ProveedorPersonajes.jsx";
import { ContextoVehiculos } from "../context/ProveedorVehiculos.jsx";
import { obtenerIdUrl } from "../libraries/datosApi.js";
import Vehiculo from "./Vehiculo.jsx";
import "./detallesPersonaje.css";
import { ContextoPeliculas } from "../context/ProveedorPeliculas.jsx";

const DetallesPersonaje = () => {
	const { personajeSeleccionado } = useContext(ContextoPersonajes);

	const {
		cargarVehiculos,
		vehiculos,
		vaciarVehiculos,
		mostrarVehiculos,
		verVehiculos,
		ocultarVehiculos,
	} = useContext(ContextoVehiculos);

	const cargarVehiculosDelPersonaje = () => {
		if (personajeSeleccionado) {
			//Si entramos en esta función es porque queremos ver los vehículos del personaje por lo que activamos la vista de vehículos.
			verVehiculos();
			vaciarVehiculos();
			//Gracias a esta validación evitamos hacer una petición innecesaria en caso de que el personaje no tenga vehículos.
			if (personajeSeleccionado.vehicles.length !== 0) {
				cargarVehiculos(personajeSeleccionado.vehicles);
			}
		}
	};

	useEffect(() => {
		//Cada vez que cambiamos de personaje, vaciamos los vehículos y ocultamos el contenedor.
		vaciarVehiculos();
		ocultarVehiculos();
	}, [personajeSeleccionado]);

	return (
		<div className="contenedor_detalles_personaje">
			<h3>Detalles del Personaje</h3>
			<p>Nombre: {personajeSeleccionado.name}</p>
			<p>Altura: {personajeSeleccionado.height} cm</p>
			<p>Peso: {personajeSeleccionado.mass} kg</p>
			<p>Color de Pelo: {personajeSeleccionado.hair_color}</p>
			<p>Color de Ojos: {personajeSeleccionado.eye_color}</p>
			<p>Año de Nacimiento: {personajeSeleccionado.birth_year}</p>
			{/**He colocado el evento en este caso en el propio botón ya que no hay varios botones por lo que imagino que en este caso la delegación de eventos no tiene sentido aplicarla aquí. */}
			<button onClick={cargarVehiculosDelPersonaje}>Pilota</button>
			{mostrarVehiculos && (
				<div className="contenedor_vehiculos">
					<h3>Vehículos</h3>
					{vehiculos.length === 0 ? (
						<p>Este personaje no tiene vehículos asignados.</p>
					) : (
						vehiculos.map((vehiculo) => {
							//Obtenemos la id del vehículo a partir de su url para usarla como key.
							let idVehiculo = obtenerIdUrl(vehiculo.url);
							//Mostramos todos los vehículos del personaje.
							return <Vehiculo vehiculo={vehiculo} key={idVehiculo} />;
						})
					)}
				</div>
			)}
		</div>
	);
};

export default DetallesPersonaje;
