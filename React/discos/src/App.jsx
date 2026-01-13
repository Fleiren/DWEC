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

	const discosIniciales = localStorage.getItem("discos")
		? JSON.parse(localStorage.getItem("discos"))
		: [];

	const [discos, setDiscos] = useState(discosIniciales);

	useEffect(() => {
		localStorage.setItem("discos", JSON.stringify(discos));
	}, [discos]);

	return (
		<>
			<Contenedor>
				<Cabecera />
				<Menu />
				<Contenido>
					<Rutas discos={[...discos]} setDiscos={setDiscos}></Rutas>
				</Contenido>
				<Pie className="contenedor_pie"></Pie>
			</Contenedor>
		</>
	);
}

export default App;
