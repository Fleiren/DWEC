import { useState, useEffect } from "react";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";
import Rutas from "./routes/Rutas.jsx";
import Menu from "./components/menu/Menu.jsx";

function App() {
	if (typeof Storage === "undefined") {
		return (
			<>
				<div className="mensaje_error">
					El navegador no soporta localStorage
				</div>
			</>
		);
	}

	return (
		<>
			<Contenedor>
				<Cabecera />
				<Menu />
				<Contenido>
					<Rutas></Rutas>
				</Contenido>
				<Pie className="contenedor_pie"></Pie>
			</Contenedor>
		</>
	);
}

export default App;
