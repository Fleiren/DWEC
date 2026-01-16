const Vehiculo = ({ vehiculo }) => {
	return (
		<>
			{vehiculo && (
				<div className="contenedor_vehiculo">
					<h4 className="nombre_vehiculo">▸ {vehiculo.name}</h4>
					<p>Modelo: {vehiculo.model}</p>
					<p>Fabricante: {vehiculo.manufacturer}</p>
					<p>Coste en créditos: {vehiculo.cost_in_credits}</p>
					<p>Longitud: {vehiculo.length} m</p>
					<p>Velocidad máxima: {vehiculo.max_atmosphering_speed} km/h</p>
					<p>Tripulación: {vehiculo.crew}</p>
					<p>Carga útil: {vehiculo.cargo_capacity} kg</p>
					<p>Consumibles: {vehiculo.consumables}</p>
					<p>Clase de vehículo: {vehiculo.vehicle_class}</p>
					<hr />
				</div>
			)}
		</>
	);
};

export default Vehiculo;
