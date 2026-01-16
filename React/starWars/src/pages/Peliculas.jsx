import { React } from "react";
import { Outlet } from "react-router-dom";
import MenuPeliculas from "./../components/menu/MenuPeliculas.jsx";
import ProveedorPersonajes from "../context/ProveedorPersonajes.jsx";
import ProveedorVehiculos from "../context/ProveedorVehiculos.jsx";
import "./peliculas.css";

const Peliculas = () => {
	return (
		<>
			<div className="contenedor_peliculas">
				<MenuPeliculas />
				{/**Coloco aquí el proveedor ya que en éste apartado de la aplicación es donde se van a mostrar los detalles de cada película.*/}
				<ProveedorPersonajes>
					{/**No tenía muy claro si colocar aquí el proveedor o ser más específica y que rodeara el componente detallesPelicula.*/}
					<ProveedorVehiculos>
						<Outlet />
					</ProveedorVehiculos>
				</ProveedorPersonajes>
			</div>
		</>
	);
};

export default Peliculas;
