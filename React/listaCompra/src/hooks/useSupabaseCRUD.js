import { supabaseConnexion } from "../supabase/supabase.js";
import { useState } from "react";

//Vale, esto es idea de la IA, le he pedido buenas prácticas una vez que tenía generalizado el hook y me ha dicho de usar como parámetro de entrada a la hora de inicializarlo el nombre de la tabla,
//de esta manera ya no sería necesario pasarla como parámetro de entrada de cada uno de los métodos... No se si estará bien pero me ha parecido buena idea.
const useSupabaseCRUD = (tableName) => {
	//Como me has comentado en la práctica anterior, es verdad que este hook debería ser genérico ya que estos métodos sirven para cualquier tabla si los hacemos genéricos.
	const [loading, setLoading] = useState(false);
	//Antes de hacer cualquier cosa probamos que se haya declarado el hook con el nombre de la tabla ya que sin el no se puede realizar ningún método.
	if (!tableName || typeof tableName !== "string") {
		throw new Error(
			"El nombre de la tabla está sin definir, debes indicarla para poder realizar consultas.",
		);
	}
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
	const getAll = async () => {
		//No hace falta un try-catch en éste punto ya que si el método request lanza un error, lo recogerá quien llame a la función getProducts (que es el contexto).
		return await request(supabaseConnexion.from(tableName).select("*"));
	};

	const getById = async (id) => {
		return await request(
			supabaseConnexion.from(tableName).select("*").eq("id", id),
		);
	};

	const save = async (item) => {
		return await request(supabaseConnexion.from(tableName).insert(item));
	};

	const edit = async (item) => {
		return await request(
			supabaseConnexion.from(tableName).update(item).eq("id", item.id),
		);
	};

	const remove = async (id) => {
		return await request(
			supabaseConnexion.from(tableName).delete().eq("id", id),
		);
	};

	return {
		loading,
		getAll,
		getById,
		save,
		edit,
	};
};

export default useSupabaseCRUD;
