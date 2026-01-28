import { supabaseConnexion } from "./../supabase/supabase.js";
import { useState } from "react";

const useSupabaseProduct = () => {
	const [loading, setLoading] = useState(false);
	//Mi compañero David ha creado un método genérico para separar lógica fijándose en como hicimos useApi, he hecho lo mismo porque me parece que queda precioso.
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
	const getProducts = async () => {
		//No hace falta un try-catch en éste punto ya que si el método request lanza un error, lo recogerá quien llame a la función getProducts (que es el contexto).
		return await request(supabaseConnexion.from("products").select("*"));
	};

	const getProductById = async (id) => {
		return await request(
			supabaseConnexion.from("products").select("*").eq("id", id),
		);
	};

	const saveProduct = async (product) => {
		request(supabaseConnexion.from("products").insert(product));
	};

	const editProduct = async (product) => {
		request(
			supabaseConnexion.from("products").update(product).eq("id", product.id),
		);
	};

	return {
		loading,
		getProducts,
		getProductById,
		saveProduct,
		editProduct,
	};
};

export default useSupabaseProduct;
