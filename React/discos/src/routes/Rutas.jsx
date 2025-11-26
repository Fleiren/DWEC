import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./../pages/Inicio.jsx";
import Error from "./../pages/Error.jsx";
import InsertarDisco from "./../pages/InsertarDisco.jsx";
import ListarDiscos from "./../pages/ListarDiscos.jsx";
import DiscoDetalles from "./../pages/DiscoDetalles.jsx";

const Rutas = (props) => {
	//Gracias a cargar el localStorage en app, solo cargaremos los datos una vez, a partir de ahí usaremos el estado.
	//No se si es buena práctica hacerlo así por ir pasando de un componente a otro el estado discos.
	const { discos, setDiscos } = props;
	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />}></Route>
				<Route path="/*" element={<Error />}></Route>
				<Route
					path="/insertarDisco"
					element={<InsertarDisco discos={[...discos]} setDiscos={setDiscos} />}
				></Route>
				<Route
					path="/listarDiscos"
					element={<ListarDiscos discos={[...discos]} setDiscos={setDiscos} />}
				></Route>
				<Route
					path="/disco/:id"
					element={<DiscoDetalles discos={[...discos]} />}
				></Route>
			</Routes>
		</>
	);
};

export default Rutas;
