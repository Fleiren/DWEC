import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Contenedor, Cabecera, Contenido, Pie } from "./components/estructura";
import Rutas from "./routes/Rutas.jsx";
import Menu from "./components/menu/Menu.jsx";
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
