import React, { useState, useRef } from "react";
import Disco from "../components/Disco.jsx";
import "./listarDiscos.css";
import {
	buscarDisco,
	eliminarDiscoPorId,
} from "../libraries/ultilFormularios.js";

const ListarDiscos = (props) => {
	const { discos, setDiscos } = props;
	const [discosFiltrados, setDiscosFiltrados] = useState(discos);
	const [busquedaVacia, setBusquedaVacia] = useState(false);
	const filtroRef = useRef();
	let resultadoFiltro = [];

	const filtrar = () => {
		let textoBusqueda = filtroRef.current.value;
		//Si el usuario no pone nada se muestran todos los discos, está el botón limpiar pero por si acaso el usuario no lo entiende... le damos más opciones para ver la lista completa.
		if (textoBusqueda !== "") {
			resultadoFiltro = buscarDisco(textoBusqueda, [...discos]);
			setDiscosFiltrados(resultadoFiltro);
			resultadoFiltro.length === 0
				? setBusquedaVacia(true)
				: setBusquedaVacia(false);
		} else {
			setDiscosFiltrados(discos);
			setBusquedaVacia(false);
		}
	};

	const limpiar = () => {
		setBusquedaVacia(false);
		setDiscosFiltrados(discos);
	};

	const eliminarDisco = (evento) => {
		if (evento.target.name === "eliminar") {
			const nuevaLista = eliminarDiscoPorId(evento.target.value, [...discos]);
			setDiscos(nuevaLista);
			setDiscosFiltrados(nuevaLista);
		}
	};

	return (
		<>
			<div className="contenedor_listarDiscos">
				<div className="contenedor_controles">
					<input
						ref={filtroRef}
						type="text"
						name="filtrar"
						id="inputFiltrar"
						placeholder="Filtrar por..."
					/>
					<button id="buscar" onClick={filtrar}>
						Buscar
					</button>
					<button id="limpiar" onClick={limpiar}>
						Limpiar
					</button>
				</div>

				<div className="contenedor_mostrarDiscos">
					{discosFiltrados && !busquedaVacia ? (
						discosFiltrados.map((disco) => {
							return (
								<Disco
									key={disco.id}
									disco={disco}
									setDiscos={setDiscos}
									eliminarDisco={eliminarDisco}
								></Disco>
							);
						})
					) : (
						<h2>No hay discos para la búsqueda solicitada.</h2>
					)}
				</div>
			</div>
		</>
	);
};

export default ListarDiscos;
