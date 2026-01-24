import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSupabase from "../hooks/useSupabase.js";
import useMessage from "../hooks/useMessage.js";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	//Estoy intentando poner los nombres de las variables en inglés porque supongo que es lo mejor en el mundo de la programación, pero siento que es más difícil que queden claras.
	const initialCredentials = {
		email: "",
		password: "",
		display_name: "",
	};
	const initialUser = {};
	const initialIsAuthenticated = false;
	const nav = useNavigate();
	const { signUp, signIn, signOut, getUser, getSubscription } = useSupabase();
	const { showMessage } = useMessage();

	const [credentials, setCredentials] = useState(initialCredentials);
	const [user, setUser] = useState(initialUser);
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialIsAuthenticated,
	);

	/**
	 * Función para crear una cuenta nueva.
	 */
	const createAccount = async () => {
		try {
			await signUp(credentials);
			//Tener un contexto que maneje los mensajes facilita un montón el código.
			showMessage(
				"Recibirás un correo electrónico para la confirmación de la cuenta.",
				"info",
			);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	/**
	 * Función para iniciar sesión.
	 */
	const logIn = async () => {
		try {
			await signIn(credentials);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	/**
	 * Función para cerrar sesión.
	 */
	const logOut = async () => {
		try {
			await signOut();
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	/**
	 * Función para obtener el usuario actual.
	 */
	const getCurrentUser = async () => {
		try {
			const currentUser = await getUser();
			if (currentUser) {
				setUser(currentUser);
			} else {
				showMessage("No se encuentra el usuario actual.", "error");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	/**
	 * Función para actualizar los datos del formulario.
	 * @param {*} evento
	 */
	const updateData = (evento) => {
		const { name, value } = evento.target;
		//Comprobamos que tenga name para que no salte error ya que si no tiene valor se rellenará como null o "".
		if (name) {
			setCredentials({ ...credentials, [name]: value });
		}
	};

	/**
	 * Funciones para validar los formularios de login y registro.
	 */
	const validateLogin = () => {
		if (!credentials.email || !credentials.password) {
			showMessage("Los campos no pueden estar vacíos.", "error");
		} else {
			logIn();
		}
	};

	/**
	 * Función para validar el formulario de registro.
	 */
	const validateRegister = () => {
		if (
			!credentials.email ||
			!credentials.password ||
			!credentials.display_name
		) {
			showMessage("Los campos no pueden estar vacíos.", "error");
		} else {
			createAccount();
		}
	};

	useEffect(() => {
		/**
		 * Suscripción para detectar cambios en la autenticación del usuario.
		 */
		const subscription = getSubscription((event, session) => {
			//Me gustaría practicar más el uso de las subscripciones porque no sabría muy bien como usarlas.
			if (session) {
				nav("/shoppingList");
				setIsAuthenticated(true);
				getCurrentUser();
			} else {
				nav("/");
				setIsAuthenticated(false);
			}
		});
	}, []);

	const dataProvider = {
		createAccount,
		logIn,
		logOut,
		updateData,
		validateLogin,
		validateRegister,
		isAuthenticated,
		user,
	};

	return (
		<authContext.Provider value={dataProvider}>{children}</authContext.Provider>
	);
};

export default AuthProvider;
export { authContext };
