import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Contenedor from "./components/Contenedor.jsx";
import Rutas from "./routes/Rutas.jsx";
import Menu from "./components/Menu.jsx";

function App() {
	return (
		<>
			<Menu></Menu>
			<Contenedor>			
				<h1>Tienda de productos</h1>
			</Contenedor>
			<Contenedor>
				<Rutas></Rutas>
			</Contenedor>
		</>
	);
}

export default App;
