import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSupabase from "../hooks/useSupabase.js";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	//Estoy intentando poner los nombres de las variables en inglés porque supongo que es lo mejor en el mundo de la programación, pero siento que es más difícil que queden claras.
	const initialCredentials = {
		email: "",
		password: "",
		display_name: "",
	};
	const initialUser = {};
	const initialMessage = "";
	const initialIsAuthenticated = false;
	const nav = useNavigate();
	const { signUp, signIn, singOut, getUser, getSubscription } = useSupabase();

	const [credentials, setCredentials] = useState(initialCredentials);
	const [user, setUser] = useState(initialUser);
	const [error, setError] = useState(initialMessage);
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialIsAuthenticated,
	);
	const [message, setMessage] = useState(initialMessage);

	const createAccount = async () => {
		try {
			await signUp(credentials);
			setMessage(
				"Recibirás un correo electrónico para la confirmación de la cuenta.",
			);
		} catch (error) {
			setError(error.message);
		}
	};

	const logIn = async () => {
		setError(initialMessage);
		try {
			await signIn(credentials);
		} catch (error) {
			setError(error.message);
		}
	};

	const logOut = async () => {
		try {
			await singOut();
			setError(initialMessage);
		} catch (error) {
			setError(error.message);
		}
	};

	const getCurrentUser = async () => {
		try {
			const currentUser = await getUser();
			if (currentUser) {
				setUser(currentUser);
				setError(initialMessage);
			} else {
				setError("No se encuentra el usuario actual.");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		const subscription = getSubscription((event, session) => {
			if (session) {
				nav("/porductList");
				setIsAuthenticated(true);
				getCurrentUser();
			} else {
				nav("/login");
				setIsAuthenticated(false);
			}
		});
	}, []);

	const dataProvider = {
		createAccount,
		logIn,
		logOut,
		isAuthenticated,
		user,
		error,
		message,
	};

	return (
		<authContext.Provider value={dataProvider}>{children}</authContext.Provider>
	);
};

export default AuthProvider;
export { authContext };
