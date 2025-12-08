import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Menu from "./components/menu/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";
import { obtenerDatos } from "./libraries/datosApi.js";

function App() {
	//No me ha dado tiempo a hacer bien bien todo, quiero dedicarle más tiempo pero para la entrega no me da tiempo a enviártelo mejor (el diseño es horrible).
	//He usado las apis que me devuelven la información con el mismo formato.
	const url1 = "http://swapi.py4e.com/api/films";
	const url2 = "http://swapi.dev/api/films";

	const [datosPeliculas, setDatosPeliculas] = useState([]);
	//Uso Promise.any para que si una de las dos apis falla, use la otra.
	const navigate = useNavigate();
	const traerDatosPeliculas = async () => {
		try {
			const datos = await Promise.any([
				obtenerDatos(url1, "json"),
				obtenerDatos(url2, "json"),
			]);

			setDatosPeliculas(datos.results);
		} catch {
			console.log("error");
			setDatosPeliculas([]);
			navigate("/*");
		}
	};
	//Se ejecuta una sola vez al cargar el componente.
	useEffect(() => {
		traerDatosPeliculas();
	}, []);
	return (
		<>
			<Contenedor>
				<Cabecera></Cabecera>
				<Menu></Menu>
				<Contenido>
					<Rutas datosPeliculas={datosPeliculas}></Rutas>
				</Contenido>
				<Pie></Pie>
			</Contenedor>
		</>
	);
}

export default App;
