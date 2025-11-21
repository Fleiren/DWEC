import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./../pages/Inicio.jsx";
import Error from "./../pages/Error.jsx";
import InsertarDisco from "./../pages/InsertarDisco.jsx";
import ListarDiscos from "./../pages/ListarDiscos.jsx";

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />}></Route>
				<Route path="/*" element={<Error />}></Route>
				<Route path="/insertarDisco" element={<InsertarDisco />}></Route>
				<Route path="/listarDiscos" element={<ListarDiscos />}></Route>
			</Routes>
		</>
	);
};

export default Rutas;
