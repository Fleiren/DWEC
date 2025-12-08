import { Routes, Route } from "react-router-dom";
import Error from "./../pages/Error.jsx";
import Inicio from "./../pages/Inicio.jsx";
import Peliculas from "./../pages/Peliculas.jsx";
import Pelicula from "./../pages/Pelicula.jsx";
import ActorDetalles from "./../pages/ActorDetalles.jsx";

const Rutas = ({ datosPeliculas }) => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Error />}></Route>
				<Route path="/" element={<Inicio />}></Route>
				<Route
					path="/peliculas"
					element={<Peliculas datosPeliculas={datosPeliculas} />}
				>
					<Route
						/*No funciona con ruta absoluta si quiero usar el Outlet... pensaba que si, es decir, me llega un array vacío si uso /peliculas/:id en el path.*/
						path=":id"
						element={<Pelicula datosPeliculas={datosPeliculas} />}
					></Route>
				</Route>
				<Route path="/actor/:id" element={<ActorDetalles />}></Route>
			</Routes>
		</>
	);
};

export default Rutas;
