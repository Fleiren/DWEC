import React from "react";
import { Routes, Route } from "react-router-dom";

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />}></Route>
				<Route path="/*" element={<Error />}></Route>
				<Route path="/insertarDisco" element={<InsertarDisco />}></Route>
				<Route path="/listarDisco" element={<ListarDisco />}></Route>
			</Routes>
		</>
	);
};

export default Rutas;
