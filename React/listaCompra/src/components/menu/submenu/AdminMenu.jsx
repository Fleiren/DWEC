import { useNavigate, Link } from "react-router-dom";
import "./adminMenu.css";
const AdminMenu = () => {
	const nv = useNavigate();

	const refresh = () => {
		//Obtenemos todos los datos y actualizamos los estados mostrando (esto puede tardar unos minutos).
	};
	return (
		<nav>
			<a className="element">Actualizar datos</a>
			<Link className="element" to="/UsersAdmin">
				Usuarios
			</Link>
			<Link className="element" to="/productsAdmin">
				Productos
			</Link>
			<Link className="element" to="/listsAdmin">
				Listas
			</Link>
		</nav>
	);
};
export default AdminMenu;
