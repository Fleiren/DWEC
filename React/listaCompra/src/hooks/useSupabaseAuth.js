import { supabaseConnexion } from "../supabase/supabase.js";
import { useState } from "react";

//En este hook realizamos la conexión con supabase, de esta manera, si en un futuro queremos cambiar de servicio de autenticación, solo tendríamos que modificar este hook.

//Ya que para la práctica 6.11 tenemos que añadir funciones, he arreglado los métodos utilizando un método auxiliar "request" como hice en useSupabaseCRUD.js.
const useSupabaseAuth = () => {
	const [loading, setLoading] = useState(false);

	const request = async (promise) => {
		try {
			setLoading(true);
			const { data, error } = await promise;
			if (error) {
				throw error;
			}
			return data;
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const signUp = async ({ email, password, display_name }) => {
		if (email && password && display_name) {
			return await request(
				supabaseConnexion.auth.signUp({
					email: email,
					password: password,
					options: {
						data: {
							display_name: display_name,
						},
					},
				}),
			);
		} else {
			throw new Error("Debes introducir los datos para registrarte.");
		}
	};

	const signIn = async ({ email, password }) => {
		if (email && password) {
			return await request(
				supabaseConnexion.auth.signInWithPassword({
					email: email,
					password: password,
					//Se puede hacer una redirección.
				}),
			);
		} else {
			throw new Error("Debes introducir los datos para iniciar sesión.");
		}
	};

	const signOut = async () => {
		return await request(supabaseConnexion.auth.signOut());
	};

	//MÉTODO CORREGIDO.
	const getUser = async () => {
		//Aquí había un error fatal que no entiendo porque antes no me daba error, el caso es que al modularizar los métodos he empezado a retornar el objeto user pero entero, el de la tabla auth de supabase y ya no me funciona nada... ya lo he corregido.
		const data = await request(supabaseConnexion.auth.getUser());
		return data.user;
	};

	const getDataByColumn = async (tableName, columnValue, columnName) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.select("*")
				.eq(columnName, columnValue)
				.single(),
		);
	};

	const updateByColumn = async (
		tableName,
		columnValue,
		columnName,
		newRole,
	) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.update({ role: newRole })
				.eq(columnName, columnValue),
		);
	};

	//Esta función sirve para suscribirse a los cambios de autenticación, de esta manera también podemose separar la lógica de supabase del resto de la aplicación.
	const getSubscription = (f) => {
		return supabaseConnexion.auth.onAuthStateChange(f);
	};

	return {
		loading,
		signUp,
		signIn,
		signOut,
		getUser,
		getSubscription,
		getDataByColumn,
		updateByColumn,
	};
};

export default useSupabaseAuth;
