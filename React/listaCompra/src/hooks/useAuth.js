import { useContext } from "react";
import { AuthProvider } from "./../context/AuthProvider.jsx";

const useAuth = () => {
	const context = useContext(AuthProvider);
	if (!context) {
		throw new Error("Debes utilizar useAuth dentro del contexto AuthProvider.");
	}

	return context;
};

export default useAuth;
