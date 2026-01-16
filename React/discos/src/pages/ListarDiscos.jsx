import React, { useState, useRef } from "react";
import Disco from "../components/Disco.jsx";
import useDiscos from "../hooks/useDiscos.js";
import "./listarDiscos.css";
import {
	buscarDisco,
	eliminarDiscoPorId,
} from "../libraries/ultilFormularios.js";

const ListarDiscos = () => {
	const { discos } = useDiscos();
	const [discosFiltrados, setDiscosFiltrados] = useState(discos);
	const [busquedaVacia, setBusquedaVacia] = useState(false);
	const [mostrarConfirm, setMostrarConfirm] = useState(false);
	const [idDiscoEliminar, setIdDiscoEliminar] = useState(null);
	const filtroRef = useRef();

	let resultadoFiltro = [];

	/**
	 * Actualiza el estado de discosFiltrados con el nuevo filtro.
	 */
	const filtrar = () => {
		let textoBusqueda = filtroRef.current.value;
		//Si el usuario no pone nada se muestran todos los discos, está el botón limpiar pero por si acaso el usuario no lo entiende... le damos más opciones para ver la lista completa.
		if (textoBusqueda !== "") {
			resultadoFiltro = buscarDisco(textoBusqueda, [...discos]);
			setDiscosFiltrados(resultadoFiltro);
			//Si no hay discos que coincidan con la busqueda el estado busquedaVacia se pone en true para que se muestre el mensaje.
			resultadoFiltro.length === 0
				? setBusquedaVacia(true)
				: setBusquedaVacia(false);
		} else {
			setDiscosFiltrados(discos);
			setBusquedaVacia(false);
		}
	};

	/**
	 * Reestablece los valores de los estados busquedaVacia y discosFiltrados.
	 */
	const limpiar = () => {
		setBusquedaVacia(false);
		setDiscosFiltrados(discos);
	};

	/**
	 * Si el elemento pulsado contiene el nombre eliminar, eliminará el disco con la id que se obtiene al pulsar en el icono de eliminar.
	 * @param {HTMLElement} evento
	 */
	const eliminarDisco = (evento) => {
		if (evento.target.name === "eliminar") {
			setIdDiscoEliminar(evento.target.value);
			setMostrarConfirm(true);
		}
	};

	const eliminarDiscoConfirmado = () => {
		if (idDiscoEliminar) {
			const nuevaLista = eliminarDiscoPorId(idDiscoEliminar, [...discos]);
			//setDiscos(nuevaLista);
			setDiscosFiltrados(nuevaLista);
			setMostrarConfirm(false);
			setIdDiscoEliminar(null);
		}
	};

	const cancelarEliminacionDisco = () => {
		setMostrarConfirm(false);
		setIdDiscoEliminar(null);
	};

	return (
		<>
			<div className="contenedor_listarDiscos">
				{mostrarConfirm && (
					<div className="confirmar_eliminacion">
						<p>¿Estás seguro de que quieres borrar el disco?</p>
						<button onClick={eliminarDiscoConfirmado}>Aceptar</button>
						<button onClick={cancelarEliminacionDisco}>Cancelar</button>
					</div>
				)}
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

				<div className="contenedor_mostrarDiscos" onClick={eliminarDisco}>
					{discos ? (
						discosFiltrados && !busquedaVacia ? (
							discosFiltrados.map((disco) => {
								return <Disco key={disco.id} disco={disco}></Disco>;
							})
						) : (
							<h2>No hay discos para la búsqueda solicitada.</h2>
						)
					) : (
						<Cargando />
					)}
				</div>
			</div>
		</>
	);
};

export default ListarDiscos;
