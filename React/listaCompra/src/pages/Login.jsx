import useAuth from "./../hooks/useAuth.js";
import "./login.css";
const Login = () => {
	const { updateData, validateLogin } = useAuth();

	return (
		<div className="login_container" onInput={updateData}>
			<h3>Iniciar sesión</h3>
			<label htmlFor="email">Correo electrónico</label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="nombre@correo.com"
			/>
			<label htmlFor="password">Contraseña</label>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="Tu contraseña"
			/>
			<input
				type="button"
				id="logIn"
				onClick={validateLogin}
				value="Iniciar sesión"
			/>
		</div>
	);
};
export default Login;
