import useAuthContext from "../hooks/useAuthContext.js";
import "./register.css";
const Register = () => {
	const { updateData, validateRegister, credentials } = useAuthContext();

	return (
		<form className="register_container">
			<h3>Crear cuenta</h3>
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
			<label htmlFor="confirmPassword">Confirmar contraseña</label>
			<input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				value={credentials.confirmPassword}
				onChange={updateData}
				placeholder="Tu contraseña"
			/>
			<label htmlFor="display_name">Nombre</label>
			<input
				id="display_name"
				name="display_name"
				type="text"
				value={credentials.display_name}
				onChange={updateData}
				placeholder="Aarón"
			/>
			<input
				type="button"
				id="logIn"
				onClick={validateRegister}
				value="Registrarse"
			/>
		</form>
	);
};

export default Register;
