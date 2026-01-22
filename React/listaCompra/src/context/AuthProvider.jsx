import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	//Estoy intentando poner los nombres de las variables en inglés porque supongo que es lo mejor en el mundo de la programación, pero siento que es más difícil que queden claras.
	const initialCredentials = {
		email: "",
		password: "",
	};
	const initialUser = {};
	const initialMessage = "";
	const initialIsAuthenticated = false;
	const navigate = useNavigate();
	const { createAccount, signIn } = useAuth();

	const [credentials, setCredentials] = useState(initialCredentials);
	const [user, setUser] = useState(initialUser);
	const [error, setError] = useState(initialMessage);
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialIsAuthenticated,
	);
	const [message, setMessage] = useState(initialMessage);

	const createAccountSupabase = async () => {
		try {
			await createAccount(credentials);
			setMessage(
				"Recibirás un correo electrónico para la confirmación de la cuenta.",
			);
		} catch (error) {
			setError(error.message);
		}
	};

	const signInSupabase = async () => {
		setError(initialMessage);
		try {
			await signIn(credentials);
		} catch (error) {
			setError(error.message);
		}
	};
};

export default AuthProvider;
export { authContext };
