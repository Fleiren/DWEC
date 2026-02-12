import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSupabaseAuth from "../hooks/useSupabaseAuth.js";
import useMessageContext from "../hooks/useMessageContext.js";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	//Estoy intentando poner los nombres de las variables en inglés porque supongo que es lo mejor en el mundo de la programación, pero siento que es más difícil que queden claras.
	const initialCredentials = {
		email: "",
		password: "",
		confirmPassword: "",
		display_name: "",
	};
	//Antes inicializaba como objeto vacío el usuario pero me daba error al cargar la lista de la compra ya que comprobaba if(user) y al ser un objeto vacío se consideraba como true y se intentaba cargar la lista de la compra con un id de usuario vacío, bme estoy dando cuenta de lo delicado que es como inicialices los estados y lo importante que es tener claro el funcionamiento de todo el código para evitar errores.
	const initialUser = null;
	const initialIsAuthenticated = false;
	const nav = useNavigate();
	const { signUp, signIn, signOut, getUser, getSubscription } =
		useSupabaseAuth();
	const { showMessage } = useMessageContext();

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
			resetDataForm();
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
			resetDataForm();
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

	//Estoy haciendo las validaciones de los datos en el proveedor pero creo que no debería ser así...
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
			!credentials.display_name ||
			!credentials.confirmPassword
		) {
			showMessage("Los campos no pueden estar vacíos.", "error");
		} else if (credentials.password !== credentials.confirmPassword) {
			showMessage("Las contraseñas no coinciden.", "error");
		} else {
			createAccount();
		}
	};

	const resetDataForm = () => {
		setCredentials(initialCredentials);
	};

	useEffect(() => {
		/**
		 * Suscripción para detectar cambios en la autenticación del usuario.
		 */
		const subscription = getSubscription((event, session) => {
			//Me gustaría practicar más el uso de las subscripciones porque no sabría muy bien como usarlas.
			if (session) {
				nav("/productList");
				setIsAuthenticated(true);
				getCurrentUser();
			} else {
				nav("/");
				setIsAuthenticated(false);
				//Me faltaba esta línea y cuando cerraba sesión dejaba todo a la vista de lo que había dejado el usuario anterior, no se reiniciaban los datos que no se recargan al momento.
				setUser(null);
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
		resetDataForm,
		isAuthenticated,
		user,
		credentials,
	};

	return (
		<authContext.Provider value={dataProvider}>{children}</authContext.Provider>
	);
};

export default AuthProvider;
export { authContext };
