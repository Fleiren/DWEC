import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./../pages/Inicio.jsx";
import Error from "./../pages/Error.jsx";
import Peliculas from "./../pages/Peliculas.jsx";
import Interpretes from "./../pages/Interpretes.jsx";
import Galeria from "./../pages/Galeria.jsx";
import AcercaDe from "./../pages/AcercaDe.jsx";

const Rutas = (props) => {
	const { peliculas } = props;
	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />}></Route>
				<Route path="/*" element={<Error />}></Route>
				<Route
					path="/peliculas"
					element={<Peliculas peliculas={peliculas} />}
				></Route>
				<Route
					path="/interpretes"
					element={<Interpretes peliculas={peliculas} />}
				></Route>
				<Route
					path="/galeria"
					element={<Galeria peliculas={peliculas} />}
				></Route>
				<Route path="/acercaDe" element={<AcercaDe />}></Route>
			</Routes>
		</>
	);
};

export default Rutas;
