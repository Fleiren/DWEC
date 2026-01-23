import useAuth from "../../hooks/useAuth.js";
const Header = () => {
	const { isAuthenticated, logOut, logIn, createAccount } = useAuth();
	return (
		<header>
			<h1>Lista de la compra</h1>
			{isAuthenticated ? (
				<button onClick={logOut}>Cerrar sesión</button>
			) : (
				<>
					<button onClick={logIn}>Iniciar sesión</button>
					<button onClick={createAccount}>Registrarse</button>
				</>
			)}
		</header>
	);
};

export default Header;
