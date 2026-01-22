import { useState } from "react";
import { supabaseConnexion } from "../supabase/supabase.js";

const useSupabase = () => {
	const signUp = async (credentials) => {
		try {
			if (credentials) {
				const { data, error } = await supabaseConnexion.auth.signUp({
					email: credentials.email,
					password: credentials.password,
					options: {
						data: {
							display_user: credentials.display_user,
						},
					},
				});
			} else {
				throw new Error("Debes introducir los datos para registrarte.");
			}

			if (error) {
				throw error;
			}
		} catch (error) {
			throw error;
		}
	};

	const signIn = async (credentials) => {
		try {
			if (credentials) {
				const { data, error } = await supabaseConnexion.auth.signInWithPassword(
					{
						email: credentials.email,
						password: credentials.password,
						//Se puede hacer una redirección.
					},
				);
			} else {
				throw new Error("Debes introducir los datos para iniciar sesión.");
			}

			if (error) {
				throw error;
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

	return {
		createAccount,
		signIn,
		signOut,
		getUser,
	};
};

export default useSupabase;
