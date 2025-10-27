import Cabecera from "./components/estructura/Cabecera.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Pie from "./components/estructura/Pie.jsx";
import Menu from "./components/menu/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import datos from "./assets/data/peliculas.json";
import "./App.css";

function App() {
	const peliculas = datos.peliculas;
	return (
		<>
			<Contenedor>
				<Cabecera></Cabecera>
				<Menu></Menu>
				<Contenido>
					{/**Paso el JSON por props a Rutas para que se carguen una sola vez y no se relea el archivo en cada componente que lo necesite */}
					<Rutas peliculas={[...peliculas]}></Rutas>
				</Contenido>
				<Pie></Pie>
			</Contenedor>
		</>
	);
}

export default App;
