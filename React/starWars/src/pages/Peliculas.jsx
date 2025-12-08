import { React } from "react";
import { Outlet } from "react-router-dom";
import MenuPeliculas from "./../components/menu/MenuPeliculas.jsx";
import "./peliculas.css";

const Peliculas = ({ datosPeliculas }) => {
	//Uso el Outlet para practicarlo y porque creo que es lo que más sentido tiene.
	return (
		<>
			<div className="contenedor_peliculas">
				<MenuPeliculas datosPeliculas={datosPeliculas} />
				<Outlet />
			</div>
		</>
	);
};

export default Peliculas;
