import useAuth from "./../hooks/useAuth.js";
import "./login.css";
const Login = () => {
	const { updateData, validateLogin, credentials } = useAuth();

	//No se puede usar delegación de eventos con onChange en React, me salen un montón de errores y si coloco un onInput también me salen errores pidiendome que lo cambie a onChange. Por lo que he optado por colocar el onChange en cada input.
	return (
		<form className="login_container">
			<h3>Iniciar sesión</h3>
			<label htmlFor="email">Correo electrónico</label>
			<input
				id="email"
				name="email"
				type="email"
				value={credentials.email}
				onChange={updateData}
				placeholder="nombre@correo.com"
			/>
			<label htmlFor="password">Contraseña</label>
			<input
				id="password"
				name="password"
				type="password"
				value={credentials.password}
				onChange={updateData}
				placeholder="Tu contraseña"
			/>
			<input
				type="button"
				id="logIn"
				onClick={validateLogin}
				value="Iniciar sesión"
			/>
		</form>
	);
};
export default Login;
