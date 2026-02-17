import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSupabaseAuth from "../hooks/useSupabaseAuth.js";
import useSupabaseCRUD from "../hooks/useSupabaseCRUD.js";
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
	const { signUp, signIn, signOut, getUser, getSubscription, getDataByColumn } =
		useSupabaseAuth();
	const { showMessage } = useMessageContext();
	//Para obtener todos los perfiles de usuario que hay.
	const { getAllWithQuery, loading: loadingProfiles } =
		useSupabaseCRUD("profile");

	const [credentials, setCredentials] = useState(initialCredentials);
	const [user, setUser] = useState(initialUser);
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialIsAuthenticated,
	);
	const [isAdmin, setIsAdmin] = useState(false);
	//Este estado me servirá para controlar si el admin está editando ya que quiero que las opciones sean diferentes en el menú.
	const [adminIsActive, setAdminIsActive] = useState(false);
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
			let currentUser = await getUser();
			if (currentUser) {
				//Obtenemos los demás datos del usuario.
				const role = await getDataByColumn(
					"user_roles",
					currentUser.id,
					"id_role",
				);
				const profile = await getDataByColumn(
					"profile",
					currentUser.id,
					"user_id",
				);
				currentUser = { ...currentUser, role: role.role, profile: profile };
				setUser(currentUser);
				if (role.role.toLowerCase() === "admin") {
					setIsAdmin(true);
				} else {
					//En realidad esto no haría falta porque por defecto empieza en false y si hay cambio de usuario se reinicia a false pero por añadir seguridad supongo que no está de más.
					setIsAdmin(false);
				}
			} else {
				showMessage("No se encuentra el usuario actual.", "error");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	//Métodos para cuando el ususario es admin, igual esto debería estar en otro proveedor pero como en realidad son funciones que tienen que ver con el usuario y este proveedor maneja el inicio de sesión...
	const getAllUsers = async () => {
		try {
			const users = await getAllWithQuery(
				"user_id, avatar, name, description, user_roles(role, email)",
			);
			return users;
		} catch (error) {
			showMessage(error.message, "error");
			return null;
		}
	};

	const activeEditing = async () => {
		if (isAdmin) {
			setAdminIsActive(true);
		}
	};

	const desactiveEditing = async () => {
		if (isAdmin) {
			setAdminIsActive(false);
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
				setIsAdmin(false);
				setAdminIsActive(false);
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
		getAllUsers,
		activeEditing,
		desactiveEditing,
		isAuthenticated,
		user,
		credentials,
		isAdmin,
		loadingProfiles,
		adminIsActive,
	};

	return (
		<authContext.Provider value={dataProvider}>{children}</authContext.Provider>
	);
};

export default AuthProvider;
export { authContext };
