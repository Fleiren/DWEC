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

	//Este método es un poco libre, de esta manera se pueden hacer consultas multitabla, etc.
	const getAllWithQuery = async (query) => {
		return await supabaseConnexion.from(tableName).select(query);
	};

	//Le he pregutado a la IA si era buena idea hacer un método que fuera getAllById pero me ha recomendado mejor hacerlo genérico por columna y me ha parecido una idea increible.
	const getAllByColumn = async (column, value) => {
		return await request(
			supabaseConnexion.from(tableName).select("*").eq(column, value),
		);
	};

	const getMultitable = async (tableName, columnName, columnValue, query) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.select(query)
				.eq(columnName, columnValue),
		);
	};

	const getById = async (id) => {
		//Para que no te devuelva un array de objetos la consulta puedes indicar con single() que te devuelva solo uno y como estas consultas solo devuelven un registro nos ahorramos el problema del array.
		return await request(
			supabaseConnexion.from(tableName).select("*").eq("id", id).single(),
		);
	};

	const save = async (item) => {
		return await request(
			supabaseConnexion.from(tableName).insert(item).select().single(),
		);
	};

	const edit = async (item) => {
		return await request(
			supabaseConnexion.from(tableName).update(item).eq("id", item.id),
		);
	};

	//He tenido que hacer este método porque la id no se llama id en todas las tablas y porque la tabla intermedia tiene dos id, he estado media vida con error al editar la cantidad del producto hasta que se me ha ocurrido esto, ¿Es mejor de otra forma?.
	const updateBy2Column = async (column1, column2, item) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.update(item)
				.eq(column1, item[column1])
				.eq(column2, item[column2]),
		);
	};

	//Lo mismo me ha pasado para borrar, al ser dos columnas no me vale el método genérico.
	const removeBy2Column = async (column1, column2, item) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.delete()
				.eq(column1, item[column1])
				.eq(column2, item[column2]),
		);
	};

	//Al final no lo he usado porque me generaba un lag brutal.
	const multitableBy2Column = async (column1, column2, item, query) => {
		return await request(
			supabaseConnexion
				.from(tableName)
				.select(query)
				.eq(column1, item[column1])
				.eq(column2, item[column2])
				.single(),
		);
	};

	const remove = async (id) => {
		return request(supabaseConnexion.from(tableName).delete().eq("id", id));
	};

	return {
		loading,
		getAll,
		getAllByColumn,
		updateBy2Column,
		removeBy2Column,
		getById,
		save,
		edit,
		remove,
		getMultitable,
		multitableBy2Column,
		getAllWithQuery,
	};
};

export default useSupabaseCRUD;
