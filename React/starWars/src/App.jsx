import ProveedorPeliculas from "./context/ProveedorPeliculas.jsx";
import "./App.css";
import Contenedor from "./components/estructura/Contenedor.jsx";
import Cabecera from "./components/estructura/Cabecera.jsx";
import Menu from "./components/menu/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import Contenido from "./components/estructura/Contenido.jsx";
import Pie from "./components/estructura/Pie.jsx";

function App() {
	//No me gusta el diseño de la aplicación, le daré más mimo en la siguiente práctica.
	//Toda nuestra aplicación va a estar dentro del ProveedorPeliculas para que todas las rutas y componentes tengan acceso al contexto de películas.
	return (
		<>
			<ProveedorPeliculas>
				<Contenedor>
					<Cabecera />
					<Menu />
					<Contenido>
						{/**añadir error general para los errores de la api */}
						<Rutas />
					</Contenido>
					<Pie />
				</Contenedor>
			</ProveedorPeliculas>
		</>
	);
}

export default App;
