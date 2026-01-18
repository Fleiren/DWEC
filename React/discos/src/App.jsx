import { useState, useEffect } from "react";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";
import Rutas from "./routes/Rutas.jsx";
import Menu from "./components/menu/Menu.jsx";
import MensajeApp from "./components/MensajeApp.jsx";
import useMensajes from "./hooks/useMensajes.js";

function App() {
	const { mensaje, ocultarMensaje, mensajeActivo } = useMensajes();

	useEffect(() => {
		if (mensaje !== "") {
			setTimeout(() => {
				ocultarMensaje();
			}, 3000);
		}
	}, [mensaje, ocultarMensaje]);
	return typeof Storage === "undefined" ? (
		<div className="mensaje_error">El navegador no soporta localStorage</div>
	) : (
		<>
			<Contenedor>
				{mensajeActivo && <MensajeApp />}
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
