import useAuthContext from "../../hooks/useAuthContext.js";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Confirm from "../Confirm.jsx";
const Header = () => {
	const navigate = useNavigate();
	const { isAuthenticated, logOut, user, resetDataForm } = useAuthContext();
	const [showConfirm, setShowConfirm] = useState(false);
	//Lo aparto en funciones por si en un futuro quiero añadir más lógica.
	const start = () => {
		navigate("/login");
		//Borramos los datos del formulario al darle al botón ya que creo que lo más normal es que si cambias de página se reinicien los datos.
		resetDataForm();
	};

	const home = () => {
		navigate("/");
		resetDataForm();
	};
	const create = () => {
		navigate("/register");
		resetDataForm();
	};

	const logOutConfirm = () => {
		setShowConfirm(true);
	};

	const closeConfirm = () => {
		setShowConfirm(false);
	};

	const logOutSession = () => {
		setShowConfirm(false);
		logOut();
	};

	return (
		<header className="header_container">
			<h1 onClick={home}>Booky</h1>
			{isAuthenticated ? (
				<>
					{/* Uso el operador opcional ya que la variable user al iniciar sesión puede ser null */}
					<div>
						<h3>Disfruta de tu compra {user?.user_metadata?.display_name}</h3>
						<button onClick={logOutConfirm}>Cerrar sesión</button>
						{showConfirm && (
							//Componente de confirmación reutilizable.
							<Confirm
								mensaje={"¿Estás seguro de que quieres cerrar la sesión?"}
								accionAceptar={logOutSession}
								accionCancelar={closeConfirm}
							/>
						)}
					</div>
				</>
			) : (
				<>
					<div>
						<button onClick={start}>Iniciar sesión</button>
						<button onClick={create}>Registrarse</button>
					</div>
				</>
			)}
		</header>
	);
};

export default Header;
