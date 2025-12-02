import { useState } from "react";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Menu from "./components/menu/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";

function App() {
	return (
		<>
			<Contenedor>
				<Cabecera></Cabecera>
				<Menu></Menu>
				<Contenido>
					<Rutas></Rutas>
				</Contenido>
				<Pie></Pie>
			</Contenedor>
		</>
	);
}

export default App;
