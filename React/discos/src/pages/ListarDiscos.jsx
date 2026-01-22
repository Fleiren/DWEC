import React, { useState, useRef, useEffect } from "react";
import Disco from "../components/Disco.jsx";
import Cargando from "../components/Cargando.jsx";
import useDiscos from "../hooks/useDiscos.js";
import Confirm from "../components/Confirm.jsx";
import "./listarDiscos.css";

const ListarDiscos = () => {
	const { discos, cargando, borrarDisco, buscarDisco } = useDiscos();
	const [discosFiltrados, setDiscosFiltrados] = useState([]);
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
		} else {
			setDiscosFiltrados(discos);
		}
	};

	/**
	 * Reestablece los valores de los estados busquedaVacia y discosFiltrados.
	 */
	const limpiar = () => {
		filtroRef.current.value = "";
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

	useEffect(() => {
		if (discos) {
			setDiscosFiltrados(discos);
		}
	}, [discos]);
	return (
		<>
			<div className="contenedor_listarDiscos">
				{
					/**Debería ser un componente confirm, si me da tiempo lo hago. */
					mostrarConfirm && (
						<Confirm
							mensaje={"¿Estás seguro de que quieres borrar el disco?"}
							accionAceptar={eliminarDiscoConfirmado}
							accionCancelar={cancelarEliminacionDisco}
						></Confirm>
					)
				}
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
					{cargando ? (
						<Cargando />
					) : discosFiltrados && discosFiltrados.length > 0 ? (
						discosFiltrados.map((disco) => {
							return <Disco key={disco.id} disco={disco}></Disco>;
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
