import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

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
