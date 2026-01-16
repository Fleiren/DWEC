import { Routes, Route } from "react-router-dom";
import Error from "./../pages/Error.jsx";
import Inicio from "./../pages/Inicio.jsx";
import Peliculas from "./../pages/Peliculas.jsx";
import Pelicula from "./../pages/Pelicula.jsx";

const Rutas = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Error />}></Route>
				<Route path="/" element={<Inicio />}></Route>
				<Route path="/peliculas" element={<Peliculas />}>
					<Route path=":id" element={<Pelicula />}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default Rutas;
