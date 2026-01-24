import useAuth from "../hooks/useAuth.js";
import "./register.css";
const Register = () => {
	const { updateData, validateRegister } = useAuth();

	return (
		<div className="register_container" onInput={updateData}>
			<h3>Crear cuenta</h3>
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
			<label htmlFor="display_name">Nombre</label>
			<input
				id="display_name"
				name="display_name"
				type="text"
				placeholder="Aarón"
			/>
			<input
				type="button"
				id="logIn"
				onClick={validateRegister}
				value="Registrarse"
			/>
		</div>
	);
};

export default Register;
