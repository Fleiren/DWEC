import { supabaseConnexion } from "../supabase/supabase.js";

//En este hook realizamos la conexión con supabase, de esta manera, si en un futuro queremos cambiar de servicio de autenticación, solo tendríamos que modificar este hook.
const useSupabaseAuth = () => {
	const signUp = async ({ email, password, display_name }) => {
		try {
			if (email && password && display_name) {
				const { data, error } = await supabaseConnexion.auth.signUp({
					email: email,
					password: password,
					options: {
						data: {
							display_name: display_name,
						},
					},
				});

				if (error) {
					throw error;
				}
			} else {
				throw new Error("Debes introducir los datos para registrarte.");
			}
		} catch (error) {
			throw error;
		}
	};

	const signIn = async ({ email, password }) => {
		try {
			if (email && password) {
				const { data, error } = await supabaseConnexion.auth.signInWithPassword(
					{
						email: email,
						password: password,
						//Se puede hacer una redirección.
					},
				);
				if (error) {
					throw error;
				}
			} else {
				throw new Error("Debes introducir los datos para iniciar sesión.");
			}
		} catch (error) {
			throw error;
		}
	};

	const signOut = async () => {
		try {
			await supabaseConnexion.auth.signOut();
		} catch (error) {
			throw error;
		}
	};

	const getUser = async () => {
		try {
			const { data, error } = await supabaseConnexion.auth.getUser();

			if (error) {
				throw error;
			}
			return data.user;
		} catch (error) {
			throw error;
		}
	};

	//Esta función sirve para suscribirse a los cambios de autenticación, de esta manera también podemose separar la lógica de supabase del resto de la aplicación.
	const getSubscription = (f) => {
		return supabaseConnexion.auth.onAuthStateChange(f);
	};

	return {
		signUp,
		signIn,
		signOut,
		getUser,
		getSubscription,
	};
};

export default useSupabaseAuth;
